const knex = require('../connection');

function get() {
    return knex('polls')
        .returning('*');
}

function create(poll) {
    return knex('polls')
        .insert(poll)
        .returning('*');
}

module.exports = {
    get,
    create
}