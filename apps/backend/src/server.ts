import app from "./app.js";
import { makeDb } from "./database/db.js";

import type { ConnectionPool } from "./database/db.js";

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT not set. check your env vars");
}

let pool: ConnectionPool;
app.listen(PORT, async () => {
  pool = makeDb();
  const { rows } = await pool.query("SELECT version()");
  console.info(rows);
  console.info(`server running on http://localhost:${PORT}`);
});

process.on("uncaughtException", async (error) => {
  console.error("> uncaught exception crashed the server. shutting down...");
  console.error(error);
  await pool.end();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.info("> SIGTERM detected. Shutting down...");
  await pool.end();

  console.info("> shutdown complete.");
  process.exit(0);
});
