import dotenv from "dotenv";
import { db } from "../lib/db";

dotenv.config({ path: ".env.local" });

async function init() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      confirmed INTEGER DEFAULT 0
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS gifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      purchased INTEGER DEFAULT 0
    )
  `);

  console.log("Banco inicializado");
}

console.log(" ola aaaa  aaaa " + process.env.TURSO_DATABASE_URL);

init();