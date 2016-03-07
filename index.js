var express=require("express");
var fs=require("fs");
var app=express();


app.get("/time",(req,res)=>{
	var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	var months=[
  		"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		  ];
	var now = new Date();
	var hour=now.getHours()+1;
	var min=now.getMinutes();
	var sec=now.getSeconds();
	var year=now.getFullYear();
	var month=now.getMonth();
	var day=now.getDate();
	res.write("<html><head><title>Group 03 - My time</title><body>");
	if(hour<12){
		if(sec<10){
			res.write("<h2>Good morning, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<h2>Good morning, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}else if(hour<20){
		if(sec<10){
			res.write("<h2>Good afternoon, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<h2>Good afternoon, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}else{
		if(sec<10){
			res.write("<h2>Good night, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<h2>Good night, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}
	res.write("<a href='/about/'>« Previous</a></body></html>");
	res.end();
});



app.use('/',express.static(__dirname + '/public'));
app.use('/about',express.static(__dirname + '/about'));


app.listen(process.env.PORT || 11000);

