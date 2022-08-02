const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server)


app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
})

io.on('connect', (socket) => {
    socket.on('chat message', msg => {
        console.log('msg: ', msg)
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
  });

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })


server.listen(3000, () => {
    console.log('listening on *:3000')
})