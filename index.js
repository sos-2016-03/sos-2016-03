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

var teams=[];

//API Alberto
//Métodos GET
//Devuelve un recurso individual
app.get("/api/sandbox/f1teams/:name",(req,res)=>{
    var name = req.params.name;
    var team = [];
    console.log("New GET of resource "+name);
    for(i=0;i<teams.length;i++){
      	if(teams[i].name == name){
        	team.push(teams[i]);
        	break;
      	}
    }
    if(team.length!=0){
        res.write("<html>");
        res.write("<head><title>Group 03 - Alberto's API</title>");
        res.write("<link rel='stylesheet' type='text/css' href='../../../stylesheets/api.css' /></head><body>");
        res.write("<h3>Your query:</h3>");
        res.write("<table border='1' rules='all' cellpadding='5'>");
        res.write("<tr bgcolor='#81BEF7'><td>Team</td><td>Location</td><td>Chassis</td><td>Engine</td></tr>");
  		  team.forEach((aux)=>{
          res.write("<tr bgcolor='#FFFFFF'><td>"+aux.name+"</td><td>"+aux.location+"</td><td>"+aux.chassis+"</td><td>"+aux.engine+"</td></tr>");
  		  });
  		  res.write("</table></body></html>");
    }else{
    	 res.sendStatus(404);
    }
    res.end();
});

//Devuelve la lista de recursos
app.get("/api/sandbox/f1teams",(req,res)=>{
  res.write("<html>");
  res.write("<head><title>Group 03 - Alberto's API</title>");
  res.write("<link rel='stylesheet' type='text/css' href='../../stylesheets/api.css' /></head><body>"); 
  res.write("<h3>2016 FIA Formula One World Championship Teams</h3>"); 
  res.write("<table border='1' rules='all' cellpadding='5'>");
  res.write("<tr bgcolor='#81BEF7'><td>Team</td><td>Location</td><td>Chassis</td><td>Engine</td></tr>");
	teams.forEach((team)=>{
		  res.write("<tr bgcolor='#FFFFFF'><td>"+team.name+"</td><td>"+team.location+"</td><td>"+team.chassis+"</td><td>"+team.engine+"</td></tr>");
	});
	res.write("</table><br />");
  res.write("<a href='/api-test/f1teams/loadInitialData'>Load Initial Data</a></body></html>");
	res.end();
});


//Recurso con método que crea 2 equipos en la lista
app.get("/api-test/f1teams/loadInitialData",(req,res)=>{
  teams=[];
  fs.readFile('f1teams.json','utf8',(err,content) => {
    f1teams=JSON.parse(content);
    f1teams.forEach((team) =>{
      teams.push(team);
    });
  });
  res.sendStatus(200);
});

//Métodos POST
//Método que añade un nuevo equipo
app.post("/api/sandbox/f1teams",(req,res)=>{
  var team=req.body;
	teams.push(team);
	console.log("New POST of resourse "+team.name);
	res.sendStatus(200);
});

//Método inválido
app.post("/api/sandbox/f1teams/:name",(req,res)=>{
	res.sendStatus(405);
});

//Métodos DELETE
//Borra toda la lista
app.delete("/api/sandbox/f1teams",(req,res)=>{
	console.log("New DELETE of resources");
	teams=[];
	res.sendStatus(200);
});

//Borra un recurso individual
app.delete("/api/sandbox/f1teams/:name",(req,res)=>{
	var name=req.params.name;
	var cont=0;
    for(i=0;i<teams.length;i++){
      	if(teams[i].name == name){
        	teams.splice(i);
        	cont=1;
        }
    }
    if(cont==1){
    	 res.sendStatus(200);
    }else{
    	 res.sendStatus(404);
    }
});

//Métodos PUT
//Método inválido
app.put("/api/sandbox/f1teams/",(req,res)=>{
	res.sendStatus(405);
});

//Actualiza un elemento de array o en su caso devuelve 404
app.put("/api/sandbox/f1teams/:name",(req,res)=>{
    var name = req.params.name;
    var nameUpdated = req.body;
    var cont = 0;
    for(i=0;i<teams.length;i++){
      	if(teams[i].name == name){
        	teams[i]=nameUpdated;
        	cont=1;
        	break;
      	}
    }
	if(cont==1){
		res.sendStatus(200);
	}else{
		res.sendStatus(404);
	}
});

//----------------------------------------------------------------------------//
var musics=[];

//post collection patri
app.post("/api/sandbox/music",(req,res)=>{
	var music = req.body;
	musics.push(music);
	console.log("New POST " + music.name);
	res.sendStatus(200);
});

//post name patri
app.post("/api/sandbox/music/:name", (req,res)=>{
	console.log("Method not allowed");
	res.sendStatus(405);
});

//get collection patri
app.get("/api/sandbox/music",(req,res)=>{
	console.log("NEW GET");
	var music = req.body;
	res.send(musics);
});

//get name patri
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
		res.sendStatus(404);
	}
});

//delete collection patri
app.delete("/api/sandbox/music",(req,res)=>{
	for(var i=0; i<musics.length; i++){
		musics.splice(i);
		res.send(200);
	}
	console.log("Delete songs list");
});

//delete name patri
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

//put collection patri
app.put("/api/sandbox/music", (req,res)=>{
	console.log("Method not allowed");
	res.sendStatus(405);
});

//put name patri
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

//get load patri
app.get("/api-test/music/loadInitialData", (req,res)=>{
	musics=[{"name ": "Frio", "author ": "Maria Parrado"},
	{"name ": "Te dejo en libertad", "author ": "Ha-Ash"}]
	res.send(musics);
	console.log("This songs are my initial data");
});


app.use('/',express.static(__dirname + '/public'));

app.listen(port, ()=>{
	console.log("Magic happens on port: " + port);
});

