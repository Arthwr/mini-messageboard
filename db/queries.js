const pool = require("./pool");

async function getAllMessages() {
  try {
    const { rows } = await pool.query(`SELECT * FROM ${process.env.TABLE_NAME}`);
    return rows;
  } catch (error) {
    console.error("Error fetching messages: ", error.message);
    throw new Error("Unable to retrieve messages from the database");
  }
}

async function postNewMessage(username, messageText) {
  try {
    await pool.query(
      `
    INSERT INTO ${process.env.TABLE_NAME} (username, text, sent_at)
    VALUES ($1, $2, CURRENT_TIMESTAMP);
    `,
      [username, messageText]
    );
  } catch (error) {
    console.error("Error inserting message: ", error.message);
    throw error;
  }
}

module.exports = { getAllMessages, postNewMessage };
