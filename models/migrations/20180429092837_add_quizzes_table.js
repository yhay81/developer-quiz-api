exports.up = (knex, Promise) =>
  knex.schema.createTable("quizzes", t => {
    t.increments().index();

    t.text("quiz").notNullable();

    t.text("correct_answer").notNullable();

    t.text("wrong_answer1");
    t.text("wrong_answer2");
    t.text("wrong_answer3");

    t.integer("genre_id");
    t.foreign("genre_id").references("genres.id");

    t.integer("author_id");
    t.foreign("author_id").references("users.id");

    t
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });

exports.down = (knex, Promise) => knex.schema.dropTable("quizzes");
