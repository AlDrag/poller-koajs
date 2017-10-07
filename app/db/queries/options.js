const knex = require('../connection');

function addOption(option) {
    return knex('options')
    .insert(option)
    .returning('*');
  }

module.exports = {
    addOption
}