var socket = io();

var sendMessage = text => {
    socket.emit('createMessage', {from: "MatteoClient", text}, function(message) {
        console.log('Got it!', message);
    });
}

$(document).ready(function() {
    $('#message-form').on('submit', function (e) {
      e.preventDefault();
    
      var messageTextbox = $('[name=message]');
    
      socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
      }, function () {
        messageTextbox.val('')
      });
    });
    
    $('#send-location').on('click', function () {
      if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
      }
    
      $('#send-location').attr('disabled', 'disabled').text('Sending location...');
    
      navigator.geolocation.getCurrentPosition(function (position) {
        $('#send-location').removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
      });
    });

    // $('#textMessage').keypress(function(e){
    //     if(e.which == 13){//Enter key pressed
    //         $('#send').click();//Trigger search button click event
    //         $("#textMessage").val("");
    //     }
    // });

    
    // $("#sendLocation").click(function() {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             socket.emit('createLocationMessage', {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude
    //             });
    //         }, err => {
    //             alert('Unable to fetch current position');
    //             console.log("Error in getting current position", err);
    //         });
    //     } else {
    //         return alert('Geolocation not supported by your browser');
    //     }
          
    // });
});

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(data) {
    console.log('newMessage', data);
    var li = $('<li></li>');
    li.text(`${data.from}: ${data.text}`);
  
    $('#messages').append(li);
    // console.log('Got new message', data);
    // $("#messages").append("<p>" + data.from + ": " + data.text + "</p>")
});

socket.on('newLocationMessage', function(data) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
  
    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);
    $('#messages').append(li);
    // $("#messages").append("<p>" + data.from + `: <a target="_blank" href='${data.url}'>Current location</a></p>`)
})