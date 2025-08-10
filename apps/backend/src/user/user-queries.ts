import type { PoolClient } from "pg";
import { makeDb } from "../database/db.js";
import type { Expert } from "./user-types.js";

export async function saveExpert(expert: Expert) {
  return withTransaction(async (client) => {
    const { rowCount: specialtyCount, rows: specialtyRows } =
      await client.query(`SELECT id FROM specialties WHERE name = $1`, [
        expert.specialty,
      ]);
    if (!specialtyCount) {
      throw new Error("specialty not found");
    }

    const { rowCount: langCount, rows: langRows } = await client.query(
      `SELECT * FROM languages WHERE code = ANY($1)`,
      [expert.languages],
    );
    if (langCount != expert.languages.length) {
      const found = new Set(langRows.map((row) => row.code));
      const missing = expert.languages.filter((code) => !found.has(code));
      throw new Error(`some languages not found: ${missing}`);
    }

    await client.query(
      `
      INSERT INTO users
      (id, email, password_hash, full_name, date_of_birth, gender)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      `,
      [
        expert.id,
        expert.email,
        expert.password,
        expert.name,
        expert.dateOfBirth,
        expert.gender,
      ],
    );

    await client.query(
      `
        INSERT INTO experts (id, specialty_id, city, phone)
        VALUES ($1, $2, $3, $4)
      `,
      [expert.id, specialtyRows[0].id, expert.city, expert.phone],
    );

    const values = langRows.map((_, i) => "($1, $" + (i + 2) + ")").join(", ");
    await client.query(
      `
        INSERT INTO experts_languages (expert_id, language_id)
        VALUES ${values}
      `,
      [expert.id, ...langRows.map((code) => code.id)],
    );
  });
}

async function withTransaction(cb: (client: PoolClient) => Promise<unknown>) {
  const pool = makeDb();
  const client = await pool.connect();

  try {
    client.query("BEGIN");
    await cb(client);
    client.query("COMMIT");
  } catch (err) {
    client.query("ROLLBACK");

    if (err instanceof Error) {
      console.error(err.message, err);
    } else {
      console.error("thrown error is not an instance of Error", err);
    }

    throw err;
  } finally {
    client.release();
  }
}
