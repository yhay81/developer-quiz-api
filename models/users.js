const bcrypt = require("bcrypt");
const saltRounds = 10;

class User {
  constructor(dbUser) {
    this.id = dbUser.id;
    this.username = dbUser.username;
    this.createdAt = new Date(dbUser.created_at);
  }
}

module.exports = knex => {
  const authenticate = require("./utils")(knex).authenticate;

  const getAllUsers = () =>
    Promise.resolve(knex("users").select()).then(dbUsers =>
      dbUsers.map(dbUser => new User(dbUser))
    );

  const insertUser = (username, password) =>
    Promise.resolve(bcrypt.hash(password, saltRounds))
      .then(hashed_password =>
        knex("users").insert({ username, hashed_password })
      )
      .then(() => knex("users").where({ username }))
      .then(dbUsers => new User(dbUsers[0]));

  const getUser = username =>
    Promise.resolve(knex("users").where({ username })).then(dbUsers => {
      if (dbUsers.length !== 0) {
        return new User(dbUsers[0]);
      } else {
        throw new Error("There is no user with this username: " + username);
      }
    });

  const updateUser = (oldUsername, oldPassword, newUsername, newPassword) => {
    return authenticate(oldUsername, password)
      .then(user => bcrypt.hash(newPassword, saltRounds))
      .then(newHashedPassword =>
        knex("users")
          .where({ username })
          .update({
            username: newUsername,
            hashed_password: newHashedPassword
          })
      )
      .then(() => knex("users").where({ username: newUsername }))
      .then(dbUsers => new User(dbUsers[0]));
  };

  const deleteUser = (username, password) =>
    authenticate(username, password).then(user =>
      knex("users")
        .where({ username })
        .del()
    );

  return {
    getAllUsers,
    insertUser,
    getUser,
    updateUser,
    deleteUser
  };
};
