exports.up = (knex, Promise) =>
  knex.schema.createTable("users", t => {
    t.increments().index();

    t
      .string("username", 15)
      .unique()
      .notNullable()
      .index();

    t
      .string("hashed_password", 63)
      .notNullable()
      .index();

    t
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });

exports.down = (knex, Promise) => knex.schema.dropTable("users");
