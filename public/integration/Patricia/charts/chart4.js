google.charts.setOnLoadCallback(drawVisualization);

//Consumo de una api externa 

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      url:"http://datos.alcobendas.org/dataset/39039ceb-67fe-42f8-bd51-82ed9834945d/resource/efc48843-fc49-49ba-b249-50784e0fbbc6/download/presupuestoconsolidadodegastos.json/"
    })
    request.done(function(data, status){
        var datos = [["Denomination","Total expenses"]];
        for(i=0;i<data.length;i++){
            graf=data[i];
            var grafForWidget=[graf.denominacion, graf.total];
            datos.push(grafForWidget);
          
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
              title: 'Consume external api of total expenses of Alcobendas in 2013',
              pieHole: 0.4,
           };
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(datosRecogidos, options);

    })
  })
}