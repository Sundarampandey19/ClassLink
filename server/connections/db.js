import mysql from 'mysql2/promise';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to create and return a MySQL connection pool
export const createPool = async () => {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      ca: fs.readFileSync(process.env.DB_SSL_CA_PATH)
    }
  });
};


 const pool = await createPool();
 export default pool