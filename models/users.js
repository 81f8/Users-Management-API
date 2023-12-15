const express = require("express");
const app = express();
const pool = require("../db");

// Function to get all users
async function getAllUsers(req, res) {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to create a new user
async function createUser(req, res) {
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
}

// Function to update user details by ID
async function updateUserById(req, res) {
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
}

// Function to delete a user by ID
async function deleteUserById(req, res) {
  const userId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to search users by name or username
async function searchUsers(req, res) {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE name ILIKE $1 OR username ILIKE $1",
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to filter users by city
async function filterUsersByCity(req, res) {
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
}

// Function to get the first user
async function getFirstUser(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id ASC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get the last user
async function getLastUser(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY id DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get a user by ID
async function getUserById(req, res) {
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
}

// Function to get a user's geo information and Google Maps link by ID
async function getUserGeoInfo(req, res) {
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
}

module.exports = {
  getAllUsers,
  createUser,
  updateUserById,
  deleteUserById,
  searchUsers,
  filterUsersByCity,
  getFirstUser,
  getLastUser,
  getUserById,
  getUserGeoInfo,
};
