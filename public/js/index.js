var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');

    // socket.emit('createEmail', {
    //     to: 'to@email.com',
    //     text: 'hey this is Matteo'
    // });
    // socket.emit('createMessage', {
    //     from: 'MatteoClient',
    //     text: 'This is a message from the client'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

// socket.on('newEmail', function(data) {
//     console.log('New email', data);
// });

socket.on('newMessage', function(data) {
    console.log('Got new message', data);
});