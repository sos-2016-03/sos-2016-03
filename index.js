var express=require("express");
var fs=require("fs");
var app=express();

var bodyParser=require("body-parser");

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

var musics=[];

app.post("/api/sandbox/music",(req,res)=>{
	var music = req.body;
	musics.push(music);
	console.log("New POST " + music.name);
	res.sendStatus(200);
});

app.post("/api/sandbox/music/:name", (req,res)=>{
	console.log("Method not allowed");
	res.sendStatus(405);
});

app.get("/api/sandbox/music",(req,res)=>{
	console.log("NEW GET");
	var music = req.body;
	res.send(musics);
});

app.get("/api/sandbox/music/:name", (req,res)=>{
	var buscado = -1;
	var name = req.params.name;
	for(var i=0;i<musics.length;i++){
		if(name==musics[i].name){
			buscado = i;
			console.log("New GET of resource name");
			var atributo = musics[i];
			res.send(atributo);
			break;	
		}
	}
	if(buscado == -1){
		console.log("GET Not Found");
		res.sendStatus(404);
	}
});

app.delete("/api/sandbox/music",(req,res)=>{
	for(var i=0; i<musics.length; i++){
		musics.splice(i);
		res.send(200);
	}
	console.log("Delete songs list");
});

app.delete("/api/sandbox/music/:name",(req,res)=>{
	var buscado = -1;
	var name = req.params.name;
	for(var i=0; i<musics.length; i++){
		if(name==musics[i].name){
		buscado = i;
		console.log("Delete this song");
		musics.splice(i);
		res.sendStatus(200);
		}	
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
});

app.put("/api/sandbox/music", (req,res)=>{
	console.log("Method not allowed");
	res.sendStatus(405);
});

app.put("/api/sandbox/music/:name", (req,res)=>{
	var buscado = -1;
	var name = req.params.name;
	var nueva = req.body;
	for(var i=0; i<musics.length; i++){
		if(name==musics[i].name){
			buscado=i;
			musics[i]=nueva;
			console.log("Modified");
			res.sendStatus(200);
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
});

app.get("/api-test/music/loadInitialData", (req,res)=>{
	musics=[{"name ": "Frio", "author ": "Maria Parrado"},
	{"name ": "Te dejo en libertad", "author ": "Ha-Ash"}]
	res.send(musics);
	console.log("This songs are my initial data");
});

app.use('/',express.static(__dirname + '/public'));

app.listen(process.env.PORT || 11000);

