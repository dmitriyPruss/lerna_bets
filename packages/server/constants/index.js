const CONSTANTS = {
  DB: {
    USERNAME_DEFAULT: 'postgres',
    PASSWORD_DEFAULT: 'admin',
    NAME_DB: 'tasks_db_dev',
    HOST_DEFAULT: '127.0.0.1',
    PORT: 5432,
    DIALECT: 'postgres'
  },
  PAGINATION: {
    LIMIT_HTTP_REQUEST_DEFAULT: 7,
    LIMIT_RENDER_DEFAULT: 8,
    OFFSET_DEFAULT: 0
  },

  ERRORS: {
    ERROR_404: {
      ERROR_STATUS: 404,
      ERROR_MESSAGE: 'Not Found'
    },
    ERROR_422: {
      ERROR_STATUS: 422,
      ERROR_CODE: '422 Unprocessable Entity',
      title: ['Validation Error', 'SQL Sequelize base error']
    },
    ERROR_500: {
      ERROR_STATUS: 500,
      ERROR_MESSAGE: 'Internal Server Error'
    }
  }
};

module.exports = CONSTANTS;
