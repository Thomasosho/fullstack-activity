import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

async function getPostgresVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

async function createTodosTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        task VARCHAR(255),
        is_completed BOOLEAN,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    console.log('Table "todos" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

async function createDeyPlayTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS deyPlay (
        id SERIAL PRIMARY KEY,
        task VARCHAR(255),
        is_completed BOOLEAN,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;
    console.log('Table "todos" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

getPostgresVersion();
createTodosTable();
createDeyPlayTable();

export default sql;
