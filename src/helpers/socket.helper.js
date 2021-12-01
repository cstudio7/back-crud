import skt from 'socket.io';

import groupController from '../controllers/group.controller';
import chatServices from '../services/chat.service';

const clients = {};

const socketio = (server) => {
  const io = skt(server, {
    cors: {
      origin: '*',
    },
  });


  const client = {};

  const getChatRoom = ({ senderId, receiverId }) => {
    if (senderId && receiverId) return `${senderId}<>${receiverId}`;
    return null;
  };

  io.on('connection', (socket) => {

    //Add new User
    socket.on('joinRoom', async (userKeysObj, cb) => {
      clients[userKeysObj.id] = socket;
      let chatRoom = userKeysObj.modal
      socket.join(chatRoom);
      const response = await groupController.addToGroup(userKeysObj)
      const message = await groupController.getMessage(userKeysObj)
       cb(message)
      io.to(chatRoom).emit('joined_Room', response);
    });


    //Delete existing User
    socket.on('removeUser', async (userKeysObj) => {
      let chatRoom = userKeysObj.modal

      const data = groupController.removeUser(userKeysObj)
      io.to(chatRoom).emit('user_left', data);
    });

    // Listen for chatMessage
    socket.on('chatMessage', async (data) => {
      console.log(data)
      if(data.modal){
       const resp = await groupController.saveMessage(data)
        socket.to(to).emit("new_message", resp);
      } else {
        //Do for Private Chat
        const payload = {
          // content,
          // to,
          // chatName: sender,
          // sender
        }
        socket.to(to).emit("new_message", payload);
      }
    });

    // Runs when client disconnects

    // socket.on('disconnect', async () => {
    //   socket.broadcast.emit('user-disconnected', 'user has left the chat');
    // });

  })
    return io;
};

export { socketio, clients };
