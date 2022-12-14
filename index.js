
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   setTimeout(function() {
    // socket.send('Sent a message 4seconds after connection!');
    socket.emit('testerEvent', { descriptionA: 'A custom event named testerEvent!'});

 }, 4000);

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket) {
   console.log('someone connected');
   setTimeout(function() {
    // nsp.send('Hello everyone!');
    nsp.emit('hi', { descriptionB: 'B custom event named testerEvent!'});
   }, 4000)
});


http.listen(3000, function() {
   console.log('listening on *:3000');
});