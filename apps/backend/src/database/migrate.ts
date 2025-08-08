import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { makeDb } from "./db.js";

const MIGRATIONS_DIR = fileURLToPath(new URL("./migrations", import.meta.url));

runMigrations();

export async function runMigrations() {
  const pool = makeDb();

  const client = await pool.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      ran_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  const filenames = await fs.readdir(MIGRATIONS_DIR);

  for (const filename of filenames) {
    const ranMigration = await client.query(
      `
      SELECT 1 FROM migrations WHERE filename = $1
    `,
      [filename],
    );

    if ((ranMigration.rowCount as number) > 0) {
      console.info(`> skipping previously ran migration: ${filename}`);
      continue;
    }

    console.info(`> running migration: ${filename}`);
    const sql = await fs.readFile(path.join(MIGRATIONS_DIR, filename), {
      encoding: "utf8",
    });
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query("INSERT INTO migrations (filename) VALUES ($1)", [
        filename,
      ]);
      await client.query("COMMIT");
      console.info(`> successfully ran migration: ${filename}`);
    } catch (err) {
      console.info(`> error running migration: ${filename}`);

      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("thrown error is not an instance of Error", err);
      }

      await client.query("ROLLBACK");
      client.release();
      await pool.end();
      throw err;
    }
  }

  client.release();
  await pool.end();
}
