
exports.up = function(knex, Promise) {
    return knex.schema.createTable('options', (table) => {
        table.increments();
        table.string('description').notNullable();
        table.integer('poll_id').unsigned().index().references('polls.id');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('options');
};
