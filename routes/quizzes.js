const router = require("express").Router();

module.exports = quizzes => {
  router.get("/", (req, res) =>
    quizzes
      .getAllQuiz()
      .then(quiz => res.status(200).json(quiz))
      .catch(err => res.status(400).send(err.message))
  );

  router.post("/", (req, res) => {
    const data = {
      quiz: req.body.quiz,
      correctAnswer: req.body.correct_answer,
      wrongAnswer1: req.body.wron_answer1,
      wrongAnswer2: req.body.wrong_answer2,
      wrongAnswer3: req.body.wrong_answer3,
      genreName: req.body.genre_name
    };
    return quizzes
      .insertQuiz(data)
      .then(quiz => res.status(200).json(quiz))
      .catch(err => res.status(400).send(err.message));
  });

  router.get("/random", (req, res) =>
    quizzes
      .getRandomQuiz()
      .then(quiz => res.status(200).json(quiz))
      .catch(err => res.status(400).send(err.message))
  );

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    return quizzes
      .getQuiz(id)
      .then(quiz => res.status(200).json(quiz))
      .catch(err => res.status(400).send(err.message));
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const author = req.params.author;
    const password = req.params.password;
    return quizzes
      .deleteQuiz(id, author, password)
      .then(quiz => res.status(200).json(quiz))
      .catch(err => res.status(400).send(err.message));
  });

  return router;
};
