$(document).ready(function(){
  $('select').material_select();
  $("#status2").hide();
  $("#status3").hide();

  jQuery.support.cors = true;

//Refrescar
  function refresh(){
    var request =$.ajax({
      type: "GET",
      url: '../../../api/v1/spain-births?apikey=read&limit=3',
      data: "{}",
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText);
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
              trHTML += '<tr class="#42a5f5 blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th><th class="center-align white-text centered">Actions</th></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td class="center-align">' +
                    data[i].region + '</td><td class="center-align">' +
                    data[i].year + '</td><td class="center-align">' +
                    data[i].men + '</td><td class="center-align">' +
                    data[i].women + '</td><td class="center-align">' +
                    data[i].totalbirth + '</td><td class="center-align">' +
                    '<td><button><i class="material-icons">delete</i></button><input type="button" value="'+data[i].region+'/'+data[i].year+'"></input></td></tr>';
                });
          $('#data').append(trHTML);
        }
    }


refresh();
var url;
direccion();

//GET de la lista completa
    console.log("JQuery Ready!");
    $("#GET").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births?apikey=read&limit=3",
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        console.log("Status: "+statusCode+ " " +statusCodeText);
        console.log(data.length);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText);
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
            refresh();
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
//search (region, year, from, to)
    function search(){
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th><th class="center-align white-text centered">Actions</th></tr>';
            $.each(data, function(i,item){
                trHTML += '<tr><td class="center-align">' +
                data[i].region + '</td><td class="center-align">' +
                data[i].year + '</td><td class="center-align">' +
                data[i].men + '</td><td class="center-align">' +
                data[i].women + '</td><td class="center-align">' +
                data[i].totalbirth + '</td><td class="center-align">' +
                '<td><button><i class="material-icons">delete</i></button><input type="button" value="'+data[i].region+'/'+data[i].year+'"></input></td></tr>';
            });
          $('#data').append(trHTML);
        }
    }

//limit
    function entry(){
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th><th class="center-align white-text centered">Actions</th></tr>';
            $.each(data, function(i,item){
                trHTML += '<tr><td class="center-align">' +
                data[i].region + '</td><td class="center-align">' +
                data[i].year + '</td><td class="center-align">' +
                data[i].men + '</td><td class="center-align">' +
                data[i].women + '</td><td class="center-align">' +
                data[i].totalbirth + '</td><td class="center-align">' +
                '<td><button><i class="material-icons">delete</i></button><input type="button" value="'+data[i].region+'/'+data[i].year+'"></input></td></tr>';
            });
          $('#data').append(trHTML);
        }
    }

//offset
    function pagination(){
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status3").hide();
        $("#status1").hide();
        $("#data").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status3").show();
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status2").hide();
            $("#status1").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#data').empty();
          var trHTML = '';
          trHTML += '<tr class="#42a5f5 blue lighten-1 z-depth-0"><th class="center-align white-text centered">Region</th><th class="center-align white-text centered">Year</th><th class="center-align white-text centered">Men</th><th class="center-align white-text centered">Women</th><th class="center-align white-text centered">Total Birth</th><th class="center-align white-text centered">Actions</th></tr>';
            $.each(data, function(i,item){
                trHTML += '<tr><td class="center-align">' +
                data[i].region + '</td><td class="center-align">' +
                data[i].year + '</td><td class="center-align">' +
                data[i].men + '</td><td class="center-align">' +
                data[i].women + '</td><td class="center-align">' +
                data[i].totalbirth + '</td><td class="center-align">' +
                '<td><button><i class="material-icons">delete</i></button><input type="button" value="'+data[i].region+'/'+data[i].year+'"></input></td></tr>';
            });
          $('#data').append(trHTML);
        }
    }

//Cambio de URL para Search
$("input[name=param]").keyup(function(){
    direccion();
});

$("#region").change(function(){
    direccion();
    search();
});
$("#year").change(function(){
    direccion();
    search();
});
$("#offset").change(function(){
    direccion();
    pagination();
});
$("#limit").change(function(){
    direccion();
    entry();
});
$("#from").change(function(){
    direccion();
    search();
});
$("#to").change(function(){
    direccion();
    search();
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
      url = url + aux + "offset=" + ($("#offset").val()*$("#limit").val());
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

//POST de un elemento
    $("#POST").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births?apikey=write",
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        $("#data2").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
            refresh();
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

//PUT de un elemento (inacabado)
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        $("#data").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
            console.log(JSON.stringify(data));
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

//Borra todo
    $("#DELETEAll").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births?apikey=write",
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        $("#data").text("");
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#data").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
            refresh();
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

//Delete de un elemento (inacabado)
    $("#DELETE").click(function(){
      console.log("Handling click");
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: "../../../api/v1/spain-births/"+$("#region2").val()+"/"+$("#year").val()+"?apikey=write",
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
            refresh();
        }else{
            $("#txtStatus").text(status);
        }
      });
    });

//loadInitialData
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
        $("#status5").text(statusCode +" "+statusCodeText);
        $("#status2").show();
        $("#status1").hide();
        $("#status3").hide();
        console.log("Status: "+statusCode+ " " +statusCodeText);
        refresh();
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status6").text(statusCode +" "+statusCodeText);
            $("#status3").show();
            $("#status1").hide();
            $("#status2").hide();
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
    });
  });
