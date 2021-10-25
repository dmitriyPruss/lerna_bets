const { DB } = require('./../constants');

module.exports = {
  development: {
    username: process.env.DB_USER ?? DB.USERNAME_DEFAULT,
    password: process.env.DB_PASSWORD ?? DB.PASSWORD_DEFAULT,
    database: DB.NAME_DB,
    host: process.env.DB_HOST ?? DB.HOST_DEFAULT,
    port: DB.PORT,
    dialect: DB.DIALECT
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
