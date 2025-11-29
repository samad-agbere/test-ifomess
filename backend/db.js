const { Client } = require("pg");
require('dotenv').config({ quiet: true });

const db = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 5432,
});

db.connect()
  .then(() => console.log("✅ Base connectée"))
  .catch(err => console.error("❌ PostgreSQL erreur de connexion:", err));

module.exports = db;