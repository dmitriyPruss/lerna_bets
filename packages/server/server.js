const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const { PORT_DEFAULT, CORS_ORIGIN_DEFAULT } = require('./constants');
const { newBetHandler } = require('./socketHandlers');

// require('./models');

const httpServer = http.createServer(app);
const ioSets = { cors: { origin: CORS_ORIGIN_DEFAULT } };
const io = new Server(httpServer, ioSets);

app.set('io', io);

io.on('connection', socket => newBetHandler(socket, app));

const PORT = process.env.PORT ?? PORT_DEFAULT;

httpServer.listen(PORT, () =>
  console.log('Server is running on port - ', PORT)
);
