// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host:     process.env.DB_HOST,
      port:     process.env.DB_PORT,
    },
    migrations: {
      directory: '..ssrc/models/migrations/'
    }
  },
};
