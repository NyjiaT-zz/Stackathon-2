const express = require('express');
//for unique room id
const {v4: uuidv4} = require('uuid');
const app = express();
const server = require('http').Server(app);

app.set('view engine', 'ejs');


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


server.listen(3030);
