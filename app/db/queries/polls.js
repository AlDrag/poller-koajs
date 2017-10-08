const knex = require('../connection');

function get() {
    return knex('polls')
        .returning('*');
}

/**
 * 
 * @param {title: string, options: string[]} poll 
 */
function create(poll) {
    console.log('Poll: ', poll);
    return knex.transaction((t) => {
        return knex("polls")
            .transacting(t)
            .insert({title: poll.title})
            .returning('*')
            .then((response) => {
                const options = poll.options.map((option) => {
                    return {description: option, poll_id: response.id};
                });
                return knex('options')
                    .transacting(t)
                    .insert(options)
                    .returning('*');
            })
            .then(t.commit)
            .catch(t.rollback)
        });
}

module.exports = {
    get,
    create
}