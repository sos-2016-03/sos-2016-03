
var population_growth = [];
/*-------GET-------*/
module.exports.getAllStatistics = function(req,res){
	res.send(population_growth);
	console.log("New GET of resource " + "population-growth");
};

module.exports.getStatisticsId = function(req,res){
	var aux = [];
	var encontrado = -1;
	var id = req.params.id;
	var f = req.query.from;
  	var t = req.query.to;
  	console.log(id + "-" + f + "-" + t)

  	//--------------------------------------------------
	if(id=='loadInitialData'){
		encontrado = 1;
		initial_array = [
		{region:"Andalucia", year: "2009", age:"20-24", men: "273183", women: "259946", total_population: "533129"},
		{region:"Marid", year: "2010", age:"20-24", men: "176043", women: "174849", total_population: "350892"},
		{region:"Cataluña", year: "2011", age:"45-49", men: "271109", women: "270808", total_population: "541917"},
		{region:"Galicia", year: "2012", age:"65-69", men: "72977", women: "82399", total_population: "155376"},
		{region:"Pais Vasco", year: "2013", age:"00-04", men: "53971", women: "51188", total_population: "105159"},
		{region:"Andalucia", year: "2012", age:"20-24", men: "252799", women: "241437", total_population: "494236"},
		{region:"Andalucia", year: "2005", age:"20-24", men: "296769", women: "282956", total_population: "533129"}];
		population_growth = initial_array;
		//console.log(population_growth);
		res.sendStatus(200);
	}
	//------------------------------------------------
	
	if(f!=undefined && t!=undefined){
  	var aux2 = [];
  	var r = [];
  	for(var i = 0; i<population_growth.length; i++){
  		if(population_growth[i].region==id){
  			aux2.push(population_growth[i]);
  		}
  	}

  	for(var j = f; j<= t ; j++){
  		for(var i = 0; i<aux2.length; i++){
  			if(aux2[i].year==j){
  				r.push(aux2[i]);
  			}
  		}
  	}
  	if(r==[]){
  		res.sendStatus(404);
  	}
  	res.send(r);
    }
  	//------------------------------------------------------------------------------
  	if(f!=undefined && t==undefined){
  	
  	var aux3 = [];
  	var r = [];
  	for(var i = 0; i<population_growth.length; i++){
  		if(population_growth[i].region==id){
  			aux3.push(population_growth[i]);
  		}
  	}
  	
  	var fp = parseInt(f, 10);
  	for(var j= 0; j<aux3.length; j++){
  		var x = parseInt(aux3[j].year, 10);
  		
  		if(x>=fp){
  			r.push(aux3[j]);
  		}
  	}
  	if(r==[]){
  		res.sendStatus(404);
  	}
  	r.sort(compare);
  	res.send(r);
    }

    //------------------------------------------------------------------------------
    if(f==undefined && t!=undefined){
  	
  	var aux3 = [];
  	var r = [];
  	for(var i = 0; i<population_growth.length; i++){
  		if(population_growth[i].region==id){
  			aux3.push(population_growth[i]);
  		}
  	}
  	
  	var tp = parseInt(t, 10);
  	for(var j= 0; j<aux3.length; j++){
  		var x = parseInt(aux3[j].year, 10);
 
  		if(x<=tp){
  			r.push(aux3[j]);
  		}
  	}
  	if(r==[]){
  		res.sendStatus(404);
  	}
  	r.sort(compare);
  	res.send(r);
    }

  	//------------------------------------------------------------------------------

  	if(f==undefined && t==undefined){

	for(var i = 0; i< population_growth.length; i++){
		if(id == population_growth[i].region){
			encontrado = i;
			console.log("New GET of resource " + population_growth[i].region);
			var t = population_growth[i];
			//res.send(t);
			aux.push(t);
		}
		if(id == population_growth[i].year){
			encontrado = i;
			console.log("New GET of resource " + population_growth[i].year);
			var t = population_growth[i];
			//res.send(t);
			aux.push(t);
		}
	}
	if(aux.length!=0){
		res.send(aux);
	}
	if (encontrado == -1){
		res.sendStatus(404);
	}

	}
};

module.exports.getStatisticsRegionAndYear = function(req,res){
	var aux = [];
	var encontrado = -1;
	var region = req.params.region;
	var year = req.params.year;
	console.log(region + "," + year);

	for(var i = 0; i< population_growth.length; i++){
		if(region == population_growth[i].region){
			//encontrado = i;
			//console.log("New GET of resource " + population_growth[i].region);
			var t = population_growth[i];
			if(t.year == year){
				encontrado = i;
				console.log("New GET of resource " + t.region + "/" + t.year);
				aux.push(t);
			}
			//res.send(t);
			//break;
		}
	}
	if(aux.length!=0){
		res.send(aux);
	}
	if (encontrado == -1){
		res.sendStatus(404);
	}

};

//-------POST-------
module.exports.postSatitistics = function(req,res){
	var p = req.body;
	var cmp = 1;

	var x = p.region;
	var x2 = p.year;
	var x3 = p.age;
	var x4 = p.men;
	var x5 = p.women;
	var x6 = p.total_population;

	if(x==undefined || x2==undefined || x3==undefined || x4==undefined || x5==undefined || x6==undefined){
		res.sendStatus(400);
	}else{

	for(var i =0; i<population_growth.length; i++){
		if(population_growth[i].region==p.region && population_growth[i].year==p.year){
			cmp = 0
			break;
		}
	}
	if(cmp == 1){
		population_growth.push(p);
		console.log("New POST of resource " + "population growth");
		res.sendStatus(201);
	}else{
		res.sendStatus(409); //Intento crear un objeto que ya existe
	}
	}
};

module.exports.postStatisticsNotPermitted = function(req,res){
	console.log("Operation POST not permitted in this case");
	res.sendStatus(405);
};

/*-------PUT-------*/
module.exports.putStatisticsNotPermitted = function(req,res){
	console.log("Operation PUT not permitted in this case");
	res.sendStatus(405);
};

module.exports.putStatistics = function(req,res){
	var encontrado = -1;
	var region = req.params.region;
	var year = req.params.year;
	var p = req.body;
	console.log(region + "," + year);

	if(year!=p.year && region!=p.region){
		res.sendStatus(409);
	}

	for(var i = 0; i< population_growth.length; i++){
		if(region == population_growth[i].region){
			//encontrado = i;
			//console.log("New GET of resource " + population_growth[i].region);
			var t = population_growth[i];
			if(t.year == year){
				encontrado = i;
				console.log("New PUT of resource " + t.region + "/" + t.year);
				population_growth[i] = p;
				res.sendStatus(200);
			}
			//res.send(t);
			//break;
		}
	}
	if (encontrado == -1){
		console.log("Operation PUT not permitted because the object is not found");
		res.sendStatus(404);
	}
};

/*-------DELETE-------*/
module.exports.deleteAllStatistics = function (req,res){
	if(population_growth.length != 0){
		population_growth.splice(0, population_growth.length);
	}
	console.log("New DELETE of resource " + "population_growth");
	res.sendStatus(200);
};

module.exports.deleteStatistics = function (req,res){
	var encontrado = -1;
	var region = req.params.region;
	var year = req.params.year;
	console.log(req.params);
	for (var i = 0; i < population_growth.length; i++) {
		if(region == population_growth[i].region){
			if(year == population_growth[i].year){
				encontrado = i;
				population_growth.splice(i,1);
				console.log("New DELETE of resource " + region + "/" + year);
				res.sendStatus(200);
				break;
			}
		}
	}
	if (encontrado == -1){
		res.sendStatus(404);
	}
};

module.exports.deleteStatisticsRegion = function (req,res){
	var encontrado = -1;
	var region = req.params.region;
	var aux = [];
	console.log(req.params);
	for (var i = 0; i < population_growth.length; i++) {
		if(region != population_growth[i].region){
			encontrado = i;
			aux.push(population_growth[i]);
		}
	}
	if (encontrado == -1){
		res.sendStatus(404);
	}else{
		console.log("New DELETE of resource " + region);
		population_growth = aux;
		res.sendStatus(200);
	}
};


module.exports.getLoad = function(req,res){
	console.log("Hola Ana");
	/*
	initial_array = [
	{region:"Andalucia", year: "2009", age:"20-24", men: "273183", women: "259946", total_population: "533129"},
	{region:"Marid", year: "2010", age:"20-24", men: "176043", women: "174849", total_population: "350892"},
	{region:"Cataluña", year: "2011", age:"45-49", men: "271109", women: "270808", total_population: "541917"},
	{region:"Galicia", year: "2012", age:"65-69", men: "72977", women: "82399", total_population: "155376"},
	{region:"Pais Vasco", year: "2013", age:"00-04", men: "53971", women: "51188", total_population: "105159"}];
	population_growth = initial_array;
	//console.log(population_growth);
	*/
	res.sendStatus(200);
};

module.exports.getBusqueda = function(req,res){
	var id = req.params.id;
  	var f = req.query.from;
  	var t = req.query.to;
  	var aux = [];
  	var r = [];
  	for(var i = 0; i<population_growth.length; i++){
  		if(population_growth[i].region==id){
  			aux.push(population_growth[i]);
  		}
  	}

  	for(var j = f; j<= t ; j++){
  		for(var i = 0; i<aux.length; i++){
  			if(aux[i].year==j){
  				r.push(aux[i]);
  			}
  		}
  	}

  	res.send(r);
};

function compare(a,b) {
  if (a.year < b.year)
    return -1;
  else if (a.year > b.year)
    return 1;
  else 
    return 0;
}

