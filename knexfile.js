const path = require('path');

const BASE_PATH = path.join(__dirname, 'app', 'db');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres://ijynwyewhpuvfl:2eab7d45b93aba0e59586e4b86145600b411da24a3a748aa20f5e0ce2f1f1d4c@ec2-107-21-205-25.compute-1.amazonaws.com:5432/d7kdcphqc1gm4a',
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
