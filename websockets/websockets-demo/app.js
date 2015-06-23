window.onload = function() {


  // class words{
  //   public int id;
  //   public String name;

  //   public word(int a, String b){
  //     id = a;
  //     name = b;
  //   }
  // }

  var request = new XMLHttpRequest();
  request.open("GET", "words.json", false);
  request.send(null)
  var my_words = JSON.parse(request.responseText);



  function getWord(){
    var num = Math.floor((Math.random()*4)+1);
    return my_words[num].word;
  }

  var secretWord = getWord();
  var showWord = "";
  var palavra_index = 0;

  for (var i = 0 ; i < secretWord.length; i++) {
    showWord += "_";
  };
  
  console.log(secretWord)

  //String.prototype.replaceAt=function(index, character) {
  //  return this.substr(0, index) + character + this.substr(index+character.length);
  //}


  $(document).keypress(function(e) {
    if(secretWord.charCodeAt(palavra_index) == e.which){
        console.log('You pressed ' + e.which +'!');
        palavra_index++;
    }else{
      //ERRO
    }
  });  

  function showChar(){
      return secretWord.substr(0, palavra_index) + showWord.substr(0 + palavra_index, showWord.length);
  };

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');


  // Create a new WebSocket.
  var socket = new WebSocket('ws://echo.websocket.org');


  function acharPalavras(i,a){    
    /*for (var i = 0; i <= b.length; i++) {
      if(b[i] == a){
        showWord = showWord.replaceAt(i, b[i]);
        console.log(showWord[i]);
      }
      console.log(showWord);
    };*/

    palavra_index++;
    showWord = showChar(showWord);
    console.log(showWord);

    return showWord;
  };

  // Handle any errors that occur.
  socket.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
  };


  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.URL;
    socketStatus.className = 'open';
  };

  function wordAlreadyUsed(a){
    for (var i = 0; i < wordsUsed.length; i++) {
      if (a == wordsUsed[i]) {
       return true;
     }
   }
   return false;
 };

 function gameOver(){
  for (var i = 0; i <= showWord.length; i++) {
    if (showWord[i] == "_") {
      return false;
    };
  };
  return true;
}
var wordsUsed = [];

  // Handle messages sent by the server.
  socket.onmessage = function(event) {
    var message = event.data;
    if (message.length > 1) {
      alert("Input apenas uma letra");
    }else{
      if(wordAlreadyUsed(message)){
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
        "letra já utilizada"+ '</li>';
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
        showWord + '</li>';
      }else{ 
        messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
        acharPalavras(message, secretWord) + '</li>';
        if(wordsUsed.length == 0){
          wordsUsed[0] = message;
        }else{
          console.log(wordsUsed.length);
          wordsUsed[wordsUsed.length] = message;
        }
      }
      if (gameOver()) {
        alert("Parabéns, você ganhou!")
      };
    }
  };

    // if(message == "a"){
    //   messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
    //   "deu Muito certo" + '</li>';
    // }else{
    //   messagesList.innerHTML += '<li class="received"><span>Received:</span>' +
    //   message + '</li>';
    // }


  // Show a disconnected message when the WebSocket is closed.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Disconnected from WebSocket.';
    socketStatus.className = 'closed';
  };


  // Send a message when the form is submitted.
  form.onsubmit = function(e) {
    e.preventDefault();

    // Retrieve the message from the textarea.
    var message = messageField.value;

    // Send the message through the WebSocket.
    socket.send(message);

    // Add the message to the messages list.
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
    '</li>';

    // Clear out the message field.
    messageField.value = '';

    return false;
  };


  // Close the WebSocket connection when the close button is clicked.
  closeBtn.onclick = function(e) {
    e.preventDefault();

    // Close the WebSocket.
    socket.close();

    return false;
  };

};
