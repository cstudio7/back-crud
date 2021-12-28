import skt from 'socket.io';

import groupController from '../controllers/group.controller';

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
    socket.on('addUser', async (userKeysObj) => {
      let chatRoom = userKeysObj.modal
      const message = await groupController.addToGroup(userKeysObj)
      io.to(chatRoom).emit('addUser', message);
    });

    // Get Messages
    socket.on('joinRoom', async (userKeysObj, cb) => {
      clients[userKeysObj.id] = socket;
      let chatRoom = userKeysObj.modal;

      socket.join(chatRoom);
      const message = await groupController.getMessage(userKeysObj)
       cb(message)
      io.to(chatRoom).emit('joined_Room', message);
    });

    //Delete existing User
    socket.on('removeUser', async (userKeysObj) => {
      let chatRoom = userKeysObj.modal

      const data = await groupController.removeUser(userKeysObj)
      io.to(chatRoom).emit('user_left', data);
    });

    // Listen for chatMessage
    socket.on('chatMessage', async (data) => {
      if(data.modal === "chat"){
       let message =  await groupController.saveMessage(data)
        socket.to(data.modal).emit("new_message", message);
      } else {
        //Do for private Chat
        let message = await groupController.saveMessage(data)
        io.to(data.modal).emit("new_message", message.dataValues);
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
