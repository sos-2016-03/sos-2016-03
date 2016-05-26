google.charts.load("current", {packages: ["corechart"]});
google.charts.setOnLoadCallback(drawVisualization);

//Voy a comparar el total de mortalidad con la edad media de la población por año

function drawVisualization(){
  $(document).ready(function(){
    var request=$.ajax({
      type:"GET",
      url:"../../../api/v1/mort-sickness?apikey=multiPlan_C4_sos-2016-03-pgs_ag",
      data: "{}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    })
    request.done(function(data, status){
      var request1=$.ajax({
              type: "GET",
              url: "http://gsx2json.com/api?id=1WaM-dfRGgzXCJ_ladBtIuKQn1rtxKS2nMF_33tqBjiE",
              data: "{}",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
            })
      request1.done(function(data1, status){
        var datos = [["Year","Total Mortality", "Middle Ages"]];
        for(i=0;i<data.length;i++){
          graf=data[i];
          for(j=0; j<data1.columns.edadmedia.length; j++){
            graf1=data1.columns.year[j];
            graf2=Number(data1.columns.edadmedia[j]);
            if(graf.year==graf1){ 
              var grafForWidget=[graf.year, Number(graf.totalMortality),Number(graf2)];
              datos.push(grafForWidget);
            }
          }
        }
        var datosRecogidos = google.visualization.arrayToDataTable(datos);
        var options = {
              title : 'Total mortality and Middle Ages',
              vAxis: {title: 'Total mortality and middle ages'},
              hAxis: {title: 'Year'},
              seriesType: 'bars',
              series: {5: {type: 'line'}}
           };
          var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
            chart.draw(datosRecogidos, options);
      })
    })
  })
}