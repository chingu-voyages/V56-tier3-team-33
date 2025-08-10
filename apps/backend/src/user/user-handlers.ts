import bcrypt from "bcrypt";
import { makeDb, makeId } from "../database/db.js";
import { normalizeExpertDetails } from "./user-normalizer.js";
import { validateExpertDetails } from "./user-validator copy.js";
import { makeJWT } from "./jwt.js";

import type { Request, Response } from "express";

export async function registerExpert(req: Request, res: Response) {
  const normalized = normalizeExpertDetails(req.body);
  const errors = validateExpertDetails(normalized);

  if (errors.length) {
    const result: Record<string, { value: unknown; message: string }> = {};
    for (const { field, value, message } of errors) {
      result[field] = { value, message };
    }

    res.status(422).json(result);
    return;
  }

  // register
  const passwordHash = await bcrypt.hash(req.body.password, 12);

  const id = makeId();
  const pool = makeDb();
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rowCount: specialtyCount, rows: specialtyRows } =
      await client.query(`SELECT id FROM specialties WHERE name = $1`, [
        normalized.specialty,
      ]);
    if (!specialtyCount) {
      throw new Error("specialty not found");
    }

    const { rowCount: langCount, rows: langRows } = await client.query(
      `SELECT id FROM languages WHERE code = ANY($1)`,
      [normalized.languages],
    );
    if (langCount != normalized.languages.length) {
      const found = new Set(langRows.map((row) => row.code));
      const missing = normalized.languages.filter((code) => !found.has(code));
      throw new Error(`some languages not found: ${missing}`);
    }

    await client.query(
      `
      INSERT INTO users
      (id, email, password_hash, full_name, date_of_birth, gender)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING created_at, updated_at
      `,
      [
        id,
        normalized.email,
        passwordHash,
        normalized.name,
        normalized.dateOfBirth,
        normalized.gender,
      ],
    );

    await client.query(
      `
        INSERT INTO experts (id, specialty_id, city, phone)
        VALUES ($1, $2, $3, $4)
      `,
      [id, specialtyRows[0].id, normalized.city, normalized.phone],
    );

    const values = langRows.map((_, i) => "($1, $" + (i + 2) + ")").join(", ");
    await client.query(
      `
        INSERT INTO experts_languages (expert_id, language_id)
        VALUES ${values}
      `,
      [id, ...langRows.map((code) => code.id)],
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");

    if (err instanceof Error) {
      console.error(err.message, err);
    } else {
      console.error("thrown error is not an instance of Error", err);
    }

    res.status(500).send();
    return;
  } finally {
    client.release();
  }

  // send access token
  const accessToken = makeJWT({ id, name: normalized.name, role: "expert" });
  res.status(201).json({ message: "user created", accessToken });
}
