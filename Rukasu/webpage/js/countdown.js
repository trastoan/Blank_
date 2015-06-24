function initialCountdown(element, initialDelay){
    var toChange = $(element);


    setTimeout(function() { changethree(toChange) } , initialDelay);

    function changethree(toChange){
    	toChange.text('READY?');
    	setTimeout(function() { changetwo(toChange) } , 1000);
	}

	function changetwo(toChange){
	    	toChange.text('SET');
	    	setTimeout(function() { changeone(toChange) } , 1000);
	}

	function changeone(toChange){
	    	toChange.text('GO!');
	}
     
     return true;

}

