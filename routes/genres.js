const router = require("express").Router();

module.exports = genres => {
  router.get("/", (req, res) => {
    genres
      .getAllgenres()
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).send(err.message));
  });
  return router;
};
