class Genre {
  constructor(dbGenre) {
    this.id = dbGenre.id;
    this.genreName = dbGenre.genre_name;
  }
}

module.exports = knex => {
  const getAllgenres = () =>
    Promise.resolve(knex("genres").select()).then(dbGenres =>
      dbGenres.map(dbGenre => new Genre(dbGenre))
    );

  return {
    getAllgenres
  };
};
