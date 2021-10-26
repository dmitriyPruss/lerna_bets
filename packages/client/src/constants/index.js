const CONSTANTS = {
  BASE_URL: 'http://127.0.0.1:5000/api',
  MY_LOCAL_IP: '192.168.0.103',
  VALIDATION: {
    INPUT: {
      TEAM: {
        MIN: 'Very few symbols!',
        MAX: 'Too much symbols!',
        REQUIRED: 'Field musn`t be empty!'
      }
    }
  },
  SOCKET_IO_URI: 'ws://localhost:5000',
  SOCKET_EVENTS: {
    NEW_BET: 'NEW_BET',
    NEW_BET_ERROR: 'NEW_BET_ERROR'
  }
};

export default CONSTANTS;
