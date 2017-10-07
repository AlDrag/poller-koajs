
exports.up = function(knex, Promise) {
    return knex.schema.createTable('votes', (table) => {
        table.increments();
        table.integer('poll_id').unsigned().index().references('polls.id');
        table.integer('option_id').unsigned().index().references('options.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('votes');
};
