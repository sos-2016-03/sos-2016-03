google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

//Consumo de una api externa 

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      url:"http://datos.santander.es/api/rest/collections.json"
    })
    request.done(function(data, status){
        var datos = [["Identifier","Size"]];
        for(i=0;i<data.collections.identifier.length;i++){
            graf=data.collections.identifier.length[i];
            graf1 = data.collections.size.length[i];
            var grafForWidget=[graf, graf1];
            datos.push(grafForWidget);
          
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
              title: 'Consume external api of complete list of directory resources',
              pieHole: 0.4,
           };
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(datosRecogidos, options);

    })
  })
}