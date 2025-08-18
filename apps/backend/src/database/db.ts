import { Pool } from "pg";
import { createId, isCuid } from "@paralleldrive/cuid2";

let pool: Pool;

export type ConnectionPool = Pool;

export function makeId(): string {
  return createId();
}

export function isValidId(id: string): boolean {
  return isCuid(id);
}

export function makeDb(): Pool {
  if (pool) {
    return pool;
  }

  if (!process.env.DB_URL) {
    throw new Error("DB connection string not set, check your env vars");
  }

  try {
    console.info("> connecting to the database...");
    pool = new Pool({ connectionString: process.env.DB_URL });
    console.info("> db connection established");

    return pool;
  } catch (err) {
    console.error("> database connection failed.");
    throw err;
  }
}
