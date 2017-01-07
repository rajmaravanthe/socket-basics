var name = getQueryVariable('name');
var room = getQueryVariable('room');

var socket = io();

console.log(name + ' wants to join ' + room);
socket.on('connect', function () {
    console.log('Connected to socket.io server');
    socket.emit('joinRoom', {
        room: room,
        name: name
    });
});

socket.on('message', function (message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $message = $('.messages');

    console.log('New message');
    console.log(message.text);
    $('.room-title').html(room);
    $message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
});

var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    socket.emit('message', {
        name: name,
        room: room,
        text: $form.find('input[name=message]').val()
    })

    $form.find('input[name=message]').val("");
});