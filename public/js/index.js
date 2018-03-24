var socket = io();

socket.on('updateRoomsList', function(rooms) {
    $("#rooms").empty();
    rooms.forEach(room => {
      $("#rooms").append($('<option>', {
          value: room,
          text: room
      }));
    });
  
    // $('#users').html(ol);
  })