// Importamos la librería de PostgreSQL
const { Pool } = require("pg");

// Configuración de la base de datos
const config = {
  host: "localhost",
  port: 5432,
  database: "bancosolar",
  user: "postgres",
  password: "postgres",
  max: 20,
  min: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000000,
};

// Instanciamos la clase Pool
const pool = new Pool(config);

module.exports = pool;