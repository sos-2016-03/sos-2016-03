$(document).ready(function(){
    console.log("JQuery Ready!");
    $("#button").click(function(){
      console.log("Handling click");      
      $("#log").text("Sending request...");

      
      var method=$('select').val();

      var request = $.ajax({
        url: $("#url").val(),
        type: method,
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
          var res=0;
          var trHTML = '';
          $.each(data, function(i,item){
            if(data[i].totalbirth){
              res=1;
            }else if(data[i].sickness){
              res=2;
            }else if(data[i].total_population){
              res=3;
            }
          });
            if(res==1){
              trHTML += '<tr bgcolor="#81BEF7"><th>Region</th><th>Year</th><th>Men</th><th>Women</th><th>Total Birth</th></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr bgcolor="#FFFFFF"><td>' + 
                    data[i].region + '</td><td>' + 
                    data[i].year + '</td><td>' + 
                    data[i].men + '</td><td>' + 
                    data[i].women + '</td><td>' +
                    data[i].totalbirth + '</td></tr>';
                });
            }else if(res==2){
              trHTML += '<tr bgcolor="#81BEF7"><th>Region</th><th>Sickness</th><th>Year</th><th>MortalityInMen</th><th>MortalityInWomen</th><th>TotalMortality</th></tr>';
                $.each(data, function(i,item){
                    trHTML += '<tr bgcolor="#FFFFFF"><td>' + 
                    data[i].region + '</td><td>' + 
                    data[i].sickness + '</td><td>' + 
                    data[i].year + '</td><td>' + 
                    data[i].mortalityInMen + '</td><td>' + 
                    data[i].mortalityInWomen + '</td><td>' +
                    data[i].totalMortality + '</td></tr>'; 
                });
            }else if(res==3){
              trHTML += '<tr bgcolor="#81BEF7"><th>Region</th><th>Year</th><th>Age</th><th>Men</th><th>Women</th><th>Total population</th></tr>';
                $.each(data, function(i,item){
                  trHTML += '<tr bgcolor="#FFFFFF"><td>' + 
                  data[i].region + '</td><td>' + 
                  data[i].year + '</td><td>' + 
                  data[i].age + '</td><td>' + 
                  data[i].men + '</td><td>' + 
                  data[i].women + '</td><td>' + 
                  data[i].total_population + '</td></tr>';               
                  });
            }
          $('#data2').append(trHTML);        
        }      
    });
  });