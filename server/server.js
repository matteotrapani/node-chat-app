const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public')
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: "me@email.com",
    //     text: "new email",
    //     createdAt: 123
    // });

    // socket.on('createEmail', (data) => {
    //     console.log('Create email');
    //     console.log(JSON.stringify(data, undefined, 2));
    // });

    socket.on('createMessage', (data) => {
        data.createdAt = Date.now();
        console.log('Create message', data);
        socket.emit('newMessage', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})