class Quiz {
  constructor(dbQuiz) {
    this.id = dbQuiz.id;
    this.quiz = dbQuiz.quiz;
    this.correctAnswer = dbQuiz.correct_answer;
    this.wrongAnswer1 = dbQuiz.wrong_answer1;
    this.wrongAnswer2 = dbQuiz.wrong_answer2;
    this.wrongAnswer3 = dbQuiz.wrong_answer3;
    this.genreName = dbQuiz.genre_name;
    this.author = dbQuiz.author;
    this.createdAt = new Date(dbQuiz.created_at);
  }
}

module.exports = knex => {
  const authenticate = require("./utils").authenticate;
  const quizzes = () =>
    knex("quizzes")
      .column(
        "quizzes.id",
        "quizzes.quiz",
        "quizzes.correct_answer",
        "quizzes.wrong_answer1",
        "quizzes.wrong_answer2",
        "quizzes.wrong_answer3",
        "genres.genre_name",
        "users.username as author"
      )
      .leftJoin("users", "quizzes.author_id", "users.id")
      .leftJoin("genres", "quizzes.genre_id", "genres.id");

  const getAllQuiz = () =>
    Promise.resolve(quizzes()).then(dbQuizzes =>
      dbQuizzes.map(dbQuiz => new Quiz(dbQuiz))
    );

  const insertQuiz = data => {
    const dbUser = data.author
      ? authenticate(data.author, data.password)
      : Promise.resolve({ id: 1, username: "Anonymous" });
    const genres = data.genreName
      ? knex("genres").where({ genre_name: data.genreName })
      : [{ id: 1, genre_name: "Uncategorized" }];
    return dbUser
      .then(user => Promise.all([user, genres]))
      .then(([user, genres]) => {
        if (genres.length === 0) {
          throw new Error(
            "There is no genre with this name: " + data.genreName
          );
        } else {
          return knex("quizzes").insert({
            quiz: data.quiz,
            correct_answer: data.correctAnswer,
            wron_answer1: data.wrongAnswer1,
            wrong_answer2: data.wrongAnswer2,
            wrong_answer3: data.wrongAnswer3,
            genre_id: genres[0].genre_id,
            author_id: user.id
          });
        }
      })
      .then(() => quizzes().where({ quiz }))
      .then(quizzes => new Quiz(quizzes[0]));
  };

  const getQuiz = id =>
    Promise.resolve(knex("quizzes").where({ id })).then(dbQuizzes => {
      if (dbQuizzes.length !== 0) {
        return new Quiz(dbQuizzes[0]);
      } else {
        throw new Error("There is no quiz with this id: " + id);
      }
    });

  const deleteQuiz = (id, author, password) =>
    authenticate(author, password).then(() =>
      knex("quizzes")
        .where({ id })
        .del()
    );

  const getRandomQuiz = genreId => {
    let randomQuiz;
    if (genreId) {
      randomQuiz = Promise.resolve(
        knex("quizzes")
          .where({ genre_id: genreId })
          .count(0)
      ).then(result => {
        const rand = Math.floor(parseInt(result[0].count) * Math.random());
        return quizzes()
          .where({ genre_id: genreId })
          .offset(rand)
          .limit(1);
      });
    } else {
      randomQuiz = Promise.resolve(knex("quizzes").count(0)).then(result => {
        const rand = Math.floor(parseInt(result[0].count) * Math.random());
        return quizzes()
          .offset(rand)
          .limit(1);
      });
    }
    return randomQuiz.then(dbQuizzes => {
      if (dbQuizzes.rowCount !== 0) {
        return new Quiz(dbQuizzes[0]);
      } else {
        throw new Error("There is no quiz yet.");
      }
    });
  };

  return {
    getAllQuiz,
    insertQuiz,
    getQuiz,
    deleteQuiz,
    getRandomQuiz
  };
};
