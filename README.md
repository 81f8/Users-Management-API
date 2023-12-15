# User Management API

This is a simple Node.js API built with Express and PostgreSQL for managing user data.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Usage](#usage)
  - [Endpoints](#endpoints)
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
- [Contributing](#contributing)
- [License](#license)

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
  user: "your-username",
  host: "localhost",
  database: "users",
  password: "your-password",
  port: 5432,
});
```

## Usage

### Endpoints

#### Get All Users

- **URL:** `/api/users`
- **Method:** `GET`
- **Description:** Get a list of all users.

#### Create a New User

- **URL:** `/api/users`
- **Method:** `POST`
- **Description:** Create a new user.

#### Update User Details

- **URL:** `/api/users/:id`
- **Method:** `PUT`
- **Description:** Update user details by ID.

#### Delete a User

- **URL:** `/api/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a user by ID.

#### Search Users

- **URL:** `/api/users/search`
- **Method:** `GET`
- **Description:** Search users by name or username.

#### Filter Users by City

- **URL:** `/api/users/filter`
- **Method:** `GET`
- **Description:** Filter users by city.

#### Get the First User

- **URL:** `/api/users/first`
- **Method:** `GET`
- **Description:** Get the first user.

#### Get the Last User

- **URL:** `/api/users/last`
- **Method:** `GET`
- **Description:** Get the last user.

#### Get a User by ID

- **URL:** `/api/users/:id`
- **Method:** `GET`
- **Description:** Get a user by ID.

#### Get a User's Geo Information and Google Maps Link

- **URL:** `/api/users/:id/geo`
- **Method:** `GET`
- **Description:** Get a user's geo information and Google Maps link by ID.

## Contributing

Feel free to contribute to this project.


