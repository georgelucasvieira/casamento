import { db } from "../lib/db";

type CountRow = {
  count?: number | string | bigint;
  [key: string]: unknown;
};

type BatchEntry = [string, Array<string | number | null>];

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
      purchased INTEGER DEFAULT 0,
      image TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS qr_code (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      qr_code_image_url TEXT,
      pix_paste_copy TEXT,
      date_created TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS hero_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot TEXT NOT NULL,
      position INTEGER DEFAULT 0,
      image TEXT,
      UNIQUE(slot, position)
    )
  `);

  // seed hero slots (hero slideshow + three flipcards)
  const heroCount = await db.execute("SELECT COUNT(*) AS count FROM hero_slots");
  const hero = heroCount.rows[0] as CountRow;
  const heroTotal = Number(hero?.count ?? hero?.[0] ?? 0);
  if (heroTotal === 0) {
    const batch: BatchEntry[] = [];
    // hero main slot with 3 positions for future slideshow
    for (let p = 1; p <= 3; p++) {
      batch.push(["INSERT INTO hero_slots(slot, position, image) VALUES (?, ?, ?)", ["hero_main", p, null]]);
    }
    // three flipcards each with 3 positions
    for (let c = 1; c <= 3; c++) {
      for (let p = 1; p <= 3; p++) {
        batch.push(["INSERT INTO hero_slots(slot, position, image) VALUES (?, ?, ?)", [`flipcard_${c}`, p, null]]);
      }
    }
    await db.batch(batch, "write");
  }

  console.log("Banco inicializado");
}

init();
