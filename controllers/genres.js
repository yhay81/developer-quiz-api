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

class Genre {
  constructor(dbGenre) {
    this.id = dbGenre.id;
    this.genreName = dbGenre.genre_name;
  }
}

const get = (req, res, next) =>
  Promise.resolve(knex("genres").select()).then(genres => {
    const genre_objects = genres.map(genre => new Genre(genre));
    return res.status(200).json(genre_objects);
  });

const getEach = (req, res, next) =>
  Promise.resolve(knex("genres").where({ id: req.params.id }))
    .then(genres => {
      if (genres.length !== 0) {
        return res.status(200).json(new Genre(genres[0]));
      } else {
        return res
          .status(401)
          .send("There is no genre with this id: " + req.params.id);
      }
    })
    .catch(err => res.status(400).send(err.message));

module.exports = {
  get,
  getEach
};
