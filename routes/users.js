const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.get("/", users.get);
router.post("/", users.post);

router.get("/:username", users.getEach);
router.put("/:username", users.putEach);
router.patch("/:username", users.putEach);
router.delete("/:username", users.deleteEach);

module.exports = router;
