import { Pool } from "pg";

const isRemoteDb = process.env.DATABASE_URL?.includes("sslmode=require") || process.env.DATABASE_URL?.includes("neon.tech") || process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRemoteDb ? { rejectUnauthorized: false } : false,
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
} 