const CONSTANTS = {
  PORT_DEFAULT: 5000,
  DB: {
    USERNAME_DEFAULT: 'postgres',
    PASSWORD_DEFAULT: 'admin',
    NAME_DB: 'bets_db_dev',
    HOST_DEFAULT: '127.0.0.1',
    PORT: 5432,
    DIALECT: 'postgres'
  },
  CORS_ORIGIN_DEFAULT: 'http://localhost:3000',
  SOCKET_EVENTS: {
    NEW_BET: {
      CONNECTED: 'SOCKET IS CONNECTED',
      DISCONNECTED: 'CLIENT IS DISCONNECTED',
      NAME: 'NEW_BET',
      ERROR: 'NEW_BET_ERROR'
    }
  },
  PAGINATION: {
    LIMIT_HTTP_REQUEST_DEFAULT: 7,
    LIMIT_RENDER_DEFAULT: 8,
    OFFSET_DEFAULT: 0,
    TEAM_VALIDATION: {
      REQUIRED: 'Team value must not be empty'
    },
    REQUEST_VALIDATION: {
      LIMIT: {
        MIN: 'Limit - less than the min value',
        MAX: 'Limit - more than the max value',
        REQUIRED: 'Limit value must not be empty'
      },
      OFFSET: {
        MIN: 'Offset - less than the min value',
        REQUIRED: 'Offset - less than the min value'
      }
    }
  },
  ERRORS: {
    ERROR_404: {
      ERROR_STATUS: 404,
      ERROR_MESSAGE: 'Not Found'
    },
    ERROR_422: {
      ERROR_STATUS: 422,
      ERROR_CODE: '422 Unprocessable Entity',
      TITLE: ['Validation Error', 'SQL Sequelize base error']
    },
    ERROR_500: {
      ERROR_STATUS: 500,
      ERROR_MESSAGE: 'Internal Server Error'
    }
  }
};

module.exports = CONSTANTS;
