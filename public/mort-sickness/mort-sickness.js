var service = '../../../api/v1/mort-sickness';
//Funcionalidades

//GET
function verTodos(){
    console.log("JQuery Ready!");
    $("#GET").click(function(){     
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: service + "?apikey=" + $("#apikey").val() + "&limit=" + $("#limit").val() + "&offset=" + $("#offset").val(),
        type: "GET",
        data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#sickness").html(imprime(data));
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }
        }else{
            $("#status").text(status);
        }
      });
       function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
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
               })
            }
        })    
    }
   
//LoadInitialData
function cargaInicial(){
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
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }
        }else{
            $("#status").text(status);
        }
      });
})
};

//POST
function nuevo(){
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service +  "?apikey=" + $('#apikey').val(),
        type: "POST",
        data: '{"region":"'+$("#region").val()+'","sickness":"'+$("#sick").val()+'","year":"'+$("#year").val()+'","mortalityInMen":"'+$("#mortalityInMen").val()+'","mortalityInWomen":"'+$("#mortalityInWomen").val()+ '","totalMortality":"'+$("#totalMortality").val() + '"}',
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode == 400){
            	$("#status").text(statusCode + " " + "Faltan parámetros");
            }else if(statusCode == 409){
            	$("#status").text(statusCode + " " + "Ya existe el dato");
            }
        }else{
            $("#status").text(status);
        }
      })     
}

//PUT
function actualizar(){ 
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service + "/" + $("#region").val() + "/" + $("#year").val() + "/" + "?apikey=" + $('#apikey').val(),
        type: "PUT",
        data: '{"region":"'+$("#region").val()+'","sickness":"'+$("#sick").val()+'","year":"'+$("#year").val()+'","mortalityInMen":"'+$("#mortalityInMen").val()+'","mortalityInWomen":"'+$("#mortalityInWomen").val()+ '","totalMortality":"'+$("#totalMortality").val() + '"}',
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode == 400){
            	$("#status").text(statusCode + " " + "Faltan parámetros");
            }else if(statusCode == 404){
            	$("#status").text(statusCode + " " + "El dato no existe");
            }
        }else{
            $("#status").text(status);
        }
      })   
}
//DELETE UN DATO
function eliminarDato(){    
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service + "/" + $("#region").val() + "/" + $("#year").val() + "/" + "?apikey=" + $('#apikey').val(),
        type: "DELETE",
		data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){    
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Deleted");
        $("#status").text(statusCode +" "+statusCodeText);
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode == 404){
            	$("#status").text(statusCode + " " + "No existe el dato");
            }
        }else{
            $("#status").text(status);
        }
      });    
}

//Eliminar todo
function eliminarTodo(){
      $("#log").text("Sending request...");
     
      var request = $.ajax({
        url: service + "/" + "?apikey=" + $('#apikey').val(),
        type: "DELETE",
		data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){    
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Deleted");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#sickness").html(imprime(data));
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }
        }else{
            $("#status").text(status);
        }
      })
      function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
             
                 $('#sickness').append(trHTML); 
               })
            }
}

//Busca por región
function buscaPorRegion(){
    console.log("JQuery Ready!");
    $("#buscaRegion1").click(function(){     
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: service + "/" +  $("#region1").val() + "/" +"?apikey=" + $("#apikey").val() + "&limit=" + $("#limit").val() + "&offset=" + $("#offset").val(),
        type: "GET",
        data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#sickness").html(imprime(data));
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode == 404){
            	$("#status").text(statusCode + " " + "No existe el dato");
            }
        }else{
            $("#txtStatus").text(status);
        }
      });
       function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
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
               })
            }
        })    
    }

//Busca por año
function buscaPorAño(){
    console.log("JQuery Ready!");
    $("#buscaAño1").click(function(){     
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: service + "/" +  $("#year1").val() + "/" +"?apikey=" + $("#apikey").val() + "&limit=" + $("#limit").val() + "&offset=" + $("#offset").val(),
        type: "GET",
        data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#sickness").html(imprime(data));
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode==404){
            	$("#status").text(statusCode + " " + "No existe el dato");
            }
        }else{
            $("#txtStatus").text(status);
        }
      });
       function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
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
               })
            }
        })    
    }

//Busca entre años
function buscaEntreAños(){
    console.log("JQuery Ready!");
    $("#entreAños").click(function(){     
      $("#log").text("Sending request...");

      var request = $.ajax({
        url: service + "/" +"?apikey=" + $("#apikey").val() + "&limit=" + $("#limit").val() + "&offset=" + $("#offset").val() + "&from=" + $("#from").val() + "&to=" + $("#to").val(),
        type: "GET",
        data: "{}",
        contentType: "application/json"
      });
      request.done(function(data,status,jqXHR){       
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        $("#log").text("Data received");
        $("#status").text(statusCode +" "+statusCodeText);
        $("#sickness").html(imprime(data));
      });
      request.always(function(jqXHR, status){
        var statusCode = jqXHR.status;
        var statusCodeText = jqXHR.statusText;
        if (status == "error"){
        	if(statusCode == 401){
            	$("#status").text(statusCode + " " + "Insert a correct apikey");
        	}else if(statusCode == 403){
        		$("#status").text(statusCode + " " + "Incorrect apikey");
            }else if(statusCode==404){
            	$("#status").text(statusCode + " " + "No existe el dato");
            }
        }else{
            $("#txtStatus").text(status);
        }
      });
       function imprime(data){
       	$.each(data,function(i,item){
          $('#sickness').empty();
          var trHTML = '';
               trHTML += '<tr bgcolor="orange"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
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
               })
            }
        })    
    }




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

$(document).ready(function(){
	$('#buscaRegion1').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#buscaAño1').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#entreAños').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#DELETE').jqxButton({
		theme:'darkblue'
	})
});

$(document).ready(function(){
	$('#PUT').jqxButton({
		theme:'darkblue'
	})
});
$(document).ready(function(){
	$('#POST').jqxButton({
		theme:'darkblue'
	})
});
$(document).ready(function(){
	$('#DELETEDATO').jqxButton({
		theme:'darkblue'
	})
});