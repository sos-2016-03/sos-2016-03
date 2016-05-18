$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    var request=$.ajax({
        type: "GET",
        url: 'http://worldcup.sfg.io/matches/',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){
        console.log("yeah");
        $("#games_div").text(JSON.stringify(dataFromServer));

      });
});
