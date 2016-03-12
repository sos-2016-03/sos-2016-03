var express=require("express");
var fs=require("fs");
var app=express();

var bodyParser=require("body-parser");

var port = (process.env.PORT || 11000);



app.get("/time",(req,res)=>{
	var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var months=[
  		"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		  ];
	var date = new Date();
    var hour = date.getHours()+1;
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

app.use(bodyParser.json());

app.post("/music",function(req,res){
	res.sendStatus(200);
	console.log("New POST");
	console.log("Object received: " + JSON.stringify(req.body));
	music.push(req.body);
});


/*****API de Ana*****/
//--------------------------------------------------------------------------------------------
var tennisplayers = [];
/*-------GET-------*/
app.get("/api/sandbox/tennisplayers", (req,res)=>{
	res.send(tennisplayers);
	console.log("New GET of resource " + "tennisplayers");
});

app.get("/api/sandbox/tennisplayers/:name", (req,res)=>{
	var encontrado = -1;
	var name = req.params.name;
	for(var i = 0; i< tennisplayers.length; i++){
		if(name == tennisplayers[i].name){
			encontrado = i;
			console.log("New GET of resource " + tennisplayers[i].name);
			var t = tennisplayers[i];
			res.send(t);
			break;
		}
	}
	if (encontrado == -1){
		res.send(404);
	}
});

//-------POST-------
app.post("/api/sandbox/tennisplayers", (req,res)=>{
	var tennisplayer = req.body;
	tennisplayers.push(tennisplayer);
	console.log("New POST of resource " + tennisplayer.name);
	res.sendStatus(200);
});

app.post("/api/sandbox/tennisplayers/:name", (req,res)=>{
	console.log("Operation POST not permitted in this case");
	res.sendStatus(405);
});

/*-------PUT-------*/
app.put("/api/sandbox/tennisplayers", (req,res)=>{
	console.log("Operation PUT not permitted in this case");
	res.sendStatus(405);
});

app.put("/api/sandbox/tennisplayers/:name", (req,res)=>{
	var encontrado = -1;
	var tennisplayer = req.body;
	//var n = tennisplayer.name;
	var n2 = req.params.name;
	for (var i = 0; i < tennisplayers.length; i++) {
		if(n2 == tennisplayers[i].name){
			encontrado = i;
			tennisplayers[i] = tennisplayer;
			console.log("New PUT of resource " + n2);
			res.sendStatus(200);
			break;
		}
	}
	if (encontrado == -1){
		console.log("Operation PUT not permitted because the object is not found");
		res.sendStatus(404);
	}
});

/*-------DELETE-------*/
app.delete("/api/sandbox/tennisplayers", (req,res)=>{
	if(tennisplayers.length != 0){
		tennisplayers.splice(0, tennisplayers.length);
	}
	console.log("New DELETE of resource " + "tennisplayers");
	res.sendStatus(200);
});

app.delete("/api/sandbox/tennisplayers/:name", (req,res)=>{
	var encontrado = -1;
	var n = req.params.name;
	for (var i = 0; i < tennisplayers.length; i++) {
		if(n == tennisplayers[i].name){
			encontrado = i;
			tennisplayers.splice(i,1);
			console.log("New DELETE of resource " + n);
			res.sendStatus(200);
			break;
		}
	}
	if (encontrado == -1){
		res.sendStatus(404);
	}
});


app.get("/api-test/tennisplayers/loadInitialData", (req,res)=>{
	initial_array = [{name:"Nadal", age:"29", grandslam: "14"},{name:"Djokovic", age:"28", grandslam: "11"},
	{name:"Federer", age:"34", grandslam: "17"}];
	tennisplayers = initial_array;
	res.send(200);
});

//--------------------------------------------------------------------------------------------

app.use('/',express.static(__dirname + '/public'));


app.listen(port, ()=>{
	console.log("Magic happens on port: " + port);
});

