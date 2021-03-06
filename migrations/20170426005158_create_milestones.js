
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table) {
      table.increments();
      table.string('description');
      table.datetime('achieved_at');
    })
  ]);
};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones');
};
