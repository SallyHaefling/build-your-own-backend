exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('country');
      table.string('city');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('bikes', function(table) {
      table.increments('id').primary();
      table.string('bike_name');
      table.integer('country_id').unsigned()
      table.foreign('country_id')
      .references('countries.id');
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bikes'),
    knex.schema.dropTable('countries')
  ])
};
