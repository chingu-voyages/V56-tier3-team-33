import app from './app.js';
import { makeDb } from './database/db.js';

import type { ConnectionPool } from './database/db.js'

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT not set. check your env vars');
}

let pool: ConnectionPool
app.listen(PORT, async () => {
  pool = makeDb()
  const { rows } = await pool.query('SELECT version()')
  console.log(rows)
  console.info(`server running on http://localhost:${PORT}`);
});
