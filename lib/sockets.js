const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  const io = socketIo(server);

  const nsp = io.of('/socket');

  nsp.on('connection', socket => {
    console.log(Object.keys(nsp.sockets));
    console.log(`${socket.id} connected`);
    socket.on('MESSAGE', data => socket.broadcast.emit('MESSAGE', data));
  });

  connection = nsp;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
