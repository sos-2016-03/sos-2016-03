$(document).ready(function(){
    console.log("JQuery Ready!");
    $("#button").click(function(){
      
      $("#log").text("Sending request...");

      var method=$("input[type=radio]:checked").attr("id");

      var request = $.ajax({
        url: $("#url").val(),
        type: method,
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        var statusCode = jqXHR.status;
        if(status=="error"){
          $("#status").text(statusCode);
          $("#data").text("");
          $("#log").text("Error");
          console.log(statusCode);
        }else{
          $("#log").text("Data received");
          $("#status").text(statusCode);
          $("#data").text(JSON.stringify(data));
          console.log(statusCode);
        }
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        if(status=="error"){
          $("#status").text(statusCode);
          $("#data").text("");
          $("#log").text("Error");
          console.log(statusCode);
        }else{
          $("status").text(statusCode);
          $("#log").text("");
          console.log(statusCode);
        }
      });
    });
  });