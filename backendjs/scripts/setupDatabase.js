const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function run() {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";

  const schemaPath = path.resolve(__dirname, "../../database/schema.sql");
  const seedPath = path.resolve(__dirname, "../../database/seed.sql");

  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  const seedSql = fs.readFileSync(seedPath, "utf-8");

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  try {
    await connection.query(schemaSql);
    await connection.query(seedSql);
    console.log("Banco configurado com sucesso (schema + seed).");
  } finally {
    await connection.end();
  }
}

run().catch((error) => {
  console.error("Erro ao configurar banco:", error.message);
  process.exit(1);
});
