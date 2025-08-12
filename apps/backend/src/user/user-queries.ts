import type { PoolClient } from "pg";
import { makeDb } from "../database/db.js";
import type { Expert } from "./user-types.js";

const ColumnsMap = {
  password_hash: "password",
  full_name: "name",
  date_of_birth: "dateOfBirth",
} as const;

type ExpertRecord = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  specialty: string;
  city: string;
  phone: string;
  languages: string[];
  created_at: string;
};

type RenamedExpertKey<K extends keyof typeof ColumnsMap> =
  (typeof ColumnsMap)[K];

type MappedExpertRecord<T extends Partial<ExpertRecord>> = {
  [K in keyof T as K extends keyof typeof ColumnsMap
    ? RenamedExpertKey<K>
    : K]: T[K];
};

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

export async function findByEmail(email: string) {
  const pool = makeDb();

  const { rows } = await pool.query<ExpertRecord>(
    `SELECT * FROM users JOIN experts ON users.id = experts.id WHERE email = $1`,
    [email],
  );
  return rows[0] && toMappedExpert(rows[0]);
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

function toMappedExpert<T extends Partial<ExpertRecord>>(
  record: T,
): MappedExpertRecord<T> {
  const mappedObject = {} as MappedExpertRecord<T>;

  for (const key in record) {
    let mappedKey = key as keyof MappedExpertRecord<T>;

    if (key in ColumnsMap) {
      mappedKey = ColumnsMap[key as keyof typeof ColumnsMap];
    }

    // workaround because ts has problems not recognizing the index type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mappedObject as any)[mappedKey] = record[key];
  }

  return mappedObject;
}
