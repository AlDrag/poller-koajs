const knex = require('../connection');
const uuidv4 = require('uuid/v4');

function get() {
    return knex('polls')
        .returning('*');
}

function getByUUID(uuid) {
    return knex('polls')
        .where('uuid', uuid)
        .returning('*');
}

/**
 * 
 * @param {title: string, options: string[]} poll 
 */
function create(poll) {
    return knex.transaction((t) => {
        return knex("polls")
            .transacting(t)
            .insert({title: poll.title, uuid: uuidv4()})
            .returning('*')
            .then((pollsResponse) => {
                const options = poll.options.map((option) => {
                    return {description: option, poll_id: pollsResponse[0].id};
                });
                return knex('options')
                    .transacting(t)
                    .insert(options)
                    .returning('*')
                    .then((optionsResponse) => {
                        let response = pollsResponse[0];
                        response.options = optionsResponse
                        return response;
                    });
            })
            .then(t.commit)
            .catch(t.rollback)
        });
}

module.exports = {
    get,
    getByUUID,
    create
}