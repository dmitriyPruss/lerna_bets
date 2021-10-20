module.exports = {
  development: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.db_password ?? 'admin',
    database: 'todos_db_dev',
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
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
