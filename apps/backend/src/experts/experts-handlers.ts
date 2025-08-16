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
  const { specialty } = req.query;

  const queryValues = [];
  let whereClause = "";

  if (specialty) {
    queryValues.push(specialty);
    whereClause = "WHERE specialties.name = $1";
  }

  try {
    const query = buildExpertsQuery(whereClause);
    const data = await makeDb().query<ExpertRecord>(query, queryValues);
    res.status(200).json({ experts: data.rows });
  } catch (error) {
    console.error("Failed to fetch experts.", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getExpertDetails(req: Request, res: Response) {
  const id = req.params.id!;

  if (!isValidId(id)) {
    res.status(404).json({ error: "Page not found." });
    return;
  }

  try {
    const query = buildExpertsQuery("WHERE experts.id = $1");
    const { rowCount, rows } = await makeDb().query<ExpertRecord>(query, [id]);

    if (!rowCount) {
      res.status(404).json({ error: "Page not found." });
      return;
    }

    const expert = rows[0];
    res.status(200).json({ expert });
  } catch (error) {
    console.error("Failed to fetch expert details.", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

function buildExpertsQuery(whereClause?: string) {
  return `
    SELECT
      experts.id AS id,
      full_name AS name,
      gender,
      specialties.name AS specialty,
      city,
      array_agg(DISTINCT languages.code) AS languages
    FROM experts
    JOIN users ON experts.id = users.id
    JOIN specialties ON experts.specialty_id = specialties.id
    JOIN experts_languages ON experts.id = experts_languages.expert_id
    JOIN languages ON experts_languages.language_id = languages.id
    ${whereClause ?? ""}
    GROUP BY experts.id, full_name, gender, specialties.name, city
  `;
}
