import dotenv from "dotenv";
import { createClient } from "@libsql/client";

dotenv.config({ path: ".env.local" });

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export type Gift = {
  id: number;
  title: string;
  price: string;
  purchased: boolean;
  image: string;
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
      purchased INTEGER DEFAULT 0
    )
  `);
}

export async function getGifts() {
  await ensureSchema();
  const result = await db.execute(
    "SELECT id, name, price, purchased FROM gifts ORDER BY id"
  );
  return result.rows.map(normalizeGift);
}

export async function getGuests() {
  await ensureSchema();
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
