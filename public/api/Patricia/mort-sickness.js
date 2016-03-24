var sickness = [];

//métodos GET 
module.exports.getSickness = function(req,res){
	console.log("NEW GET");
	res.status(200).send(sickness);
}

module.exports.getSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
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
	var buscado = -1;
	var name = req.params.region;
	for(var i=0;i<sickness.length;i++){
		if(name==sickness[i].region){
			buscado = i;
			console.log("New GET of resource region");
			var atributo = sickness[i];
			res.send(atributo);
			break;	
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
	}
}

module.exports.getSicknessYear = function(req,res){
	var buscado = -1;
	var year = req.params.year;
	for(var i=0;i<sickness.length;i++){
		if(year==sickness[i].year){
			buscado = i;
			console.log("New GET of resource region");
			var atributo = sickness[i];
			res.send(atributo);
			break;	
		}
	}
	if(buscado == -1){
		res.sendStatus(404);
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