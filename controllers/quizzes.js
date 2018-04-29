const bcrypt = require("bcrypt");
const saltRounds = 10;
const Knex = require("knex");
const knex = Knex({
  client: "pg",
  port: 5432,
  connection: {
    host: "127.0.0.1",
    database: "developer_quiz"
  }
});
const authenticate = require("./utils").authenticate;

class Quiz {
  constructor(dbQuiz) {
    this.id = dbQuiz.id;
    this.quiz = dbQuiz.quiz;
    this.correctAnswer = dbQuiz.correct_answer;
    this.wrongAnswer1 = dbQuiz.wron_answer1;
    this.wrongAnswer2 = dbQuiz.wrong_answer2;
    this.wrongAnswer3 = dbQuiz.wrong_answer3;
    this.genreName = dbQuiz.genre_name;
    this.author = dbQuiz.author;
    this.createdAt = new Date(dbQuiz.created_at);
  }
}

const get = (req, res, next) =>
  Promise.resolve(knex("quizzes").select()).then(quizzes => {
    const quiz_objects = quizzes.map(quiz => new Quiz(quiz));
    return res.status(200).json(quiz_objects);
  });

const post = (req, res, next) => {
  const quiz = req.body.quiz;
  const correctAnswer = req.body.correct_answer;
  const wrongAnswer1 = req.body.wron_answer1;
  const wrongAnswer2 = req.body.wrong_answer2;
  const wrongAnswer3 = req.body.wrong_answer3;
  const genreName = req.body.genre_name;
  let author = req.body.author;
  if (author) {
    const password = req.body.password;
    return authenticate(author, password)
      .then(user =>
        Promise.all([user, knex("genres").where({ genre_name: genreName })])
      )
      .then(([user, genres]) => {
        if (genres.length === 0) {
          return res
            .status(401)
            .send("There is no genre with this name: " + genreName);
        } else {
          return knex("quizzes").insert({
            quiz,
            correct_answer: correctAnswer,
            wron_answer1: wrongAnswer1,
            wrong_answer2: wrongAnswer2,
            wrong_answer3: wrongAnswer3,
            genre_id: genres[0].genre_id,
            author_id: user.id
          });
        }
      })
      .then(() => knex("quizzes").where({ quiz }))
      .then(quizzes => res.status(200).json(new Quiz(quizzes[0])))
      .catch(err => res.status(400).send(err.message));
  }
  author = "Anonymous";
  return Promise.resolve(knex("genres").where({ genre_name: genreName }))
    .then(genres => {
      if (genres.length === 0) {
        return res
          .status(401)
          .send("There is no genre with this name: " + genreName);
      } else {
        return knex("quizzes").insert({
          quiz,
          correct_answer: correctAnswer,
          wron_answer1: wrongAnswer1,
          wrong_answer2: wrongAnswer2,
          wrong_answer3: wrongAnswer3,
          genre_id: genres[0].genre_id
        });
      }
    })
    .then(() => knex("quizzes").where({ quiz }))
    .then(quizzes => res.status(200).json(new Quiz(quizzes[0])))
    .catch(err => res.status(400).send(err.message));
};

const getEach = (req, res, next) => {
  const id = req.params.id;
  return Promise.resolve(knex("quizzes").where({ id }))
    .then(quizzes => {
      if (quizzes.length !== 0) {
        return res.status(200).json(new Quiz(quizzes[0]));
      } else {
        return res.status(401).send("There is no quiz with this id: " + id);
      }
    })
    .catch(err => res.status(400).send(err.message));
};

const deleteEach = (req, res, next) => {
  const id = req.params.id;
  const author = req.body.author;
  const password = req.body.password;
  return authenticate(author, password)
    .then(() =>
      knex("quizzes")
        .where({ id })
        .del()
    )
    .then(() => res.status(200).send("Correctly deleted"))
    .catch(err => res.status(400).send(err.message));
};

const getRandom = (req, res, next) =>
  Promise.resolve(knex("quizzes").count(0))
    .then(result => {
      const rand = Math.floor(parseInt(result[0].count) * Math.random());
      return knex("quizzes")
        .offset(rand)
        .limit(1);
    })
    .then(quizzes => {
      if (quizzes.rowCount !== 0) {
        return res.status(200).json(new Quiz(quizzes[0]));
      } else {
        return res.status(401).send("There is no quiz yet.");
      }
    })
    .catch(err => res.status(400).send(err.message));

module.exports = {
  get,
  post,
  getEach,
  deleteEach,
  getRandom
};
