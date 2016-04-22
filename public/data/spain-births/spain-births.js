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
        var trHTML = '<tbody>';
            $.each(data, function(i,item){
                trHTML += '<tr><td>' + 
                data[i].region + '</td><td>' + 
                data[i].year + '</td><td>' + 
                data[i].men + '</td><td>' + 
                data[i].women + '</td><td>' + 
                data[i].totalbirth + '</td></tr>';
            });
            trHTML += '</tbody>';
            $('#births').append(trHTML);        
    	}
    });

})
