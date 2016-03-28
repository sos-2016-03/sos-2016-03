var sickness = [];

//métodos GET 
module.exports.getSickness = function(req,res){
	var limit = req.query.limit;
	console.log("NEW GET");
	res.status(200).send(sickness);
}

module.exports.getSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
	var fr = req.query.from;
	var to = req.query.to;
	for(var i=0; i<sickness.length; i++){
		if(region == sickness[i].region && year == sickness[i].year){
			buscado=i;
			console.log("New GET of resource region with year");
			var atributo = sickness[i];
			res.status(200).send(atributo);
			break;
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}

module.exports.getSicknessRegion = function(req,res){
	var aux = [];
	var buscado = -1;
	var name = req.params.region;
	var fr = req.query.from;
	var to = req.query.to;
	var limit = req.query.limit;

	if(name=='loadInitialData'){
	buscado=1;
    initial_array=[{"region": "Andalucia","sickness": "Sifilis", "year": "2009", "mortalityInMen": "0,06", "mortalityInWomen": "0", "totalMortality": "0,02"},
	{"region": "Galicia","sickness": "Clamidia", "year": "2012", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "0"},
	{"region": "Pais Vasco","sickness": "VIH", "year": "2013", "mortalityInMen": "2,39", "mortalityInWomen": "0,32", "totalMortality": "1,35"},
	{"region": "Madrid","sickness": "Gonorrea", "year": "2010", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "0"},
	{"region": "Cataluña","sickness": "Herpes Simple", "year": "2011", "mortalityInMen": "0,04", "mortalityInWomen": "0,02", "totalMortality": "0,04"}];
	sickness=initial_array;
	console.log("Load Initial Data");
	res.sendStatus(200);
	}
	if(fr==undefined && to==undefined){
		for(var i=0;i<sickness.length;i++){
			if(name==sickness[i].region){
				if(limit){
				buscado = i;
				console.log("New GET of resource region with limit: " + limit);
				var atributo = sickness[i];
				aux.push(atributo);	
				aux.splice(limit,aux.length);
				}else{
					buscado = i;
					console.log("New GET of resource region");
					var atributo = sickness[i];
					aux.push(atributo);
				}
			}
		}

		for(var i=0;i<sickness.length;i++){
			if(name==sickness[i].year){
				if(limit){
				buscado = i;
				console.log("New GET of resource year with limit: " + limit);
				var atributo = sickness[i];
				aux.push(atributo);	
				aux.splice(limit,aux.length);
				}else{
					buscado = i;
				console.log("New GET of resource year");
				var atributo = sickness[i];
				aux.push(atributo);	
				}
			}
		}

		if(aux.length!=0){
			res.send(aux);
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
	}

	if(fr!=undefined && to!=undefined){
		for(var j=fr; j<=to; j++){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year==j && sickness[i].region == name){
					if(limit){
					buscado=i;
					console.log("New region between year found with limit: " + limit);
					aux.push(sickness[i]);
					aux.splice(limit,aux.length);
					}else{
						buscado=i;
						console.log("New region between year found");
						aux.push(sickness[i]);
					}
				}
			}
		}
		if(aux.length!=0){
			res.send(aux);
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
	}

	if(fr!=undefined && to==undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].region == name){
					if(limit){
					buscado=i;
					console.log("New region from year found with limit: " + limit);
					aux.push(sickness[i]);
					aux.splice(limit,aux.length);
					}else{
						buscado=i;
						console.log("New region from year found");
						aux.push(sickness[i]);
					}
				}
			}
		if(aux.length!=0){
			res.send(aux);
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
	}

	if(fr==undefined && to!=undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to && sickness[i].region == name){
					if(limit){
					buscado=i;
					console.log("New region to year found");
					aux.push(sickness[i]);
					aux.splice(limit,aux.length);
					}else{
						buscado=i;
						console.log("New region to year found");
						aux.push(sickness[i]);
					}
			}
		}
		if(aux.length!=0){
			res.send(aux);
		}
		if(buscado == -1){
			res.sendStatus(404);
		}
	}

}

//métodos POST

module.exports.postSickness = function(req,res){
	var sick = req.body;
	var region = req.body.region;
	var year = req.body.year;
	var sic = req.body.sickness;
	var mortMen = req.body.mortalityInMen;
	var mortWomen = req.body.mortalityInWomen;
	var totalMort = req.body.totalMortality;

	if(Object.keys(sick).length==6 && region!=undefined && year!=undefined && sic!=undefined && mortMen!=undefined && mortWomen!=undefined 
		&& totalMort!=undefined){
		if(sickness.length==0){
			sickness.push(sick);
			console.log("NEW POST " + sick.region);
			res.sendStatus(201);
		}else{
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].region == sick.region && sickness[i].year == sick.year){
					console.log("Conflict");
					res.sendStatus(409);//Error porque ya existe
					break;
				}else{
				}
				if(sickness[i].region == sick.region){
					sickness.push(sick);
					console.log("NEW POST " + sick.region);
					res.sendStatus(201);//Lo crea con la misma región pero no el mismo año
					break;
				}else{
				}
				if(sickness[i].region != sick.region){
					sickness.push(sick);
					console.log("NEW POST " + sick.region);
					res.sendStatus(201);//Lo crea con distinta región
					break;
				}
			}
		}
	}else{
		console.log("Bad Request");
		res.sendStatus(400);
	}	
}

module.exports.postSicknessRegion = function(req,res){

	console.log("Method Not Allowed");
	res.sendStatus(405);
}
module.exports.postSicknessRegionYear = function(req,res){
	console.log("Method Not Allowed");
	res.sendStatus(405);
}
//métodos PUT
module.exports.putSickness = function(req,res){
	console.log("Method Not Allowed");
	res.sendStatus(405);
}

module.exports.putSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.body.region;
	var year = req.body.year;
	var sic = req.body.sickness;
	var mortMen = req.body.mortalityInMen;
	var mortWomen = req.body.mortalityInWomen;
	var totalMort = req.body.totalMortality;
	var nueva = req.body;
	var regN = req.params.region;
	var yearN = req.params.year;
	if(Object.keys(nueva).length==6 && region!=undefined && year!=undefined && sic!=undefined && mortMen!=undefined && mortWomen!=undefined 
		&& totalMort!=undefined){
		for(var i=0; i<sickness.length; i++){
			if(regN==sickness[i].region && yearN==sickness[i].year){
				buscado=i;
				sickness[i]=nueva;
				console.log("Modified");
				res.sendStatus(200);
				break;
			}else{
				console.log("Conflict");
				res.sendStatus(409);
				break;
			}
		}


		if(buscado == -1){
			res.sendStatus(404);
		}
	}else{
		console.log("Bad Request");
			res.sendStatus(400);
	}
}


//métodos DELETE

module.exports.deleteSickness = function(req,res){
	for(var i=0; i<sickness.length; i++){
		sickness.splice(i);
		res.sendStatus(200);
	}
	console.log("Delete mort-sickness list");
}

module.exports.deleteSicknessRegion = function(req,res){
	var buscado = -1;
	var name= req.params.region;
	for(var i=0; i<sickness.length; i++){
		if(name==sickness[i].region){
			buscado = 1;
			console.log("Delete this region");
			sickness.splice(i,1);
		}
	}

	for(var i=0; i<sickness.length; i++){
		if(name==sickness[i].year){
			buscado = 1;
			console.log("Delete this year");
			sickness.splice(i,1);
		}
	}
	if(buscado == 1){
		res.sendStatus(200);
	}else{
		res.sendStatus(404);
	}
}

module.exports.deleteSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
	for(var i=0; i<sickness.length;i++){
		if(region == sickness[i].region && year == sickness[i].year){
			buscado=i;
			console.log("Delete this mort-sickness of region and year");
			sickness.splice(i,1);
			res.sendStatus(200);
			break;
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}