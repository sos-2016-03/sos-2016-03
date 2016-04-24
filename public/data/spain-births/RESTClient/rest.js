$(document).ready(function(){
  $('select').material_select();
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
              trHTML += '<tr class="#42a5f5 blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th></tr>';
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

$("#region").change(function(){
    direccion();
});
$("#year").change(function(){
    direccion();
});
$("#offset").change(function(){
    direccion();
});
$("#limit").change(function(){
    direccion();
});
$("#from").change(function(){
    direccion();
});
$("#to").change(function(){
    direccion();
});

function direccion() {
    url=$("#url").val();
    if ($("#region").val() != "" && $("#region").val()!=null){
      url = url + "/" + $("#region").val()
    } 
    if ($("#year").val() != "" && $("#year").val()!=null){
      url = url + "/" + $("#year").val()
    }       
    if ($("#apikey").val() != ""){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "apikey=" + $("#apikey").val()
    }
    if ($("#offset").val() != "" && $("#offset").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "offset=" + $("#offset").val()
    }
    if ($("#limit").val() != "" && $("#limit").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "limit=" + $("#limit").val()
    }
    if ($("#from").val() != "" && $("#from").val()!=null){
      var aux  = (url.indexOf("?")==-1) ? "?" : "&";
      url = url + aux + "from=" + $("#from").val()
    }
    if ($("#to").val() != "" && $("#to").val()!=null){
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
        data: '{"region":"'+$("#region2").val()+'","year":"'+$("#year2").val()+'","men":"'+$("#men").val()+'","women":"'+$("#women").val()+'","totalbirth":"'+$("#totalbirth").val()+'"}',
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
        data: '{"region":"'+$("#region2").val()+'","year":"'+$("#year2").val()+'","men":"'+$("#men").val()+'","women":"'+$("#women").val()+'","totalbirth":"'+$("#totalbirth").val()+'"}',
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
            console.log(JSON.stringify(data)); 
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