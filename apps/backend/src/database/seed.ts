import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { makeDb } from "./db.js";

const SEEDS_DIR = fileURLToPath(new URL("./seeds", import.meta.url));

seed();

export async function seed() {
  const pool = makeDb();
  const client = await pool.connect();

  console.info(`> reseting db...`);
  const sql = await fs.readFile(path.join(SEEDS_DIR, "reset.sql"), {
    encoding: "utf8",
  });

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");
    console.info(`> successfully reset to the initial seed data`);
  } catch (err) {
    console.info(`> error resetting the db`);

    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("thrown error is not an instance of Error", err);
    }

    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}
