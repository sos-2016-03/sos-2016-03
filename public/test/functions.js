$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    $.ajax({
        type: "GET",
        url: 'http://localhost:11000/api/v1/spain-births?apikey=read',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(data) {
          console.log("Success!");
          /*var res=[];
          trHTML=['Region','Year'];
          res.push(trHTML);
          console.log("Estoy casi en el bucle");
          for(i=0;i<2;i++){
              console.log("Entro en bucle!");
              var trHTML=[];
              trHTML.push(data[i].region);
              trHTML.push(data[i].year);
              console.log(trHTML);
              res.push(trHTML);
          }
          console.log("He salido del bucle")
          console.log(res);*/
          var res=[];
          res.join(['Andalucia', '200']);
          console.log(res);



google.charts.load('current', {'packages':['geochart']});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable([
          res
  ]);

  var options = {
    region: 'ES',
    displayMode: 'markers',
    colorAxis: {colors: ['green', 'blue']}
  };


  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}
}
});

})
