const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'db');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'poller_db',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'poller_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      tableName: 'knex_migrations'
    },
  }

};
