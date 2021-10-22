import skt from 'socket.io';

import groupController from '../controllers/group.controller';
import chatServices from '../services/chat.service';

const botName = 'Diatron App';



const socketio = (server) => {
  const io = skt(server, {
    cors: {
      origin: '*',
    },
  });

  const clients = {};
  const getChatRoom = ({ senderId, receiverId }) => {
    if (senderId && receiverId) return `${senderId}<>${receiverId}`;
    return null;
  };

  const getChatRooms = ({ senderId, receiverId }) => {
    if (senderId && receiverId) {
      return [`${senderId}<>${receiverId}`, `${receiverId}<>${senderId}`];
    }
    return [];
  };

  io.on('connection', (socket) => {

    socket.on('newUser', async (userKeysObj) => {
      await groupController.addGroup(userKeysObj).then((data) => {
        socket.emit('receive_contact', data);
      });
    });

    //Join Room
    socket.on('joinRoom', ({username, room}) => {
      clients[data.senderId] = socket;
      socket.join(user.room);
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
    socket.on('chatMessage', async (data) => {
      const { message } = data;
      if (message && message.trim()) {
        await chatServices.saveMessage(data);

        // set isOnline session when sender sends a message
        clients[data.senderId] = socket;

        const chatRoom = getChatRoom(data);
        if (chatRoom) socket.join(chatRoom);

        const chatRooms = getChatRooms(data);
        if (chatRooms.length === 2) {
          io.to(chatRooms[0]).emit('receive_message', data);
          io.to(chatRooms[1]).emit('receive_message', data);
        }

        if (chatRooms.length === 1) {
          io.to(chatRooms[0]).emit('receive_message', data);
        }
      }
    });

    socket.on('disconnect', async () => {
      socket.broadcast.emit('user-disconnected', 'user has left the chat');
    });

    // Runs when client disconnects
    // socket.on('disconnect', () => {
    //   const user = userLeave(socket.id);
    //
    //   if (user) {
    //     io.to(user.room).emit(
    //         'message',
    //         formatMessage(botName, `${user.username} has left the chat`)
    //     );
    //
    //     // Send users and room info
    //     io.to(user.room).emit('roomUsers', {
    //       room: user.room,
    //       users: getRoomUsers(user.room)
    //     });
    //   }
    // });

    socket.on('disconnect', async () => {
      socket.broadcast.emit('user-disconnected', 'user has left the chat');
    });

  })
    return io;
};

export { socketio };
