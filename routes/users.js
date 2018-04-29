const router = require("express").Router();

module.exports = users => {
  router.get("/", (req, res) =>
    users
      .getAllUsers()
      .then(users => res.status(200).json(users))
      .catch(err => res.status(400).send(err.message))
  );

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    return users
      .insertUser(username, password)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).send(err.message));
  });

  router.get("/:username", (req, res) => {
    const username = req.params.username;
    return users
      .getUser(username)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).send(err.message));
  });

  const update = (req, res) => {
    const oldUsername = req.params.username;
    const oldPassword = req.body.oldPassword;
    const newUsername = req.body.newUsername
      ? req.body.newUsername
      : oldUsername;
    const newPassword = req.body.newPassword
      ? req.body.newPassword
      : oldPassword;
    return users
      .updateUser(oldUsername, oldPassword, newUsername, newPassword)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).send(err.message));
  };

  router.put("/:username", update);
  router.patch("/:username", update);

  router.delete("/:username", (req, res) => {
    const username = req.params.username;
    const password = req.body.password;
    return users
      .deleteUser(username, password)
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).send(err.message));
  });

  return router;
};
