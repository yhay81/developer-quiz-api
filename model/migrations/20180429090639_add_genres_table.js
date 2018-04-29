exports.up = (knex, Promise) =>
  knex.schema.createTable("genres", t => {
    t.increments().index();

    t
      .string("genre_name", 31)
      .unique()
      .notNullable()
      .index();
  });

exports.down = (knex, Promise) => knex.schema.dropTable("genres");
