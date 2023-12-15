# User and Employee Management API

This is a simple Node.js API built with Express and PostgreSQL for managing user and employee data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Usage](#usage)
  - [Endpoints for Users](#endpoints-for-users)
    - [Get All Users](#get-all-users)
    - [Create a New User](#create-a-new-user)
    - [Update User Details](#update-user-details)
    - [Delete a User](#delete-a-user)
    - [Search Users](#search-users)
    - [Filter Users by City](#filter-users-by-city)
    - [Get the First User](#get-the-first-user)
    - [Get the Last User](#get-the-last-user)
    - [Get a User by ID](#get-a-user-by-id)
    - [Get a User's Geo Information and Google Maps Link](#get-a-users-geo-information-and-google-maps-link)
  - [Endpoints for Employees](#endpoints-for-employees)
    - [Get All Employees](#get-all-employees)
    - [Create a New Employee](#create-a-new-employee)
    - [Update Employee Details](#update-employee-details)
    - [Delete an Employee](#delete-an-employee)
    - [Search Employees](#search-employees)
    - [Filter Employees by Department](#filter-employees-by-department)
    - [Get the First Employee](#get-the-first-employee)
    - [Get the Last Employee](#get-the-last-employee)
    - [Get an Employee by ID](#get-an-employee-by-id)
- [Contributing](#contributing)
- [License](#license)
- [Ignoring node_modules](#ignoring-node_modules)

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Installation

1. Clone the repository:

```bash
git clone https://github.com/81f8/Users-Management-API.git
cd Users-Management-API
```

2. Install dependencies:

```bash
npm install
```

### Database Setup

1. Create a PostgreSQL database named "users".
2. Update the database configuration in `app.js`:

```javascript
const pool = new Pool({
  user: process.env.DB_USER || "your-username",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "users",
  password: process.env.DB_PASSWORD || "your-password",
  port: process.env.DB_PORT || 5432,
});
```

## Usage

### Endpoints for Users

...

### Endpoints for Employees

#### Get All Employees

- **URL:** `/api/employees`
- **Method:** `GET`
- **Description:** Get a list of all employees.

#### Create a New Employee

- **URL:** `/api/employees`
- **Method:** `POST`
- **Description:** Create a new employee.

#### Update Employee Details

- **URL:** `/api/employees/:id`
- **Method:** `PUT`
- **Description:** Update employee details by ID.

#### Delete an Employee

- **URL:** `/api/employees/:id`
- **Method:** `DELETE`
- **Description:** Delete an employee by ID.

#### Search Employees

- **URL:** `/api/employees/search`
- **Method:** `GET`
- **Description:** Search employees by name or email.

#### Filter Employees by Department

- **URL:** `/api/employees/filter`
- **Method:** `GET`
- **Description:** Filter employees by department.

#### Get the First Employee

- **URL:** `/api/employees/first`
- **Method:** `GET`
- **Description:** Get the first employee.

#### Get the Last Employee

- **URL:** `/api/employees/last`
- **Method:** `GET`
- **Description:** Get the last employee.

#### Get an Employee by ID

- **URL:** `/api/employees/:id`
- **Method:** `GET`
- **Description:** Get an employee by ID.

...
Feel free to customize the content further based on your specific requirements.