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
    socket.on('joinRoom', async (userKeysObj) => {
      let chatRoom = userKeysObj.modal
      socket.join(chatRoom);
      const data = await groupController.addToGroup(userKeysObj)
      io.to(chatRoom).emit('joined_Room', data);
    });

    //Delete existing User
    socket.on('removeUser', async (userKeysObj) => {
      let chatRoom = userKeysObj.modal

      const data = groupController.removeUser(userKeysObj)
      io.to(chatRoom).emit('user_left', data);
    });

    // Listen for chatMessage
    socket.on('chatMessage', async ({ content, to, sender, chatName, isChannel }) => {
      if(isChannel){
        const payload = {
          content,
          chatName,
          sender
        };
        socket.to(to).emit("new_message", payload);
      } else {
        const payload = {
          content,
          chatName: sender,
          sender
        }
        socket.to(to).emit("new_message", payload);
      }
      // const chatRoom = getChatRoom(data);
      //   if (chatRoom.length === 2) {
      //
      //     const {message} = data;
      //     if (message && message.trim()) {
      //       //messages are saved here at this phase,
      //       //it takes sendersId and message
      //       //you need to work on your saving message the algorithm is not completed
      //       await chatServices.saveMessage(data);
      //
      //       // set isOnline session when sender sends a message
      //       client[data.senderId] = socket;
      //
      //       const chatRoom = getChatRoom(data);
      //       if (chatRoom) socket.join(chatRoom);
      //
      //       const chatRooms = getChatRooms(data);
      //
      //       io.to(chatRooms[0]).emit('receive_message', data);
      //       io.to(chatRooms[1]).emit('receive_message', data);
      //     }
      //   }

      //   if (getChatRooms.length === 1) {
      //     const { message } = data;
      //     if (message && message.trim()) {
      //       await chatServices.saveMessages(data);
      //
      //       // set isOnline session when sender sends a message
      //       clients[data.senderId] = socket;
      //
      //       const chatRoom = getChatRoom(data);
      //       if (chatRoom) socket.join(chatRoom);
      //
      //       const chatRooms = getChatRooms(data);
      //
      //     io.to(chatRooms[0]).emit('receive_message', data);
      //   }
      // }
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
