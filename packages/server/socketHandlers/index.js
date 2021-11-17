const {
  SOCKET_EVENTS: { NEW_BET }
} = require('../constants');

module.exports.newBetHandler = (socket, app) => {
  console.log(NEW_BET.CONNECTED);

  socket.on(NEW_BET.NAME, value => {
    try {
      value.userAgent = socket.handshake.headers['user-agent'];

      /***
       * присваиваем свойству newBetInstance объекта app.locals значение value для того,
       * чтобы его можно было "видеть" в betControllers - функции createBet
       */
      app.locals.newBetInstance = value;
    } catch (error) {
      io.emit(NEW_BET.ERROR, error);
    }
  });

  socket.on('disconnect', () => {
    console.log(NEW_BET.DISCONNECTED);
  });
};
