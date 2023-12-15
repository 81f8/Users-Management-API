const express = require("express");
const router = express.Router();
const {
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
} = require("../models/users");

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.get("/search", searchUsers);
router.get("/filter", filterUsersByCity);
router.get("/first", getFirstUser);
router.get("/last", getLastUser);
router.get("/:id", getUserById);
router.get("/:id/geo", getUserGeoInfo);

module.exports = router;