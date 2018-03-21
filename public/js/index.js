var socket = io();

$(document).ready(function() {
    $("#send").click(function() {
        var text = $("#textMessage").val();
        socket.emit('createMessage', {from: "MatteoClient", text}, function(message) {
            console.log('Got it!', message);
        })
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
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(data) {
    console.log('Got new message', data);
    $("#messages").append("<p>" + data.from + ": " + data.text + "</p>")
});