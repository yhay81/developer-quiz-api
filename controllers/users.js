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

class User {
  constructor(dbUser) {
    this.id = dbUser.id;
    this.username = dbUser.username;
    this.createdAt = new Date(dbUser.created_at);
  }
}

const get = (req, res, next) =>
  Promise.resolve(knex("users").select()).then(users => {
    const user_objects = users.map(user => new User(user));
    return res.status(200).json(user_objects);
  });

const post = (req, res, next) => {
  const username = req.params.username;
  const password = req.body.password;
  return Promise.resolve(bcrypt.hash(password, saltRounds))
    .then(hashed_password =>
      knex("users").insert({ username, hashed_password })
    )
    .then(() => knex("users").where({ username }))
    .then(users => {
      const user_objects = users.map(user => new User(user));
      return res.status(200).json(user_objects);
    })
    .catch(err => res.status(400).send(err.message));
};

const getEach = (req, res, next) => {
  const username = req.params.username;
  return Promise.resolve(knex("users").where({ username }))
    .then(users => {
      if (users.length !== 0) {
        return res.status(200).json(new User(users[0]));
      } else {
        return res
          .status(401)
          .send("There is no user with this username: " + username);
      }
    })
    .catch(err => res.status(400).send(err.message));
};

const putEach = (req, res, next) => {
  const oldUsername = req.params.username;
  const oldPassword = req.body.oldPassword;
  const newUsername = req.body.newUsername ? req.body.newUsername : oldUsername;
  const newPassword = req.body.newPassword ? req.body.newPassword : oldPassword;
  return authenticate(oldUsername, password)
    .then(() => bcrypt.hash(newPassword, saltRounds))
    .then(newHashedPassword =>
      knex("users")
        .where({ username })
        .update({
          username: newUsername,
          hashed_password: newHashedPassword
        })
    )
    .then(() => knex("users").where({ username: newUsername }))
    .then(users => res.status(200).json(new User(users[0])))
    .catch(err => res.status(400).send(err.message));
};

const deleteEach = (req, res, next) => {
  const username = req.params.username;
  const password = req.body.password;
  return authenticate(username, password)
    .then(() =>
      knex("users")
        .where({ username })
        .del()
    )
    .then(() => res.status(200).send("Correctly deleted"))
    .catch(err => res.status(400).send(err.message));
};

module.exports = {
  get,
  post,
  getEach,
  putEach,
  deleteEach
};
