const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io.connect();
// const socket = io.connect('https://diatron.herokuapp.com', { timeout: 1000 });
// const socket = io('http://localhost:4000');

const user = {
  id: "b33ef968-c707-47e2-a584-f1fa33a3e2f1",
  fullName: "Samuel Otibo",
  modal: "excerciseMgt",
  message: 'Victor Just Joined'

}

const msg = {
  receiverId: "60c4a20d-6a02-4276-9dd0-61a5d71d72ff",
  senderId: "b33ef968-c707-47e2-a584-f1fa33a3e2f1",
  fullName: "Sam Samson",
  modal: "chat",
  message: 'How are you'
}

const cb = (data) => {
  console.log(data)
};

// Join chatroom

socket.emit('addUser', user);
socket.emit('joinRoom', user, cb);
// socket.emit('chatMessage', msg);
// socket.emit('removeUser', user );
// socket.emit('joinRoom', { "meaa": "sisi", "insis":"dnisnis" });

// Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });
//
// // Message from server
socket.on('new_message', (message) => {
  console.log('Hi')
  console.log(message);
  // outputMessage(message);

  // // Scroll down
  // chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
