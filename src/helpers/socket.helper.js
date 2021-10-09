import skt from 'socket.io';

// const io = require('socket.io')(8010, {
//   cors: {
//     origin: '*',
//   },
// });

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const botName = 'Diatron App';

const socketio = (server) => {
  const io = skt(server, {
    cors: {
      origin: '*',
    },
  });


  io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to Diatron Chat App!'));

      // Broadcast when a user connects
      socket.broadcast
          .to(user.room)
          .emit(
              'message',
              formatMessage(botName, `${user.username} has joined the chat`)
          );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
        );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });

  })
    return io;
};

export { socketio };
