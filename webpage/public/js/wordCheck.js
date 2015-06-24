function stopOnError(){
  $('.error').addClass('warning');
};


function letItGo(){
  $('.error').removeClass("warning");
};

function youGotIt(){
  $('.error').addClass('wordCompleted');
};

function notEasyBeingGreen(){
  $('.error').removeClass('wordCompleted');
};
