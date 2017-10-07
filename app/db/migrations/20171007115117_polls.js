
exports.up = function(knex, Promise) {
    return knex.schema.createTable('polls', (table) => {
        table.increments();
        table.string('title').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('polls');
};
