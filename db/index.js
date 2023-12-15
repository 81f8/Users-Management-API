const { Pool } = require("pg");

// PostgreSQL database details
const pool = new Pool({
  user: "salam",
  host: "dpg-cltebo8l5elc73dnobr0-a",
  database: "users_6com",
  password: "D9DlOAPLzOaPFfc5ZdCjmSn3BHhXxTE5",
  port: 5432,
});

module.exports = pool;
