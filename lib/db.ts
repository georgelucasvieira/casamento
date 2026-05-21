import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";

dotenv.config({ path: ".env.local" });

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbFile = path.join(dbDir, "casamento.db");
const useLocalDb = process.env.USE_LOCAL_DB !== "false";

export const db = createClient(
  useLocalDb
    ? { url: `file:${dbFile}` }
    : {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }
);

console.log(useLocalDb ? "Utilizando banco de dados local" : "Utilizando banco de dados Turso");

export type Gift = {
  id: number;
  title: string;
  price: string;
  purchased: boolean;
  image: string;
  qrCodeImage?: string;
  pixCopyPaste?: string;
};

export type Guest = {
  id: number;
  name: string;
  confirmed: boolean;
};

const giftImages: Record<number, string> = {
  1: "/images/gifts/gift-1.jpg",
  2: "/images/gifts/gift-2.jpg",
  3: "/images/gifts/gift-3.jpg",
  4: "/images/gifts/gift-4.jpg",
  5: "/images/gifts/gift-5.jpg",
  6: "/images/gifts/gift-6.jpg",
  7: "/images/gifts/gift-7.jpg",
  8: "/images/gifts/gift-8.jpg",
};

const formatPrice = (value: number | string) => {
  const price = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(price)) {
    return String(value);
  }
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const normalizeGift = (row: any) => {
  const id = typeof row.id === "bigint" ? Number(row.id) : row.id;
  const priceNumber = typeof row.price === "bigint" ? Number(row.price) : Number(row.price);

  return {
    id,
    title: row.name,
    price: formatPrice(priceNumber),
    purchased: Number(row.purchased) === 1,
    image: row.image || giftImages[id] || "/images/gifts/gift-1.jpg",
    qrCodeImage: row.qr_code_image ?? undefined,
    pixCopyPaste: row.pix_copy_paste ?? undefined,
  };
};


async function ensureSchema() {
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

  // attempt to add missing gift columns if they do not exist yet
  try {
    await db.execute("ALTER TABLE gifts ADD COLUMN image TEXT");
  } catch (e) {
    // ignore if column exists
  }

  try {
    await db.execute("ALTER TABLE gifts ADD COLUMN qr_code_image TEXT");
  } catch (e) {
    // ignore if column exists
  }

  try {
    await db.execute("ALTER TABLE gifts ADD COLUMN pix_copy_paste TEXT");
  } catch (e) {
    // ignore if column exists
  }
}

export async function getGifts() {
  await ensureSchema();
  const result = await db.execute(
    "SELECT id, name, price, purchased, image, qr_code_image, pix_copy_paste FROM gifts ORDER BY id"
  );
  return result.rows.map(normalizeGift);
}

export async function createGift(
  name: string,
  price: number,
  image?: string,
  qrCodeImage?: string,
  pixCopyPaste?: string
) {
  await ensureSchema();
  const res = await db.execute(
    "INSERT INTO gifts (name, price, purchased, image, qr_code_image, pix_copy_paste) VALUES (?, ?, 0, ?, ?, ?)",
    [name, price, image || null, qrCodeImage || null, pixCopyPaste || null]
  );
  const last = res.lastInsertRowid;
  return last ? Number(last) : 0;
}

export async function updateGiftPurchased(id: number, purchased: boolean) {
  await ensureSchema();
  await db.execute(
    "UPDATE gifts SET purchased = ? WHERE id = ?",
    [purchased ? 1 : 0, id]
  );
}

export async function getHeroSlots() {
  await ensureSchema();
  const rs = await db.execute("SELECT slot, position, image FROM hero_slots ORDER BY slot, position");
  const rows = rs.rows;
  const slots: Record<string, Array<{ position: number; image?: string }>> = {};
  for (const r of rows) {
    const slotName = String(r.slot);
    const pos = typeof r.position === "bigint" ? Number(r.position) : Number(r.position ?? 0);
    const img = r.image as string | null | undefined;
    if (!slots[slotName]) slots[slotName] = [];
    slots[slotName].push({ position: pos, image: img ?? undefined });
  }
  return slots;
}

export async function updateHeroSlot(slot: string, position: number, image?: string) {
  await ensureSchema();
  // upsert
  await db.execute(
    `INSERT INTO hero_slots(slot, position, image) VALUES (?, ?, ?)
     ON CONFLICT(slot, position) DO UPDATE SET image = excluded.image`,
    [slot, position, image || null]
  );
}

export async function getGuests() {
  const result = await db.execute(
    "SELECT id, name, confirmed FROM guests ORDER BY name"
  );
  return result.rows.map((row: any) => ({
    id: typeof row.id === "bigint" ? Number(row.id) : row.id,
    name: row.name,
    confirmed: Number(row.confirmed) === 1,
  }));
}

export async function updateGuestStatus(id: number, confirmed: boolean) {
  const result = await db.execute(
    "UPDATE guests SET confirmed = ? WHERE id = ?",
    [confirmed ? 1 : 0, id]
  );
  return result.rowsAffected;
}
