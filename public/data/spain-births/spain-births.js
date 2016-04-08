var service = '../../api/v1/';

$(document).ready(function(){

    jQuery.support.cors = true;

    $.ajax({
        type: "GET",
        url: service + 'spain-births?apikey=read',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(data) {
        drawTable(data);
        var trHTML = '';
    	}
    });
    function drawTable(data) {
	    for (var i = 0; i < data.length; i++) {
	        drawRow(data[i]);
	    }
	}	

	function drawRow(rowData) {
	    var row = $("<tr bgcolor='#FFFFFF'/>")
	    $("#location").append(row); 
	    row.append($("<td>" + rowData.region + "</td>"));
	    row.append($("<td>" + rowData.year + "</td>"));
	    row.append($("<td>" + rowData.men + "</td>"));
	    row.append($("<td>" + rowData.women + "</td>"));
	    row.append($("<td>" + rowData.totalbirth + "</td>"));
	}

})
