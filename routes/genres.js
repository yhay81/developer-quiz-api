const express = require("express");
const router = express.Router();
const genres = require("../controllers/genres");

router.get("/", genres.get);
router.get("/:id", genres.getEach);

module.exports = router;
