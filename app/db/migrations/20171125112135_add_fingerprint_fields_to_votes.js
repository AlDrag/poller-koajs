
exports.up = function(knex, Promise) {
    return knex.schema.table('votes', (t) => {
        knex('votes').w

        t.string('ip_address').notNull().defaultTo(0);
        t.string('user_agent').notNull().defaultTo(0);
        t.string('ip_address').notNull().alter();
        t.string('user_agent').notNull().alter();
        t.index(['ip_address']);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('votes', (t) => {
        t.dropIndex(['ip_address']);
        t.dropColumn('ip_address');
        t.dropColumn('user_agent');
    });
};
