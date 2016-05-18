google.charts.load('current', {'packages':['bar']});

$(document).ready(function(){
    console.log("jQuery ready!");
    jQuery.support.cors = true;

    var request=$.ajax({
        type: "GET",
        url: '../../../api/v1/spain-births?apikey=multiPlan_C4_sos-2016-03-arp_ag',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });
      request.done(function(dataFromServer,status){
        var request=$.ajax({
            type: "GET",
            url: '../../../api/v1/population-growth?apikey=read',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });
        request.done(function(dataFromServer2,status){
          google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
              var dataForWidget=[["Year","Total Birth","Total Population"]];

            //Tranformación
            for(i=0;i<dataFromServer.length;i++){
              item=dataFromServer[i];
              console.log(item);
              for(j=0;j<dataFromServer2.length;j++){
                item2=dataFromServer2[j];
                //console.log(item2);
                if((item.year == item2.year) && item.year>=2013 && item.year<=2014){
                  var itemForWidget=[item.year,item.totalbirth,item2.total_population];
                  console.log(itemForWidget);
                  dataForWidget.push(itemForWidget);
                }
              }
            }
              console.log(dataForWidget);
              var data = google.visualization.arrayToDataTable(dataForWidget);
              console.log("Success!");

              var options = {
                chart: {
                  title: 'Spain data',
                  subtitle: 'Spain births and oil: 2013-2014',
                }
              };


              var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
       	   	  chart.draw(data, options);
            }
    });
});
});
