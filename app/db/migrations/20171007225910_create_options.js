
exports.up = function(knex, Promise) {
    return knex.schema.createTable('options', (table) => {
        table.bigIncrements();
        table.string('description').notNullable();
        table.bigInteger('poll_id').unsigned().index().references('polls.id');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('options');
};
