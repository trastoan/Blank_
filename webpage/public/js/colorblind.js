$(document).on('change' , '#colorblind' , function(){
	
	if( this.checked ){
    	$('#upperRow').css("background",'#fefc61');
    	$('#middleRow1').css("background",'#dfcd06');
    	$('#middleRow1').css("color", '#363a47');
    	$('#middleRow2').css("background",'#8aa9fe');
    	$('#middleRow2').css("color",'#dfcd06');
    	$('#lowerRow').css("background",'#c6d2fe');
    	$('.scoreAmount').css("color",'#003495'); 
    	$('.scoreLabel').css("color",'#003495'); 
    	
    	$('#waiting_for').css("color", '#191919');
    }else{
    	$('#upperRow').css("background",'#feffbf');
    	$('#middleRow1').css("background",'#fcff00');
    	$('#middleRow1').css("color", '#c8c7ff');
    	$('#middleRow2').css("background",'#c8c7ff');
    	$('#middleRow2').css("color",'#fcff00');
    	$('#lowerRow').css("background",'#f1f1ff');
    	$('.scoreAmount').css("color",'#fc63fe');
    	$('.scoreLabel').css("color",'#fc63fe');
    	$('#waiting_for').css("color", '#474747');
    }

});