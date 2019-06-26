exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bikes', function(table) {
      table.increments('id').primary();
      table.string('country');
      table.string('name');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('bike');
      table.integer('bike_id').unsigned()
      table.foreign('bike_id')
      .references('bike_id');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('countries'),
    knex.schema.dropTable('bikes')
  ])
};
