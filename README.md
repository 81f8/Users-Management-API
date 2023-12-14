# Users-Management-API
User Management API
This is a simple Node.js API built with Express and PostgreSQL for managing user data.

Table of Contents
Getting Started
Prerequisites
Installation
Database Setup
Usage
Endpoints
Get All Users
Create a New User
Update User Details
Delete a User
Search Users
Filter Users by City
Get the First User
Get the Last User
Get a User by ID
Get a User's Geo Information and Google Maps Link
Contributing
License
Getting Started
Prerequisites
Node.js and npm installed
PostgreSQL installed and running
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install dependencies:
bash
Copy code
npm install
Database Setup
Create a PostgreSQL database named "users".
Update the database configuration in app.js:
javascript
Copy code
const pool = new Pool({
  user: "your-username",
  host: "localhost",
  database: "users",
  password: "your-password",
  port: 5432,
});
Usage
Endpoints
Get All Users
URL: /api/users
Method: GET
Description: Get a list of all users.
Create a New User
URL: /api/users
Method: POST
Description: Create a new user.
Update User Details
URL: /api/users/:id
Method: PUT
Description: Update user details by ID.
Delete a User
URL: /api/users/:id
Method: DELETE
Description: Delete a user by ID.
Search Users
URL: /api/users/search
Method: GET
Description: Search users by name or username.
Filter Users by City
URL: /api/users/filter
Method: GET
Description: Filter users by city.
Get the First User
URL: /api/users/first
Method: GET
Description: Get the first user.
Get the Last User
URL: /api/users/last
Method: GET
Description: Get the last user.
Get a User by ID
URL: /api/users/:id
Method: GET
Description: Get a user by ID.
Get a User's Geo Information and Google Maps Link
URL: /api/users/:id/geo
Method: GET
Description: Get a user's geo information and Google Maps link by ID.
Contributing
Feel free to contribute to this project. Follow the contributing guidelines.
