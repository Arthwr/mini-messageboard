require("dotenv").config({ path: ".env.production" });
const { Client } = require("pg");

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    text TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
`;

const SQL_CHECK_TABLE = `
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name = 'messages'
);
`;

async function main() {
  console.log("seeding db..");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    await client.query(SQL_CREATE_TABLE);
    console.log("Table creation script executed.");

    const res = await client.query(SQL_CHECK_TABLE);
    const tableExists = res.rows[0].exists;

    if (tableExists) {
      console.log("Table 'messages' exists or has been created successfully.");
    } else {
      console.log("Table 'messages' has not been created or doesn't exists");
    }
  } catch (error) {
    console.error("Error while seeding DB:", error.message);
  } finally {
    await client.end();
    console.log("done populating db");
  }
}

main();
