$(document).ready(function(){
    var url;
    direccion();
    console.log("JQuery Ready!");
    $("#GET").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      var method=$("input[type=button]").val();
      var request = $.ajax({
        url: url,
        type: "GET",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));        
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text(JSON.stringify(data));
        $("#data2").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#data2").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data2').empty();
          var trHTML = '';
              trHTML += '<tr class="card-panel teal #64b5f6 blue lighten-2 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' + 
                    data[i].region + '</td><td class="center-align">' + 
                    data[i].year + '</td><td class="center-align">' + 
                    data[i].men + '</td><td class="center-align">' + 
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">';
                });
          $('#data2').append(trHTML);        
        }      
    });


  $("input[name=param]").keyup(function(){
    direccion();
  });


function direccion() {
  url=$("#url").val();
    if ($("#apikey").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "apikey=" + $("#apikey").val()
    }
    if ($("#offset").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "offset=" + $("#offset").val()
    }
    if ($("#limit").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "limit=" + $("#limit").val()
    }
    if ($("#from").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "from=" + $("#from").val()
    }
    if ($("#to").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "to=" + $("#to").val()
    }
    $("#url").text(url);
    $('#req').text(url);
  }

    $("#POST").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: url,
        type: "POST",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));        
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text("");
        $("#data2").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#data2").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

    $("#PUT").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: url,
        type: "PUT",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));        
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text("");
        $("#data2").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#data2").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

    $("#DELETE").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: url,
        type: "DELETE",
        data: $("#payload").val(),
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));        
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text("");
        $("#data2").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#data2").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
    $("#LOAD").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births/loadInitialData?apikey=write",
        type: "GET",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){
        console.log("Handling request (OK)");
        console.log("Data received: ");
        console.log(JSON.stringify(data));        
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#data").text("");
        $("#data2").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText); 
            $("#data").text("");
            $("#data2").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
  });