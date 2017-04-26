
exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('milestones2', function(table) {
      table.integer('famous_person_id')
        .notNullable()
        .references('id')
        .inTable('famous_people')
        .onDelete('CASCADE')
        .index();
    })
  ]);
};

exports.down = function(knex) {
  return knex.schema.table('milestones2', (table) => {
    table.dropColumn('famous_person_id');
  });
};
