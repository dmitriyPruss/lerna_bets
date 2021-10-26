const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const {
  PORT_DEFAULT,
  CORS_ORIGIN_DEFAULT,
  SOCKET_EVENTS
} = require('./constants');
// require('./models');

const httpServer = http.createServer(app);
const ioSets = { cors: { origin: CORS_ORIGIN_DEFAULT } };
const io = new Server(httpServer, ioSets);

app.locals.io = io;

io.on('connection', socket => {
  console.log(`socket.connected`, socket.connected);

  socket.on(SOCKET_EVENTS.NEW_BET, value => {
    try {
      value.userAgent = socket.handshake.headers['user-agent'];
      app.locals.newBetInstance = value;
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_BET_ERROR, error);
    }
  });

  socket.on('disconnect', () => {
    console.log('client is disconnected');
  });
});

const PORT = process.env.PORT ?? PORT_DEFAULT;

httpServer.listen(PORT, () =>
  console.log('Server is running on port - ', PORT)
);
