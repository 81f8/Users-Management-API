const pool = require("../db");

// Function to get all employees
async function getAllEmployees(req, res) {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to create a new employee
async function createEmployee(req, res) {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_title,
    salary,
    department,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, salary, department) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_title,
        salary,
        department,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to update employee details by ID
async function updateEmployeeById(req, res) {
  const employeeId = req.params.id;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    hire_date,
    job_title,
    salary,
    department,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE employees SET first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, job_title = $6, salary = $7, department = $8 WHERE id = $9 RETURNING *",
      [
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_title,
        salary,
        department,
        employeeId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to delete an employee by ID
async function deleteEmployeeById(req, res) {
  const employeeId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING *",
      [employeeId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to search employees by name or email
async function searchEmployees(req, res) {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: "Search term is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM employees WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1",
      [`%${searchTerm}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to filter employees by department
async function filterEmployeesByDepartment(req, res) {
  const department = req.query.department;

  if (!department) {
    return res.status(400).json({ error: "Department parameter is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM employees WHERE department ILIKE $1",
      [`%${department}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get the first employee
async function getFirstEmployee(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get the last employee
async function getLastEmployee(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id DESC LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get an employee by ID
async function getEmployeeById(req, res) {
  const employeeId = req.params.id;

  try {
    const result = await pool.query("SELECT * FROM employees WHERE id = $1", [
      employeeId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
  searchEmployees,
  filterEmployeesByDepartment,
  getFirstEmployee,
  getLastEmployee,
  getEmployeeById,
};
