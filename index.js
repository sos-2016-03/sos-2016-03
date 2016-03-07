var express=require("express");
var fs=require("fs");
var app=express();


app.get("/time",(req,res)=>{
	var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months=[
  		"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		  ];
	var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
	var year=date.getFullYear();
	var month=date.getMonth();
	var weekday=date.getDay();
	var day=date.getDate();
	res.write("<html><head><title>Group 03 - My time</title><body>");
	if(hour<12){
		res.write("<h2>Good morning, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}else if(hour<20){
		res.write("<h2>Good afternoon, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}else{
		res.write("<h2>Good night, today is "+days[weekday]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
	}
	res.write("<a href='/about/'>« Previous</a></body></html>");
	res.end();
});



app.use('/',express.static(__dirname + '/public'));
app.use('/about',express.static(__dirname + '/about'));
app.use('/about/spain-births',express.static(__dirname + '/about/spain-births'));
app.use('/about/population-growth',express.static(__dirname + '/about/spain-births'));
app.use('/about/mort-sickness',express.static(__dirname + '/about/mort-sickness'));


app.listen(process.env.PORT || 11000);

