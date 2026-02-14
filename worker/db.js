import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "eventlens"
});

export const db = {
  query(text, params) {
    return pool.query(text, params);
  }
};
