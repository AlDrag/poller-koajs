const knex = require('../connection');

function get(pollID) {
    return knex('options')
        .where('poll_id', pollID)
        .returning('*');
}

function create(option) {
    return knex('options')
        .insert(option)
        .returning('*');
}

module.exports = {
    get,
    create
}