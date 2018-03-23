const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isValidString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (data, callback) => {
        if (!isValidString(data.name) || !isValidString(data.room))
            callback("Name and room values must not be empty!");

        socket.join(data.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, data.name, data.room);

        io.to(data.room).emit('updateUserList', users.getUserList(data.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(data.room).emit('newMessage', generateMessage('Admin',  `${data.name} has joined`));
        callback();
    });

    socket.on('createMessage', (data, callback) => {
        var user = users.getUser(socket.id);

        if (user && isValidString(data.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));
        }
        callback('This is from the server.');
    })

    socket.on('createLocationMessage', coords => {
        var user = users.getUser(socket.id);

        if (user)
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
      
        if (user) {
          io.to(user.room).emit('updateUserList', users.getUserList(user.room));
          io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})