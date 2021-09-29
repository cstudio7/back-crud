import skt from 'socket.io';
// import contactController from '../controllers/contact.controller';
// import chatServices from '../services/chat.service';

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

const socketio = (server) => {
  const io = skt(server);

  io.on('connection', (socket) => {
    socket.on('connect_user', async (userKeysObj) => {
      await contactController.addContact(userKeysObj).then((data) => {
        socket.emit('receive_contact', data);
      });
    });

    socket.on('join_chat_room', async (data) => {
      // set isOnline session when sender joins a chat room
      clients[data.senderId] = socket;

      const chatRoom = getChatRoom(data);
      if (chatRoom) {
        socket.join(chatRoom);
        io.to(chatRoom).emit('joined_chat_room', { chatRoom });
      }
    });

    socket.on('send_message', async (data) => {
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
      }
    });

    socket.on('disconnect', async () => {
      socket.broadcast.emit('user-disconnected', 'user has left the chat');
    });
  });

  return io;
};

export { socketio, clients };
