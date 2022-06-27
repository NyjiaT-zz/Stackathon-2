const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
//for unique room id
const {v4: uuidv4} = require('uuid');
//Peer JS
const { ExpressPeerServer } = require('peer');
//running peer server
const peerServer = ExpressPeerServer(server, {
  debug: true
});

//ejs for html and JS
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/peerjs', peerServer);

// main route generates uuid for new user and redirects to that room
app.get('/', (req, res, next) => {
  try {
    res.redirect(`/${uuidv4()}`)
  }
  catch(err) {
    console.log(err)
  }
})

app.get('/:room', (req, res, next) => {
  res.render('room', { roomId: req.params.room })
})

//create socket connection when room isjoined
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    //join specific room
    socket.join(roomId);
    //broadcast that a user has joined to the room
    socket.to(roomId).emit('user-connected', userId).broadcast;
  })
})

server.listen(process.env.PORT || 8080);
