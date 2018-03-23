var socket = io();
  var datePattern = 'h:mm a';
  // var datePattern = 'MMM Do, YYYY h:mm a';

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
      }, function (err) {
        $('#send-location').removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
      });
    });
});

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

socket.on('newMessage', function(data) {
  var formattedTime = moment(data.createdAt).format(datePattern);
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);


  // console.log('newMessage', data);
  // var li = $('<li></li>');
  // li.text(`${data.from}: ${data.text}`);
  // appendTime(data.createdAt, li);

  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(data) {
  var formattedTime = moment(data.createdAt).format(datePattern);
  var template = $('#messageLocation-template').html();
  var html = Mustache.render(template, {
    url: data.url,
    from: data.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');

  // li.text(`${data.from}: `);
  // a.attr('href', data.url);
  // li.append(a);
  // appendTime(data.createdAt, li);

  // $('#messages').append(li);
})

var appendTime = (timestamp, element) => {
  var formattedTime = moment(timestamp).format(datePattern);
  element.append(`<p class="chat__messagesTime">${formattedTime}</p>`)
}