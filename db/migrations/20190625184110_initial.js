exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('bikes', function(table) {
      table.increments('id').primary();
      table.string('country', 100000);
      table.string('name', 100000);

      table.timestamps(true, true);
    }),

    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('country');
      table.integer('bike_id').unsigned()
      table.foreign('bike_id')
      .references('bikes.id');
//^^trying to link foreign key with primary key
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
