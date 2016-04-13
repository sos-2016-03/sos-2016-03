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
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text(JSON.stringify(data));
        console.log(statusCode);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#log").text("");
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
  });