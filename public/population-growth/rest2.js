


var table;


$(document).ready(function() {
    table = $("#tablaid").DataTable({
        "ajax": {
            "url": "../api/v1/population-growth?apikey=multiPlan_C4_sos-2016-03-asu_ag",
            "dataSrc": ""
        },
        "columns": [
            { "data": "region" },
            { "data": "year" },
            { "data": "age" },
            { "data": "men" },
            { "data": "women" },
            { "data": "total_population" }


        ],
        "defaultContent": "Click to edit",
        "bPaginate": false,
        "bFilter": false, 
        "bSort" : false
    });


});

function cargaInicial(){
  var apikey = document.getElementById("apikey").value;
  var urlstring = '/api/v1/population-growth/loadInitialData?apikey=' + apikey
  var method = "GET";
  var request = $.ajax({
    url: urlstring,
    type: method
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR) {
    
    console.log("Datos cargados");
    alertify.alert("Data loaded", function () {
      location.reload();
  });
  });
  
}

function botonEliminarTodo(){
 
  var x;
  
    var urlstring = '/api/v1/population-growth?apikey=' + $("#apikey").val();
    console.log($("#apikey").val());
    var method = "DELETE";
    var request = $.ajax({
      url: urlstring,
      type: method
    });
    request.success(function(status,jqXHR) {
    var table =  $('#tablaid').DataTable();
    table.rows().remove().draw(/*false*/);
    });    
    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is incorrect");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  
}


function busqueda(){

    var busqueda_region = document.getElementById("busqueda_region").value;
    var busqueda_from = document.getElementById("busqueda_from").value;
    var busqueda_to = document.getElementById("busqueda_to").value;
    if(busqueda_from=='' && busqueda_to==''){
        urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val();
    }else if(busqueda_from=='' && busqueda_to!=''){
       urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&to=" + busqueda_to;
    }else if(busqueda_from!='' && busqueda_to==''){
       urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from;
    }else if(busqueda_from!='' && busqueda_to!='' && busqueda_region!=''){
      urlaux='/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to;
    }else if(busqueda_from!='' && busqueda_to!='' && busqueda_region==''){
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to;
    }else if(busqueda_from=='' && busqueda_to!='' && busqueda_region==''){
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() +  "&to=" + busqueda_to;
    }else{
      urlaux='/api/v1/population-growth/?apikey=' + $("#apikey").val() + "&from=" + busqueda_from ;
    }
    $.ajax(
    {
        type: "GET",
        //url: '/api/v1/population-growth/'+busqueda_region+'?apikey=' + $("#apikey").val() + "&from=" + busqueda_from + "&to=" + busqueda_to,
        url: urlaux,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
          $("#tablaid tbody tr").remove();
          var trHTML = '';
          $.each(data, function (i, item) {
          console.log(data[i]);
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
        });

        $('#tablaid').append(trHTML);  



        },
        
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
}

function eliminardato(){
  var region = document.getElementById("reg").value;
  var year = document.getElementById("yea").value;

  if(region!='' && year!=''){
      var table =  $('#tablaid').DataTable();
      
      var urlstring = '../api/v1/population-growth'+'/'+region+'/'+year+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;
 
    alertify.confirm("Are you sure?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      
      var urlstring = '../api/v1/population-growth'+'/'+region+'/'+year+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Se ha aceptado";
      alertify.alert("Deleted", function(){
        location.reload();
      });
        }else{
      x = "Cancelled";
        }});
 
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");
    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is incorrect");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("Data no selected");
}

}

function editardato(){
    var region = document.getElementById("reg2").value;
    var year = document.getElementById("yea2").value;
    nuevoDato = false;
    console.log("¿Es un nuevo Dato?: "+nuevoDato);
    
   
    
  
 
  var metodo = "GET";
  var url = '../api/v1/population-growth/'+region+'/'+year+'?apikey='+$("#apikey").val();
    var request = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("Data added successfully!");

    }
    if(jqXHR.status == 401){
      alertify.alert("Incorrect key");
    }
    if(jqXHR.status == 404){
      alertify.alert("Not found");
    }
    
    if(jqXHR.status == 400){
      alertify.alert("ERROR: Missing parameter or the type is Incorrect");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: The entry exists");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+"Server error");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR,data){
    
    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    //$("#nav li").removeClass("active");
    //$("#botonEditarDato").addClass("active");
    $("#region2").val(region);
    $("#region2").prop('disabled', true);
    $("#year2").val(year);
    $("#year2").prop('disabled', true);
    
  });
  var r= $("#region2").val()
  var y= $("#year2").val()
  var a= $("#age2").val()
  var m= $("#men2").val()
  var w= $("#women2").val()
  var t= $("#totalpopulation2").val()
  var datos='{"region":"'+r+'","year":"'+y+'","age":"'+a+'","men":"'+m+'","women":"'+w+'","total_population":"'+t+'"}';
  var metodo = "PUT";
  var url = '../api/v1/population-growth/'+region+'/'+year+'?apikey='+$("#apikey").val();
    var request2 = $.ajax({
    url: url,
    type: metodo,
    data: '{}',
    contentType: "application/json"
  });

}


function paginacion() {
     var x = document.getElementById("limit").value;
     var busqueda= document.getElementById("busqueda").value;

    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-growth'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+'0',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();
          
          var trHTML = '';

      
        

      $.each(data, function (i, item) {
        console.log(data[i]);
        
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
      });

      $('#tablaid').append(trHTML);  



        },
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found. Not more data.");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
}

function paginacion2() {
var x = document.getElementById("limit").value;
var x2 = document.getElementById("pag").value;
//si x2=0 -> x3=0 (x2*x)
//si x2=1 -> x3=x1 (pag*limit -1)
//si x2=2 -> x3=
var x3= (x*x2);
var busqueda= document.getElementById("busqueda").value;
    $.ajax(
    {
        type: "GET",
        url: '/api/v1/population-growth/'+busqueda+'?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+x3,
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,

        success: function (data) {
          $("#tabla tbody tr").remove();
          
          var trHTML = '';

      
        

      $.each(data, function (i, item) {
        console.log(data[i]);
        
          trHTML += "<tr class='info'><td>" + data[i].region + '</td><td>' + data[i].year + '</td><td>' + data[i].age + '</td><td>' + data[i].men + '</td><td>' + data[i].women + '</td><td>' + data[i].total_population + '</td></tr>';
      });

      $('#tablaid').append(trHTML);  



        },
        
        
        error: function(jqXHR,status){
          console
          if(jqXHR.status == 401){
              alertify.alert("Incorrect key");
          }
          if(jqXHR.status == 404){
              alertify.alert("Not found. Not more data");
          }
          if(jqXHR.status == 500){
            alertify.alert("ERROR: "+jqXHR.status+"Server error");
           }
            console.log("texto codigo always:"+jqXHR.statusText);
            console.log("status: "+status);
           
        }
    });
    


}