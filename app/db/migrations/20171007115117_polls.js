
exports.up = function(knex, Promise) {
    return knex.schema.createTable('polls', (table) => {
        table.bigIncrements();
        table.string('title').notNullable();
        table.uuid('uuid').index().unique();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('polls');
};
