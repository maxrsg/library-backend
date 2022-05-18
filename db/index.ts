import { Pool } from "pg";

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "Library",
  password: "postgres",
  port: 5432,
};

const pool = new Pool(credentials);

module.exports = {
  query: (text: string, params: any) => pool.query(text, params),
};
