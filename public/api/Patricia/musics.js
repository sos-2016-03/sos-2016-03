
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
	//var music = req.body;
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
		res.sendStatus(200);
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
		break;
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
			break;
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
});

//get load patri
app.get("/api-test/music/loadInitialData", (req,res)=>{
	initial_musics=[{"name": "Frio", "author": "Maria Parrado"},
	{"name": "Te dejo en libertad", "author": "Ha-Ash"}];
	musics=initial_musics;
	res.sendStatus(200);
});