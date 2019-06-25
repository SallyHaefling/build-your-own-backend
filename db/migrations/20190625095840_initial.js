//everything in exports.up is what should happen in migration
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers', function(table) {
      table.increments('id').primary();
      table.string('author');
      table.string('title');

      //specifices specific type of timestamp 
      table.timestamps(true, true);
    }),

    knex.schema.createTable('footnotes', function(table) {
      table.increments('id').primary();
      table.string('note');
      //need something that creates foreign key below
      table.integer('paper_id').unsigned()
      table.foreign('paper_id')
        .references('paper_id');

      table.timestamps(true, true)
    })
  ])
  //make research table
  //make footnotes table
  
};

//in exports.down, we reverse whatever we do in exports.up
exports.down = function(knex, Promise) {
  return Promise.all([
    //drop those tables!
    knex.schema.dropTable('footnotes'),
    //drop footnotes first because last in first out
    knex.schema.dropTable('papers')
  ])
};
