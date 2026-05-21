import { db } from "../lib/db";

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
      image TEXT,
      qr_code_image TEXT,
      pix_copy_paste TEXT
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

  // seed guests if empty
  const guestCount = await db.execute("SELECT COUNT(*) AS count FROM guests");
  const guests = guestCount.rows[0];
  const guestTotal = Number(guests?.count ?? guests?.[0] ?? 0);
  if (guestTotal === 0) {
    await db.batch([
      ["INSERT INTO guests(name, confirmed) VALUES (?, ?)", ["Ana", 0]],
      ["INSERT INTO guests(name, confirmed) VALUES (?, ?)", ["Beatriz", 0]],
      ["INSERT INTO guests(name, confirmed) VALUES (?, ?)", ["Carla", 0]],
      ["INSERT INTO guests(name, confirmed) VALUES (?, ?)", ["Daniel", 0]],
      ["INSERT INTO guests(name, confirmed) VALUES (?, ?)", ["Eduardo", 0]],
    ]);
  }

  // seed gifts if empty
  const giftCount = await db.execute("SELECT COUNT(*) AS count FROM gifts");
  const gifts = giftCount.rows[0];
  const giftTotal = Number(gifts?.count ?? gifts?.[0] ?? 0);
  if (giftTotal === 0) {
    await db.batch([
      ["INSERT INTO gifts(name, price, purchased, image) VALUES (?, ?, ?, ?)", ["Arandelas", 90, 1, null]],
      ["INSERT INTO gifts(name, price, purchased, image) VALUES (?, ?, ?, ?)", ["Travessas e Refratários", 120, 1, null]],
      ["INSERT INTO gifts(name, price, purchased, image) VALUES (?, ?, ?, ?)", ["Aparelho de Jantar", 600, 0, null]],
      ["INSERT INTO gifts(name, price, purchased, image) VALUES (?, ?, ?, ?)", ["Passagem Lua de Mel", 2500, 0, null]],
      ["INSERT INTO gifts(name, price, purchased, image) VALUES (?, ?, ?, ?)", ["Hospedagem Lua de Mel", 1500, 0, null]],
    ]);
  }

  // seed hero slots (hero slideshow + three flipcards)
  const heroCount = await db.execute("SELECT COUNT(*) AS count FROM hero_slots");
  const hero = heroCount.rows[0];
  const heroTotal = Number(hero?.count ?? hero?.[0] ?? 0);
  if (heroTotal === 0) {
    const batch: Array<any> = [];
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
    await db.batch(batch as any, "write");
  }

  console.log("Banco inicializado");
}

init();
