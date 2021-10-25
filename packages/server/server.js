const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { PORT_DEFAULT } = require('./constants');

// require('./models');

const httpServer = http.createServer(app);
const ioSets = { cors: { origin: 'http://localhost:3000' } };
const io = new Server(httpServer, ioSets);

const SOCKET_EVENTS = { NEW_BET: 'NEW_BET', NEW_BET_ERROR: 'NEW_BET_ERROR' };

app.locals.io = io;

io.on('connection', socket => {
  console.log(`${socket} is connected`);

  socket.on(SOCKET_EVENTS.NEW_BET, async value => {
    console.log(`SOCKET SERVER value`, value);
    try {
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
