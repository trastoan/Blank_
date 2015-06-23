var palavra = "carro";
var index = 0;

$(document).keypress(function(e) {
    if(palavra.charCodeAt(index) == e.which){
      	console.log('You pressed ' + e.which +'!');
       	index++;
    }else{
    	//ERRO
    }
});
