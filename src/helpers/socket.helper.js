import skt from 'socket.io';

import groupController from '../controllers/group.controller';
import chatServices from '../services/chat.service';

const socketio = (server) => {
  const io = skt(server, {
    cors: {
      origin: '*',
    },
  });

  const clients = {};
  const client = {};

  const getChatRoom = ({ senderId, receiverId }) => {
    if (senderId && receiverId) return `${senderId}<>${receiverId}`;
    return null;
  };

  const getChatRooms = ({ senderId, receiverId }) => {
    if (senderId && receiverId) {
      return [`${senderId}<>${receiverId}`, `${receiverId}<>${senderId}`];
    }

    if (senderId) {
      return `${senderId}`;
    }
    return [];
  };

  io.on('connection', (socket) => {

    //Add new User
    //modal senderId||userId
    socket.on('addUser', async (userKeysObj) => {
      console.log(userKeysObj)
      await groupController.addToGroup(userKeysObj).then((data) => {
        socket.emit('receive_contact', data);
      });
    });

    // //Delete existing User
    // socket.on('removeUser', async (userKeysObj) => {
    //   await groupController.removeUser(userKeysObj).then((data) => {
    //     socket.emit('remove_contact', data);
    //   });
    // });
    //
    // //Join Room
    // socket.on('joinRoom', (data) => {
    //   // set isOnline session when sender joins a chat room
    //
    //   const chatRoom = getChatRoom(data);
    //   if(getChatRooms.length === 2){
    //     client[data.senderId] = socket;
    //       socket.join(chatRoom);
    //       io.to(chatRoom).emit('joined_Room', { chatRoom });
    //   }
    //
    //   if(chatRoom.length === 1){
    //     clients[data.senderId] = socket;
    //     socket.join(chatRoom);
    //     io.to(chatRoom).emit('joined_Rooms', { chatRoom });
    //   }
    // });
    //
    // // Listen for chatMessage
    // socket.on('chatMessage', async (data) => {
    //   const chatRoom = getChatRoom(data);
    //     if (chatRoom.length === 2) {
    //
    //       const {message} = data;
    //       if (message && message.trim()) {
    //         //messages are saved here at this phase,
    //         //it takes sendersId and message
    //         //you need to work on your saving message the algorithm is not completed
    //         await chatServices.saveMessage(data);
    //
    //         // set isOnline session when sender sends a message
    //         client[data.senderId] = socket;
    //
    //         const chatRoom = getChatRoom(data);
    //         if (chatRoom) socket.join(chatRoom);
    //
    //         const chatRooms = getChatRooms(data);
    //
    //         io.to(chatRooms[0]).emit('receive_message', data);
    //         io.to(chatRooms[1]).emit('receive_message', data);
    //       }
    //     }
    //
    //     if (getChatRooms.length === 1) {
    //       const { message } = data;
    //       if (message && message.trim()) {
    //         await chatServices.saveMessages(data);
    //
    //         // set isOnline session when sender sends a message
    //         clients[data.senderId] = socket;
    //
    //         const chatRoom = getChatRoom(data);
    //         if (chatRoom) socket.join(chatRoom);
    //
    //         const chatRooms = getChatRooms(data);
    //
    //       io.to(chatRooms[0]).emit('receive_message', data);
    //     }
    //   }
    // });

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
