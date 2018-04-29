var express = require("express");
var router = express.Router();

const methods = [
  {
    id: 1,
    name: "GET /api/quizzes",
    body: "Use this to get all available quizzes."
  },
  {
    id: 2,
    name: "GET /api/quizzes/random",
    body: "Use this to get one random quiz."
  },
  {
    id: 3,
    name: "POST /api/quizzes/",
    body: "Use this to add one quote to our database.",
    postData:
      "{quiz: string,correct_answer: string, wrong_answer1: string,wrong_answer2: string,wrong_answer3: string,authour: string(OPTIONAL), password: string(OPTIONAL)}"
  },
  {
    id: 4,
    name: "DELETE /api/quizzes/:id",
    body: "Use this replace a quize.",
    postData: "{authour: string, password: string}"
  },
  {
    id: 5,
    name: "GET /api/genres",
    body: "Use this to get all available genres."
  },
  {
    id: 6,
    name: "GET /api/users/",
    body: "Use this to get user list."
  },
  {
    id: 7,
    name: "POST /api/users/",
    body: "Use this to register as a author.",
    postData: "{username: string, password: string}"
  },
  {
    id: 8,
    name: "PUT/PATCH /api/users/:username",
    body: "Use this to update your user info.",
    postData:
      "{ password: string, newUsername: string(OPTIONAL), newPassword: string(OPTIONAL) }"
  },
  {
    id: 9,
    name: "DELETE /api/users/:id",
    body: "Use this to delete your user info.",
    postData: "{ password: string }"
  }
];
router.get("/", (req, res, next) =>
  res.render("index", { title: "Developer Quiz", methods })
);

module.exports = router;
