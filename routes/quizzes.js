const express = require("express");
const router = express.Router();
const quizzes = require("../controllers/quizzes");

router.get("/", quizzes.get);
router.post("/", quizzes.post);

router.get("/random", quizzes.getRandom);

router.get("/:id", quizzes.getEach);
router.delete("/:id", quizzes.deleteEach);

module.exports = router;
