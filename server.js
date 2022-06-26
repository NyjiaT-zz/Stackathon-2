const express = require('express')
;
const app = express();
const server = require('http').Server(app)

app.get('/', (req, res, next) => {
  try {
    res.status(200).send('Chatting on port 3030')
  }
  catch(err) {
    console.log(err)
  }
})

server.listen(3030);
