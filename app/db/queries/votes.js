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

function getResults(uuid) {
    return knex('votes')
        .count('options.id')
        .innerJoin('polls', function () {
            this.on('votes.poll_id', '=', 'polls.id').onIn('polls.uuid', [uuid]);
        })
        .innerJoin('options', 'options.id', 'votes.option_id')
        .groupBy('options.id')
        .select('options.id', 'options.poll_id', 'options.description');
}

async function hasVoted(pollID, ipAddress, userAgent) {
    const votes = await knex('votes')
        .where({'poll_id': pollID, 'ip_address': ipAddress})
        .select('votes.id')

    return votes.length > 0;
}

function create(vote) {
    return knex('votes')
        .insert(vote)
        .returning('*')
}

module.exports = {
    get,
    getByPollID,
    getResults,
    hasVoted,
    create
}