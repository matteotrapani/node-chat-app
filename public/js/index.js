var socket = io();

$(document).ready(function() {
    $("#send").click(function() {
        var text = $("#textMessage").val();
        socket.emit('createMessage', {from: "MatteoClient", text})
    });
    $('#textMessage').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#send').click();//Trigger search button click event
            $("#textMessage").val("");
        }
    });

});

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
    $("#messages").append("<p>" + data.text + "</p>")
});