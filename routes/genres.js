const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/", users.get);
router.get("/:id", users.getEach);

module.exports = router;
