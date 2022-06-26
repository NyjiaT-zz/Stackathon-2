const express = require('express');
//for unique room id
const {v4: uuidv4} = require('uuid');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
//ejs for htm and JS
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

//create socket connection
io.on('connection', socket => {
  socket.on('join-room', () => {
    console.log('Joined!')
  })
})

server.listen(3030);
