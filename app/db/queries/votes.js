const knex = require('../connection');

function get() {
    return knex('votes')
        .returning('*');
}

function getByPollID(id) {
    return knex('votes')
        .where('poll_id', id)
        .returning('*');
}

function create(vote) {
    return knex('votes')
        .insert(vote)
        .returning('*');
}

module.exports = {
    get,
    getByPollID,
    create
}