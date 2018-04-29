const bcrypt = require("bcrypt");

module.exports = knex => {
  authenticate = (username, password) =>
    Promise.resolve(knex("users").where({ username }))
      .then(users => {
        if (users.length === 0) {
          return res.status(401).send("username does not match");
        } else {
          return Promise.all(
            users[0],
            bcrypt.compare(password, users[0].hashed_password)
          );
        }
      })
      .then(([user, passMached]) => {
        if (!passMached) {
          return res.status(401).send("password does not match");
        }
        return user;
      });
  return { authenticate };
};
