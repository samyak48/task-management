// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const { knexSnakeCaseMappers } = require('objection');
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'test-4',
      user: 'root',
      password: 'Samyak26$'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ...knexSnakeCaseMappers
  },
};
