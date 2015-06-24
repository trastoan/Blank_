// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var http = require('http');
var fs = require('fs');


// Getting JSON
var file = __dirname + '/public/data/palavras.json';
var json = JSON.parse(fs.readFileSync(file, 'utf8'));

function getWords(){
    var wordsArray = [];
    var num = Math.floor((Math.random()*579)+1);
    for (var i = 0; i <= 10; i++) {
      wordsArray.push(json[num+i].conteudo);
    };
    return wordsArray;
  }


var wordsToSend = getWords();

// Routing
app.use(express.static(__dirname + '/public'));


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


// Chatroom

// users which are currently connected to the game
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;
  console.log('User connected');
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    console.log('new message');
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('sortear palavras', function(){
      console.log('new word requested');
      socket.broadcast.emit('new words', wordsToSend);
   });

  socket.on('user got it', function(){
      console.log('user finished');
      socket.broadcast.emit('Stop', socket.username);
   });

  socket.on('user lost', function(){
      console.log('user got an error');
      socket.broadcast.emit('you won', socket.username);
   });

  socket.on('update Score', function(data){
    console.log('score update');
      socket.score = data;
      console.log(socket.score);
      socket.broadcast.emit('change Score',{
        username: socket.username,
        score: socket.score
      })
  });
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    console.log('User added');
    // we store the username in the socket session for this client
    socket.username = username + ' ' + (numUsers+1);
    // add the client's username to the global list
    usernames[username] = username + ' ' + (numUsers+1);
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    console.log('User DC');
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
