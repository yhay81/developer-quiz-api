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
    body: "Use this to add one quiz to our database.",
    postData:
      '{\n\
    "quiz": "string",\n\
    "correct_answer": "string",\n\
    "wrong_answer1": "string",\n\
    "wrong_answer2": "string",\n\
    "wrong_answer3": "string",\n\
    "authour": "string(OPTIONAL)",\n\
    "password": "string(OPTIONAL)"\n\
}'
  },
  {
    id: 4,
    name: "DELETE /api/quizzes/:id",
    body: "Use this replace a quize.",
    postData: '{\n\
    "authour": "string",\n\
    "password": "string"\n\
}'
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
    postData: '{\n\
    "username": "string",\n\
    "password": "string"\n\
}'
  },
  {
    id: 8,
    name: "PUT/PATCH /api/users/:username",
    body: "Use this to update your user info.",
    postData:
      '{\n\
    "password": "string",\n\
    "newUsername": "string(OPTIONAL)",\n\
    "newPassword": "string(OPTIONAL)"\n\
}'
  },
  {
    id: 9,
    name: "DELETE /api/users/:id",
    body: "Use this to delete your user info.",
    postData: '{\n\
    "password": "string"\n\
}'
  }
];
router.get("/", (req, res, next) =>
  res.render("index", { title: "Developer Quiz", methods })
);

module.exports = router;
