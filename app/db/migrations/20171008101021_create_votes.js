
exports.up = function(knex, Promise) {
    return knex.schema.createTable('votes', (table) => {
        table.bigIncrements();
        table.bigInteger('poll_id').unsigned().index().references('polls.id');
        table.bigInteger('option_id').unsigned().index().references('options.id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('votes');
};
