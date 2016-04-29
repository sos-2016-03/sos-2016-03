var seleccionado = false;
var nuevoDato = true;


function IniciarTabla(data){
  
  var datos = data;          
               
  var table =  $('#tablaid').DataTable( {
    "data": datos,                  
    "columns": [
            { "title": "Region" },
            { "title": "Year" },
            { "title": "Age" },
            { "title": "Men"},
            { "title": "Women"},
            { "title": "Total population"}
    ],
        "bPaginate": false,
        "bFilter": false
  
    } );
  return table;
                                                 
}

function procesarDatos(){
  
  //{"region":"Andalucia","year":"2010","age"="20-24","men"="10","women"="10", "totalpopulation"="20"}
  var dato = [];
  var res = [];
  var request = $.ajax({
    url: '../api/v1/population-growth?apikey=read',
    type: "GET",
    async: false
  });
  request.always(function(data,status,jqXHR) {
      console.log(data);
      for(var i in data){
        console.log(i);
        var obj = data[i];
        console.log(obj);
        for(var prop in obj){
          console.log(prop);
          dato.push(obj[prop]);
        }
        res.push(dato);
        dato = [];
      }
      console.log(res);
  });
  return res; //Devuelve un array(res) de arrays(dato) con los datos que hay en ese momento en la api
}

function seleccionarCelda(data){
  var table = data;
  $('#tablaid tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('selected') ) {
      seleccionado = false;
      $(this).removeClass('selected');
    }else{
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
      seleccionado = true;
    }
    console.log(seleccionado);
  } );  
}

function vaciarCajas(){
  document.getElementById("region2").value = "";
  document.getElementById("year2").value = "";
  document.getElementById("age2").value = "";
  document.getElementById("men2").value = "";
  document.getElementById("women2").value = "";
  document.getElementById("totalpopulation2").value = "";
  document.getElementById("apikey2").value = "";
}

//La utilizo para saber que recurso tengo que borrar de la api
function conseguirDato(){
  var table =  $('#tablaid').DataTable();
  var dato = table.row('.selected').data().toString();
  console.log("Fila sin trocear: "+dato);
  var campos = dato.split(",");
  console.log("Fila troceada: "+campos);
  return campos;
}

//Se ejecuta segundo
function enviarDato(){
  var r= $("#region2").val()
  var y= $("#year2").val()
  var a= $("#age2").val()
  var m= $("#men2").val()
  var w= $("#women2").val()
  var t= $("#totalpopulation2").val()
  var datos='{"region":"'+r+'","year":"'+y+'","age":"'+a+'","men":"'+m+'","women":"'+w+'","total_population":"'+t+'"}';
  //var datos = "{'region':"+r+",'year':"+$("#year2").val()+",'age':"+$("#age2").val()+",'men':"+$("#men2").val()+",'women':"+$("#women2").val()+",'total_population:"+$("totalpopulation2").val()+"}";
    if(nuevoDato){
      console.log(datos);
      console.log(nuevoDato);
      console.log("Metodo POST");
      //Es un nuevo dato (añadir dato) POST
      var metodo = "POST";
      var url = '../api/v1/population-growth?apikey=' + $("#apikey2").val();
      solicitudAjax(metodo, url, datos);
      
    }else{
      console.log("Metodo PUT");
      var metodo = "PUT";
      var url = '../api/v1/population-growth/'+$("#region2").val()+'/'+$("#year2").val()+'?apikey='+$("#apikey2").val();
      solicitudAjax(metodo, url, datos);
    }
    //vaciarCajas();
}



function botonMenu(){
  $("#formulario2").slideUp();
  $("#tabla").slideDown();
  
  //$("#nav li").removeClass("active");
  $("#botonDatos").addClass("active");
  vaciarCajas();  
}

//Se ejecuta primero
function botonAnadirDato(){
  $("#taba").slideDown();
  $("#formulario3").slideToggle();
  $("#formulario2").slideDown();
  
  seleccionado = false;
  $('tr.selected').removeClass('selected');
  $("#tituloFormulario").text("Añadir un nuevo dato:");
  nuevoDato = true;
  console.log("¿Es un nuevo dato?: "+nuevoDato);
  $("#region2").prop('disabled', false);
  $("#nav li").removeClass("active");
  $("#botonAnadirDato").addClass("active");
  vaciarCajas();
}

function botonEditarDato(){
  nuevoDato = false;
  console.log("¿Es un nuevo Dato?: "+nuevoDato);
  if(seleccionado){
    $("#tabla").slideUp();
    $("#formulario2").slideDown();
    $("#tituloFormulario").text("Editar dato:");
    $("#nav li").removeClass("active");
    $("#botonEditarDato").addClass("active");
    var campos = conseguirDato();
    $("#region2").val(campos[0]);
    $("#region2").prop('disabled', true);
    console.log(campos[0]);
    $("#year2").val(campos[1]);
    $("#year2").prop('disabled', true);
    console.log(campos[1]);
    $("#age2").val(campos[2]);
    $("#men2").val(campos[3]);
    $("#women2").val(campos[4]);
    $("#totalpopulation2").val(campos[5]);
    $("#apikey2").val(campos[6]);
  }else{
    alertify.alert("No has seleccionado ningún dato");
  }
}


function botonEliminarDato(){
  if(seleccionado){
      var table =  $('#tablaid').DataTable();
      var campos = conseguirDato();
      var urlstring = '../api/v1/population-growth'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
  request.success(function(status,jqXHR){
  var x;
  if(seleccionado){
    alertify.confirm("¿Esta seguro de Eliminar el dato?", function (e) {
        if (e) {
      var table =  $('#tablaid').DataTable();
      console.log(x);
      var campos = conseguirDato();
      var urlstring = '../api/v1/population-growth'+'/'+campos[0]+'/'+campos[1]+'?apikey=' + $("#apikey").val();
      console.log(urlstring);
      table.row('.selected').remove().draw( false );
      var method = "DELETE";
      var request = $.ajax({
        url: urlstring,
        type: method
      });
      seleccionado = false;
      x = "Se ha aceptado";
      alertify.alert("Dato borrado con exito.");
        }else{
      x = "Se ha cancelado";
        }});
  }else{
    alertify.alert("No has seleccionado ningún dato");
  } 
  console.log(x);
  //console.log("Dato borrado");
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("¡Dato añadido con exito!");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún parámetro para rellenar o el tipo esta mal.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" La entrada ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" NO coincide el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}else{
  alertify.alert("No has seleccionado ningún dato");
}
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
    table.rows().remove().draw(false);
    });
    x = "Se ha aceptado";
    
    console.log("Datos borrado");
    request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("¡Dato añadido con exito!");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún parámetro para rellenar o el tipo esta mal.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" La entrada ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" NO coincide el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  
}

function actualizarTabla(){
  var table =  $('#tablaid').DataTable();
  table.row.add( [
              $("#region2").val(),
              $("#year2").val(),
              $("#age2").val(),
              $("#men2").val(),
              $("#women2").val(),
              $("#totalpopulation2").val()
          ] ).draw();
  table.row('.selected').remove().draw( false );
}

function solicitudAjax(metodo, url, datos){
  var jqery
  var request = $.ajax({
    url: url,
    type: metodo,
    data: datos,
    contentType: "application/json"
  });
  request.done(function(data,status,jqXHR) {
    if(status == "success"){
    console.log(jqXHR);
    console.log(status);
    console.log("jqXHR : "+jqXHR);
    console.log("jqXHR status : "+jqXHR.status);
    console.log("texto codigo :"+jqXHR.statusText);
    console.log("status : "+status);
    alertify.alert("¡Dato añadido con exito!");
    actualizarTabla();
    vaciarCajas();
    if(metodo == "PUT"){
      botonMenu();
      seleccionado = false;
    }
    }
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 0){
      alertify.alert("¡Dato añadido con exito!");
    }
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 404){
      alertify.alert("Dato no encontrado");
    }
    if(jqXHR.status == 400){
      alertify.alert("ERROR: "+jqXHR.status+" Falta algún parámetro para rellenar o el tipo esta mal.");
    }
    if(jqXHR.status == 409){
      alertify.alert("ERROR: "+jqXHR.status+" La entrada ya existe.");
    }
    if(jqXHR.status == 403){
      alertify.alert("ERROR: "+jqXHR.status+" NO coincide el parametro para editar.");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
}

function cargaInicial(){
  var urlstring = '/api/v1/population-growth/loadInitialData?apikey=' + $("#apikey").val();
  var method = "GET";
  var request = $.ajax({
    url: urlstring,
    type: method,
    async: false
  });
  request.always(function(jqXHR,status) {
    if(status == "error"){
    console.log("jqXHR always: "+jqXHR);
    console.log("jqXHR status always: "+jqXHR.status);
    if(jqXHR.status == 401){
      alertify.alert("La clave introducida no es correcta");
    }
    if(jqXHR.status == 500){
      alertify.alert("ERROR: "+jqXHR.status+" Error interno del Servidor");
    }
    console.log("texto codigo always:"+jqXHR.statusText);
    console.log("status: "+status);
    }
  });
  request.success(function(status,jqXHR) {
    console.log("Datos cargados");
    alertify.alert("Datos cargados con éxito. Pulsa aceptar para recargar la página.", function () {
      location.reload();
  });
  });
  
}

function paginacion() {
    var x = document.getElementById("limit").value;
    var urlstring = '/api/v1/population-growth?apikey=' + $("#apikey").val() + '&limit='+x+'&offset='+'0';
    var method = "GET";
    var request = $.ajax({
    url: urlstring,
    type: method
  });
    request.success(function(status,jqXHR){
    alertify.alert("Datos cargados con éxito. Pulsa aceptar para recargar la página.", function () {
    
    });
  });
}