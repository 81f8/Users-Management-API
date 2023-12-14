const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL database details
const pool = new Pool({
  user: "salam",
  host: "dpg-cltebo8l5elc73dnobr0-a",
  database: "users_6com",
  password: "D9DlOAPLzOaPFfc5ZdCjmSn3BHhXxTE5",
  port: 5432,
});

// parse JSON requests
app.use(express.json());

// API endpoint to get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to create a new user
app.post("/api/users", async (req, res) => {
    const { name, username, email, address } = req.body;
  
    try {
      const result = await pool.query(
        "INSERT INTO users (name, username, email, address) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, username, email, address]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
// API endpoint to update user details by ID
app.put("/api/users/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, username, email, address } = req.body;
  
    try {
      const result = await pool.query(
        "UPDATE users SET name = $1, username = $2, email = $3, address = $4 WHERE id = $5 RETURNING *",
        [name, username, email, address, userId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
// API endpoint to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
        userId,
      ]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
  

// API endpoint to search users by name or username
app.get("/api/users/search", async (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE name ILIKE $1 OR username ILIKE $1",
      [`%${searchTerm}%`]
      // $1 will be replaced with the `%${searchTerm}%` in sql engine to prevent SQL injection
      // the user inputs shouldn't be direct in the query string
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to filter users by city
app.get("/api/users/filter", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE address->>'city' ILIKE $1",
      [`%${city}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get the first user
app.get("/api/users/first", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get the last user
app.get("/api/users/last", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get a user by ID
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to get a user's geo information and Google Maps link by ID
app.get("/api/users/:id/geo", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT address->>'geo' AS geo FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userGeo = result.rows[0].geo;
    const { lat, lng } = JSON.parse(userGeo);
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    res.json({
      geo: userGeo,
      googleMapsLink: googleMapsLink,
    });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
