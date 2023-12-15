const express = require("express");
const router = express.Router();
const users = require("./router/users");
const employees = require("./router/employees");

const app = express();
const port = 3000;



// parse JSON requests
app.use(express.json());


// welcome page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use("/api/v1/users", users);
app.use("/api/v1/employees", employees);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
