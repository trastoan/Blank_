$(function(){
		var socket = io();
		var myUserNum;
		var secretWord = "Abelardo";
		var palavra_index = 0;
		var showWord = "";

		// Other things from here

		

		for (var i = 0 ; i < secretWord.length; i++) {
		    showWord += "_";
		};	


		$('#middleRow1 #centerwrap').text(secretWord);
		$('#middleRow2 #centerwrap').text(showWord);
		  
		function updateScore(points, scoreElement){
			var score = parseInt($('#'+scoreElement).find('#score').text(), 10);
			score += points;

			sendScore(score);

			var content = score + '';
			var fix = '';


			for(var i=0; i<5 - content.length; i++){
				fix += '0';
			}


			$('#'+scoreElement).find('#score').text(fix + content);
		}

		function sendScore(points){
			//send score to server
		}

		
		
		$(document).keypress(function(e) {
			if($('.error').hasClass('warning')){

			}else{
				console.log(e.which);
				console.log(secretWord.charCodeAt(palavra_index));
			    if(secretWord.charCodeAt(palavra_index) == e.which || 
			    	( (e.which >= 65 && e.which << 90 && e.which == secretWord.charCodeAt(palavra_index) - 32) || (e.which >= 97 && e.which << 122 && e.which == secretWord.charCodeAt(palavra_index) + 32 ) ) 
			    	){
			        palavra_index++;
			        updateScore(10, 'myScore');
			  
			        $('#middleRow2 #centerwrap').text(secretWord.substr(0, palavra_index) + showWord.substr(0 + palavra_index, showWord.length));

			        if(palavra_index == secretWord.length){
			        	youGotIt();
			        }
			    }else{
			      stopOnError();
			    }
			}
 	  	});



		function addUser(){
			socket.emit('add user', 'Player');
		}
		function updateScore(){
			socket.emit('update Score', 30);
		}

		// updateScore()
		addUser();

		socket.on('login', function (data) {
				console.log('login');
			    connected = true;
			    if (data.numUsers == 1) {
			    	$(upperRow).append('<span id="waiting_for">Waiting for challenger</span>');	
			    }else{
			    	$(upperRow).append('<span id="waiting_for">Let the games begin!</span>');
			    	// socket.emit('sortear palavras');	
			    }
		});

		socket.on('change Score', function(data){
			if(data.username != ('Player ' + myUserNum)) {
				console.log(data.score);
				$('#opponentScore #score').text(data.score);
			};
		});

		  // Whenever the server emits 'user joined', log it in the chat body
		socket.on('user joined', function (data) {
			console.log('user joined');
		    $(waiting_for).text('Let the games begin!');
		    // socket.emit('sortear palavras');
		});

		socket.on('user left', function (data) {
			console.log('user left');
		    $(waiting_for).text(data.username + " left the game, you won");
		});
		
	});