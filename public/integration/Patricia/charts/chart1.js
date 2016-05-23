      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawVisualization);


      function drawVisualization() {
        // Some raw data (not necessarily accurate)

        $(document).ready(function () {
        var request = $.ajax({
          url:"/api/v1/mort-sickness?apikey=multiPlan_C4_sos-2016-03-pgs_ag",
          type:"GET"
        })
        var request1 = $.ajax({
          url:"/api/v1/co2?apikey=multiPlan_C4_sos-2016-01-grc_ag",
          type:"GET"
        });

        request1.done(function (data1){

          var dataToMap1=[];

          for (i=0;i<data1.length;i++){
            dataToMap1.push([(data1[i].co2kg)]);
          }

          console.log(dataToMap1);

        request.done(function (data){

          var dataToMap = [["Year","Total Mortality", "CO2 KG"]];

          for (i=0;i<dataToMap1.length;i++){
          	if(data1[i].year==data[i].year){
            dataToMap.push([Number(data[i].year), Number(data[i].totalMortality), Number(data1[i].co2kg)]);
         	}
          }

          console.log(dataToMap);

      var data = google.visualization.arrayToDataTable(dataToMap);

    var options = {
      title : 'Total Mortality and CO2 kg',
      vAxis: {title: 'Total Mortality and CO2 kg'},
      hAxis: {title: 'Year'},
      seriesType: 'bars',
      series: {6: {type: 'line'}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    });
  });
  });
}