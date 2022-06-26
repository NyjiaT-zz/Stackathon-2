const express = require('express')
;
const app = express();
const server = require('http').Server(app)

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
  try {
    res.render('room')
  }
  catch(err) {
    console.log(err)
  }
})

server.listen(3030);
