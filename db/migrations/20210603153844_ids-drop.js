
exports.up = function(knex) {
  return knex.schema
    .createTable('jobs', function (table) {
      table.increments('id').primary();
      table.string('image');
      table.string('name');
      table.string('date');
      table.integer('pay').unsigned()
      table.boolean('isBooked');
      table.string('fluff');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('jobs')
};
