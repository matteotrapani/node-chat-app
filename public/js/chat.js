var socket = io();
  var datePattern = 'h:mm a';
  // var datePattern = 'MMM Do, YYYY h:mm a';

var sendMessage = text => {
    socket.emit('createMessage', {from: "MatteoClient", text}, function(message) {
        console.log('Got it!', message);
    });
}


function scrollToBottom () {
  var messages = $('#messages');
  var newMessage = messages.children('li').last();


  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
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
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
      return;
    }
  });
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
  scrollToBottom();
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
  scrollToBottom();
})

socket.on('updateUserList', function(users) {
  var ol = $('<ol></ol>');
  users.forEach(name => {
    ol.append($('<li></li>').text(name));
  });

  $('#users').html(ol);
})