function stopOnError(){
	if( $('#colorblind').checked ){
  		$('.error').addClass('warningCbnd');
  	}else{
  		$('.error').addClass('warning');
  	}
};


function letItGo(){
  	$('.error').removeClass('warningCbnd');
  	$('.error').removeClass('warning');
};

function youGotIt(){
  if( $('#colorblind').checked ){
  		$('.error').addClass('wordCompletedCbnd');
  	}else{
  		$('.error').addClass('wordCompleted');
  	}
};

function notEasyBeingGreen(){
  $('.error').removeClass('wordCompleted');
  $('.error').removeClass('wordCompletedCbnd');
};
