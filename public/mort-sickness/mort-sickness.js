//Funcionalidades
var service = '../../../api/v1/mort-sickness';
$(document).ready(function(){
    console.log("JQuery Ready!");
    $("#GET").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      
     var method=$('button').val();
     
      var request = $.ajax({
        url: service + "?apikey=" + $('#apikey').val(),
        type: method,
        data: "{}",
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
        $("#sickness").html(imprime(data));
        console.log("Status: "+statusCode+ " " +statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
            $("#status").text(statusCode + " " + statusCodeText);
            $("#sickness").text("");
            $("#log").text("");
            console.log("Status: "+jqXHR.status+ " " +jqXHR.statusText);
        }else{
            $("#txtStatus").text(status);
        }
      });
      function imprime(data){
          $('#sickness').empty();
          var res=0;
          var trHTML = '';
               trHTML += '<tr><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr><td>' + 
                    data[i].region + '</td><td>' + 
                    data[i].sickness + '</td><td>' + 
                    data[i].year + '</td><td>' + 
                    data[i].mortalityInMen + '</td><td>' + 
                    data[i].mortalityInWomen + '</td><td>' +
                    data[i].totalMortality + '</td></tr>'; 

                });
          $('#sickness').append(trHTML); 
        }     
    });
  });
//LoadInitialData
$(document).ready(function(){
$('#miBotonInicial').click(function(){
	$('#log').text("Sending request...");
	var request = $.ajax({
		url: service + '/loadInitialData?apikey=' + $('#apikey').val(),
		type: "GET",
		contentType: "application/json"
	});
	request.done(function(data, status, jqXHR){
		var statusCode = jqXHR.status;
		var statusCodeText = jqXHR.statusText;
		$('#log').text("Data received");
		$('#status').text(statusCode + " " + statusCodeText);
	});
	request.always(function(jqXHR, status){
		var statusCode = jqXHR.status;
		var statusCodeText = jqXHR.statusText;
		if(status == "error"){
			if(statusCode == 401){
				$('#status').text(statusCode + " " + statusCodeText);
			}
			if(statusCode == 403){
				$('#status').text(statusCode + " " + statusCodeText);
			}else{
				$('#status').text(statusCode + " " + statusCodeText);
			}
		}
	})
})
});

//Estilo
$(document).ready(function(){
	$('#miBoton').jqxButton({
		theme: 'shinyblack'
	})
});

$(document).ready(function(){
	$('#miBotonInicial').jqxButton({
		theme:'darkblue'
	})
});
$(document).ready(function(){
	$('#GET').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#apikey').jqxInput();
});




