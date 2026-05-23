import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";

dotenv.config({ path: ".env.local" });

const useLocalDb = process.env.USE_LOCAL_DB !== "false";
var localDbPath = "";

if (useLocalDb) {
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    localDbPath = path.join(dbDir, "casamento.db");
  }
}

export const db = createClient(
  useLocalDb
    ? { url: `file:${localDbPath}` }
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

export type QrCode = {
  id: number;
  qrCodeImageUrl?: string;
  pixPasteCopy?: string;
  dateCreated: string;
};

export type Guest = {
  id: number;
  name: string;
  confirmed: boolean;
};

type GiftRow = {
  id: number | bigint;
  name: string;
  price: number | bigint;
  purchased: number | bigint | boolean;
  image?: string | null;
};

type GiftMigrationRow = {
  qr_code_image?: string | null;
  pix_copy_paste?: string | null;
};

type GuestRow = {
  id: number | bigint;
  name: string;
  confirmed: number | bigint | boolean;
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

const normalizeGift = (row: GiftRow, qrCode: QrCode | null) => {
  const id = typeof row.id === "bigint" ? Number(row.id) : row.id;
  const priceNumber = typeof row.price === "bigint" ? Number(row.price) : Number(row.price);

  return {
    id,
    title: row.name,
    price: formatPrice(priceNumber),
    purchased: Number(row.purchased) === 1,
    image: row.image || giftImages[id] || "/images/gifts/gift-1.jpg",
    qrCodeImage: qrCode?.qrCodeImageUrl ?? undefined,
    pixCopyPaste: qrCode?.pixPasteCopy ?? undefined,
  };
};

async function hasColumn(table: string, column: string) {
  const result = await db.execute(`PRAGMA table_info('${table}')`);
  return result.rows.some((row: any) => row.name === column);
}

async function fetchLatestQrCode() {
  const result = await db.execute(
    "SELECT id, qr_code_image_url, pix_paste_copy, date_created FROM qr_code ORDER BY date_created DESC, id DESC LIMIT 1"
  );

  if (!result.rows.length) {
    return null;
  }

  const row = result.rows[0] as unknown as {
    id: number | bigint;
    qr_code_image_url?: string | null;
    pix_copy_paste?: string | null;
    date_created?: string | number | Date | null;
  };

  return {
    id: typeof row.id === "bigint" ? Number(row.id) : row.id,
    qrCodeImageUrl: row.qr_code_image_url ?? undefined,
    pixPasteCopy: row.pix_copy_paste ?? undefined,
    dateCreated: row.date_created ? String(row.date_created) : new Date().toISOString(),
  };
}

async function migrateGiftQrCodeFields() {
  const hasQrCodeColumn = await hasColumn("gifts", "qr_code_image");
  const hasPixColumn = await hasColumn("gifts", "pix_copy_paste");

  if (!hasQrCodeColumn && !hasPixColumn) {
    return;
  }

  const existingQrCode = await db.execute(
    "SELECT qr_code_image, pix_copy_paste FROM gifts WHERE qr_code_image IS NOT NULL OR pix_copy_paste IS NOT NULL ORDER BY id DESC LIMIT 1"
  );

  if (existingQrCode.rows.length) {
    const row = existingQrCode.rows[0] as GiftMigrationRow;
    await db.execute(
      "INSERT INTO qr_code (qr_code_image_url, pix_paste_copy) VALUES (?, ?)",
      [row.qr_code_image ?? null, row.pix_copy_paste ?? null]
    );
  }

  await db.execute("DROP TABLE IF EXISTS gifts_migration_temp");
  await db.execute(`
    CREATE TABLE gifts_migration_temp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      purchased INTEGER DEFAULT 0,
      image TEXT
    )
  `);
  await db.execute(
    "INSERT INTO gifts_migration_temp (id, name, price, purchased, image) SELECT id, name, price, purchased, image FROM gifts"
  );
  await db.execute("DROP TABLE gifts");
  await db.execute("ALTER TABLE gifts_migration_temp RENAME TO gifts");
}


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

  await migrateGiftQrCodeFields();
}

export async function getGifts() {
  await ensureSchema();
  const qrCode = await fetchLatestQrCode();
  const result = await db.execute(
    "SELECT id, name, price, purchased, image FROM gifts ORDER BY id"
  );
  const rows = result.rows as unknown as GiftRow[];
  return rows.map((row) => normalizeGift(row, qrCode));
}

export async function getLatestQrCode() {
  await ensureSchema();
  return fetchLatestQrCode();
}

export async function createGift(
  name: string,
  price: number,
  image?: string
) {
  await ensureSchema();
  const res = await db.execute(
    "INSERT INTO gifts (name, price, purchased, image) VALUES (?, ?, 0, ?)",
    [name, price, image || null]
  );
  const last = res.lastInsertRowid;
  return last ? Number(last) : 0;
}

export async function createQrCode(qrCodeImageUrl?: string, pixPasteCopy?: string) {
  await ensureSchema();
  const res = await db.execute(
    "INSERT INTO qr_code (qr_code_image_url, pix_paste_copy) VALUES (?, ?)",
    [qrCodeImageUrl || null, pixPasteCopy || null]
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
  const rows = result.rows as unknown as GuestRow[];
  return rows.map((row) => ({
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
