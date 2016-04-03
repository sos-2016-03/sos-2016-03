var sickness = [];

var keyR = "patriR";
var keyW = "patriW";
//métodos GET 
module.exports.getSickness = function(req,res){
	var buscado = -1;
	var aux= [];
	var aux1=[];
	var fr = req.query.from;
	var to = req.query.to;
	var limit = req.query.limit;
	var offset = req.query.offset;
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyR){
		if(fr == undefined && to == undefined){
			for(var i=0; i<sickness.length;i++){
				if(limit<=0){
					res.send(aux);
					break;
				}else if(offset>=sickness.length){
					console.log("Not found with this offset");
					buscado=-1;
				}else if(!limit && !offset){
					buscado = i;
					console.log("NEW GET");
					res.send(sickness);
					break;
				}else if(limit && !offset){
					buscado = i;
					console.log("NEW GET with limit");
					aux.push(sickness[i]);
					aux.splice(limit,aux.length);
				}else if(!limit && offset){
					buscado=i;
					console.log("NEW GET with offset");
					aux=sickness.slice(offset,sickness.length);
				}else if(limit && offset){
					buscado = i;
					console.log("NEW GET with limit and offset");
					aux.push(sickness[i]);
					aux=sickness.slice(offset, sickness.length);
					aux.splice(limit, aux.length);
					break;
				}
			}
		}else if(fr != undefined && to == undefined){
			for(var i = 0; i<sickness.length; i++){
				if(sickness[i].year>=fr){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with from");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET with from and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET with from and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET with from, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux1.length);
						}
					}
				}
			}
		}else if(fr == undefined && to != undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with to");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado=i;
						console.log("New GET with to and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado =i;
						console.log("New GET with to and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado =i;
						console.log("New GET with to, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux1.length);
						}
					}
				}
			}
		}else if(fr != undefined && to != undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].year<=to){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=sickness.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado=i;
						console.log("New GET with from and to");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET with from, to and limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado =i;
						console.log("New GET with from, to and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado=i;
						console.log("New GET with from, to, limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
						aux=aux1.slice(offset, aux1.length);
						aux.splice(limit, aux.length);
					}
				}
			}
		}
	}

		if(aux.length!=0 || sickness.length==0){
			res.send(aux);
		}
		if(buscado==-1){
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(401);
	}
}

module.exports.getSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
	var fr = req.query.from;
	var to = req.query.to;
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyR){
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
	}else{
		res.sendStatus(401);
	}
}

module.exports.getSicknessRegion = function(req,res){
	var aux = [];
	var aux1 = [];
	var aux2 = [];
	var buscado = -1;
	var name = req.params.region;
	var fr = req.query.from;
	var to = req.query.to;
	var limit = req.query.limit;
	var offset = req.query.offset;
	var apiKey = req. query.apikey;
	if(name=='loadInitialData'){
		if(apiKey && apiKey==keyW){
		buscado=1;
	    initial_array=[{"region": "Andalucia","sickness": "Sifilis", "year": "2009", "mortalityInMen": "0,06", "mortalityInWomen": "0", "totalMortality": "0,02"},
		{"region": "Galicia","sickness": "Clamidia", "year": "2012", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "0"},
		{"region": "Pais Vasco","sickness": "VIH", "year": "2013", "mortalityInMen": "2,39", "mortalityInWomen": "0,32", "totalMortality": "1,35"},
		{"region": "Madrid","sickness": "Gonorrea", "year": "2010", "mortalityInMen": "0", "mortalityInWomen": "0", "totalMortality": "0"},
		{"region": "Cataluña","sickness": "Herpes Simple", "year": "2011", "mortalityInMen": "0,04", "mortalityInWomen": "0,02", "totalMortality": "0,04"}];
		sickness=initial_array;
		console.log("Load Initial Data");
		res.sendStatus(200);
		}else{
			res.sendStatus(401);
		}
	}
	if(apiKey && apiKey==keyR){
		if(fr==undefined && to==undefined){
			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].region){
					aux2.push(sickness[i]);
				}
			}
			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].region){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=aux2.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado = i;
						console.log("New GET of resource region");
						aux.push(sickness[i]);
					}else if(limit && !offset){
						buscado=i;
						console.log("New GET of resource region with limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET of resource region with offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET of resource region with limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux.length);
						}
					}
				}
			}

			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].year){
					aux2.push(sickness[i]);
				}
			}

			for(var i=0;i<sickness.length;i++){
				if(name==sickness[i].year){
					if(limit<=0){
						res.send(aux);
						break;
					}else if(offset>=aux2.length){
						console.log("Not found with this offset");
						buscado=-1;
					}else if(!limit && !offset){
						buscado = i;
						console.log("New GET of resource year");
						aux.push(sickness[i]);	
					}else if(limit && !offset){
						buscado = i;
						console.log("New GET of resource year with limit");
						aux.push(sickness[i]);
						aux.splice(limit, aux.length);	
					}else if(!limit && offset){
						buscado = i;
						console.log("New GET of resource year with offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
						}
					}else if(limit && offset){
						buscado = i;
						console.log("New GET of resource year with limit and offset");
						aux1.push(sickness[i]);
						if(aux1.length!=0){
							aux=aux1.slice(offset, aux1.length);
							aux.splice(limit, aux.length);
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

		if(fr!=undefined && to!=undefined){
			for(var j=fr; j<=to; j++){
				for(var i=0;i<sickness.length;i++){
					if(sickness[i].year==j && name==sickness[i].region){
						aux2.push(sickness[i]);
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year==j && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from, to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0;i<sickness.length;i++){
					if(sickness[i].year==j && name==sickness[i].year){
						aux2.push(sickness[i]);
					}
				}
			}
			for(var j=fr; j<=to; j++){
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year==j && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from, to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
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
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year>=fr && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with from and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with from and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with from, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
					}
				}

			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year>=fr && sickness[i].year == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year>=fr && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource year with from");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource year with from and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource year with from and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource year with from, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
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

		if(fr==undefined && to!=undefined){
			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to && sickness[i].region == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year<=to && sickness[i].region == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource region with to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource region with to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource region with to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource region with to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
							}
						}
				}
			}

			for(var i=0; i<sickness.length; i++){
				if(sickness[i].year<=to && sickness[i].year == name){
					aux2.push(sickness[i]);
				}
			}
				for(var i=0; i<sickness.length; i++){
					if(sickness[i].year<=to && sickness[i].year == name){
						if(limit<=0){
							res.send(aux);
							break;
						}else if(offset>=aux2.length){
							console.log("Not found with this offset");
							buscado=-1;
						}else if(!limit && !offset){
							buscado = i;
							console.log("New GET of resource year with to");
							aux.push(sickness[i]);	
						}else if(limit && !offset){
							buscado = i;
							console.log("New GET of resource year with to and limit");
							aux.push(sickness[i]);
							aux.splice(limit, aux.length);	
						}else if(!limit && offset){
							buscado = i;
							console.log("New GET of resource year with to and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
							}
						}else if(limit && offset){
							buscado = i;
							console.log("New GET of resource year with to, limit and offset");
							aux1.push(sickness[i]);
							if(aux1.length!=0){
								aux=aux1.slice(offset, aux1.length);
								aux.splice(limit, aux.length);
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
	}else{
		res.sendStatus(401);
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
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
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
	}else{
		res.sendStatus(401);
	}	
}

module.exports.postSicknessRegion = function(req,res){
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
		console.log("Method Not Allowed");
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
}
module.exports.postSicknessRegionYear = function(req,res){
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
		console.log("Method Not Allowed");
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
}
//métodos PUT
module.exports.putSickness = function(req,res){
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
		console.log("Method Not Allowed");
		res.sendStatus(405);
	}else{
		res.sendStatus(401);
	}
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
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
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
					console.log("Bad Request");
					res.sendStatus(400);
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
	}else{
		res.sendStatus(401);
	}
}


//métodos DELETE

module.exports.deleteSickness = function(req,res){
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
		for(var i=0; i<sickness.length; i++){
			sickness.splice(0,sickness.length);
			res.sendStatus(200);
		}
		console.log("Delete mort-sickness list");
	}else{
		res.sendStatus(401);
	}
}

module.exports.deleteSicknessRegion = function(req,res){
	var sick = sickness.length;
	var buscado = -1;
	var name= req.params.region;
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
		for(var j=0; j<sick; j++){
			for(var i=0; i<sickness.length; i++){
				if(name==sickness[i].region){
					buscado = 1;
					console.log("Delete this region");
					sickness.splice(i,1);
				}
			}
		}
		for(var j=0; j<sick; j++){
			for(var i=0; i<sickness.length; i++){
				if(name==sickness[i].year){
					buscado = 1;
					console.log("Delete this year");
					sickness.splice(i,1);
				}
			}
		}
		if(buscado == 1){
			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}
	}else{
		res.sendStatus(401);
	}
	
}

module.exports.deleteSicknessRegionYear = function(req,res){
	var buscado = -1;
	var region = req.params.region;
	var year = req.params.year;
	var apiKey = req.query.apikey;
	if(apiKey && apiKey==keyW){
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
	}else{
		res.sendStatus(401);
	}
}