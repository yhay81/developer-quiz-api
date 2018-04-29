const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/", users.get);
router.post("/", users.post);

router.get("/:id", users.getEach);
router.delete("/:id", users.deleteEach);

router.delete("/random", users.getRandom);

module.exports = router;
