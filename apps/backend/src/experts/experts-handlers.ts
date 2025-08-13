import type { Request, Response } from "express";
import { isValidId, makeDb } from "../database/db.js";

type ExpertRecord = {
  id: string;
  name: string;
  gender: string;
  specialty: string;
  city: string;
  languages: string[];
};

export async function getExperts(req: Request, res: Response) {
  try {
    const data = await makeDb().query<ExpertRecord>(`
      SELECT
        users.id AS id,
        users.full_name AS name,
        gender,
        specialties.name AS specialty,
        city,
        array_agg(languages.code) AS languages
      FROM users
      JOIN experts ON users.id = experts.id
      JOIN specialties ON experts.specialty_id = specialties.id
      JOIN experts_languages ON experts.id = experts_languages.expert_id
      JOIN languages ON experts_Languages.language_id = languages.id
      GROUP BY users.id, users.full_name, gender, specialties.name, city
    `);
    const result = { experts: data.rows };
    res.status(200).json(result);
  } catch (error) {
    console.error("Something wrong!:", error);
  }
}

export async function getExpertDetails(req: Request, res: Response) {
  const id = req.params.id!;

  if (!isValidId(id)) {
    res.status(404).json({ error: "Page not found." });
    return;
  }

  const pool = makeDb();
  const { rowCount, rows } = await pool.query<ExpertRecord>(
    `
      SELECT
        users.id AS id,
        full_name AS name,
        gender,
        specialties.name AS specialty,
        city,
        array_agg(DISTINCT languages.code) AS languages
      FROM users
      JOIN experts ON users.id = experts.id
      JOIN specialties ON experts.specialty_id = specialties.id
      JOIN experts_languages ON experts.id = experts_languages.expert_id
      JOIN languages ON experts_languages.language_id = languages.id
      WHERE experts.id = $1
      GROUP BY users.id, full_name, gender, specialties.name, city
    `,
    [id],
  );

  if (!rowCount) {
    res.status(404).json({ error: "Page not found." });
    return;
  }

  const expert = rows[0];
  res.status(200).json({ expert });
}
