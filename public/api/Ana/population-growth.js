var population_growth = [];
/*-------GET-------*/
module.exports.getAllStatistics = function(req,res){
    var f = req.query.from;
    var t = req.query.to;
    var r = [];
    var l = req.query.limit;
    var o = req.query.offset;   
    console.log(l + "----" + o);
    console.log("hola");
    var aux_paginacion = [];
    var aux = [];
    if(f!=undefined && t!=undefined && l!=undefined && o!=undefined){
      for(i=0;i<population_growth.length;i++){
          if(population_growth[i].year>=f && population_growth[i].year<=t){
            aux_paginacion.push(population_growth[i]);
          }
      }
      if(aux_paginacion.length!=0){
        aux=aux_paginacion.slice(o,aux_paginacion.length);
        aux.splice(l,aux.length);
        res.send(aux);
      }else{
        res.sendStatus(404);
     }   
    }else if(f!=undefined && t!=undefined){
      for(var j = f; j<= t ; j++){
        for(var i = 0; i<population_growth.length; i++){
          if(population_growth[i].year==j){
            r.push(population_growth[i]);
          }
        }
      }
      
      res.send(r);
      
    }else if(f==undefined && t!=undefined){
      var tp = parseInt(t, 10);
      for(var j= 0; j<population_growth.length; j++){
        var x = parseInt(population_growth[j].year, 10);
 
        if(x<=tp){
          r.push(population_growth[j]);
        }
      }
      if(r==[]){
        res.sendStatus(404);
      }else{
        r.sort(compare);
        res.send(r);  
      }
      
    }else if(f!=undefined && t==undefined){
      var fp = parseInt(f, 10);
      for(var j= 0; j<population_growth.length; j++){
        var x = parseInt(population_growth[j].year, 10);
        if(x>=fp){
          r.push(population_growth[j]);
        }
      }
      if(r==[]){
        res.sendStatus(404);
      }else{
        r.sort(compare);
        res.send(r);
      }
    }else if(l!=undefined && o==undefined){
      if(l<0){
        res.sendStatus(400);
      }else{

      for(var i=0; i<l;i++){
        if(population_growth[i]==null){
          break;
        }
        aux_paginacion.push(population_growth[i]);
      }
      console.log(aux_paginacion);
      if(aux==[]){
        res.sendStatus(404);
      }else{
        res.send(aux_paginacion);
      }
      }
    }else if(l==undefined && o!=undefined){
      if(o<0){
        res.sendStatus(400);
      }else{
      var pag1 = o; //o me dice la pos (incluye la 0)
      var pag2 = population_growth.length;
      var pag3 = pag2 - pag1;
      for(var i=o; i<o+pag3;i++){
        if(population_growth[i]==null){
          break;
        }
        aux_paginacion.push(population_growth[i]);
              }
      if(aux_paginacion==[]){
        res.sendStatus(400);
      }else{
        res.send(aux_paginacion);
      }  
      }
    }else if(l!=undefined && o!=undefined){
      var gg= [];
      if(l<0 || o<0){
        res.sendStatus(400);
      }else if(o>population_growth.length-1){
        res.send(gg);
      }else{
        var pag1 = o; //o me dice la pos (incluye la 0)
        var pag2 = population_growth.length;
        var pag3 = pag2 - pag1;
        var dd = [];
        console.log(pag3+"__"+o);
        for(var i=o; i<o+pag3;i++){
          if(population_growth[i]==null){
            break;
          }
          aux_paginacion.push(population_growth[i]);
        }
        console.log(aux_paginacion);
        for(k=0; k<l; k++){
          if(aux_paginacion[k]!=null){
            dd.push(aux_paginacion[k]);
          }
        }
        if(aux_paginacion==[]){
          res.sendStatus(400);
        }else{
          res.send(dd);
        }  
      }
    }else{
      res.send(population_growth);
    }
  console.log("New GET of resource " + "population-growth");
  
      //*****************--------------PAGINACIÓN------------------******************
/*
    console.log(l + "----" + o);
    var aux_paginacion = [];
    if(l!=undefined && o!=undefined ){
      if(l<0 || o<0){
        res.sendStatus(400);
      }
      for(var i=o; i<o+l;i++){
        aux_paginacion.push(population_growth[i]);
      }
      if(aux==[]){
        res.sendStatus(400);
      }else{
        res.send(aux_paginacion);
      }   
    }
    if(l!=undefined && o==undefined ){
      if(l<0){
        res.sendStatus(400);
      }
      for(var i=0; i<l;i++){
        aux_paginacion.push(population_growth[i]);
      }
      console.log(aux_paginacion);
      if(aux==[]){
        res.sendStatus(404);
      }else{
        res.send(aux_paginacion);
      }
    }
    
    if(l==undefined && o!=undefined ){
      if(o<0){
        res.sendStatus(400);
      }
      var pag1 = o; //o me dice la pos (incluye la 0)
      var pag2 = population_growth.length;
      var pag3 = pag2 - pag1;
      for(var i=o; i<o+pag3;i++){
        aux_paginacion.push(population_growth[i]);
      }
      if(aux==[]){
        res.sendStatus(400);
      }else{
        res.send(aux_paginacion);
      }     
    }  
  }else{
*/
    //*****************---------------FN PAGINACIÓN---------------*****************
};

module.exports.getStatisticsId = function(req,res){
  var aux = [];
  var aux2 = [];
  var encontrado = -1;
  var id = req.params.id;
  var f = req.query.from;
  var t = req.query.to;
  var l = req.query.limit;
  var o = req.query.offset;
    console.log(id + "-" + f + "-" + t);

    //--------------------------------------------------
  if(id=='loadInitialData'){
    encontrado = 1;
    initial_array = [
    {region:"Andalucia", year: "2009", age:"20-24", men: "273183", women: "259946", total_population: "533129"},
    {region:"Marid", year: "2010", age:"20-24", men: "176043", women: "174849", total_population: "350892"},
    {region:"Cataluña", year: "2011", age:"45-49", men: "271109", women: "270808", total_population: "541917"},
    {region:"Galicia", year: "2012", age:"65-69", men: "72977", women: "82399", total_population: "155376"},
    {region:"Pais Vasco", year: "2013", age:"00-04", men: "53971", women: "51188", total_population: "105159"},
    {region:"Andalucia", year: "2012", age:"20-24", men: "252799", women: "241437", total_population: "494236"}
    ];
    population_growth = initial_array;
    //console.log(population_growth);
    res.sendStatus(200);
  }else{
  //------------------------------------------------
      

  for(var i = 0; i< population_growth.length; i++){
    if(id == population_growth[i].region){
      encontrado = i;
      console.log("New GET of resource " + population_growth[i].region);
      var p = population_growth[i];
      //res.send(t);
      aux.push(p);
    }
    if(id == population_growth[i].year){
      encontrado = i;
      console.log("New GET of resource " + population_growth[i].year);
      var p = population_growth[i];
      //res.send(t);
      aux2.push(p);
    }
  }

  if(aux.length!=0){
    var aux_paginacion= [];
    var r4 = [];
    if(f!=undefined && t!=undefined && l!=undefined && o!=undefined){
      for(i=0;i<aux.length;i++){
          if(aux[i].year>=f && aux[i].year<=t){
            aux_paginacion.push(aux[i]);
          }
      }
      if(aux_paginacion.length!=0){
        r4=aux_paginacion.slice(o,aux_paginacion.length);
        r4.splice(l,r4.length);
        res.send(r4);
      }else{
        res.sendStatus(404);
     }   
    }else if(f!=undefined && t!=undefined){
        for(var j = f; j<= t ; j++){
          for(var i = 0; i<r4.length; i++){
            if(r4[i].year==j){
              r4.push(r4[i]);
            }
          }
        }
        res.send(r4);
    }else if(f!=undefined && t==undefined){
        var r5 = [];
        var fp = parseInt(f, 10);
        for(var j= 0; j<aux.length; j++){
          var x = parseInt(aux[j].year, 10);
          if(x>=fp){
            r5.push(aux[j]);
          }
        }
        r5.sort(compare);
        res.send(r5);
    }else if(f==undefined && t!=undefined){
        var r5 = [];
        var tp = parseInt(t, 10);
        for(var j= 0; j<aux.length; j++){
          var x = parseInt(aux[j].year, 10);
          if(x<=tp){
            r5.push(aux[j]);
          }
        }
        r5.sort(compare);
        res.send(r5);

    //************
    }else if(l!=undefined && o==undefined){
      if(l<0){
        res.sendStatus(400);
      }else{
        for(var i=0; i<l;i++){
          if(aux[i]==null){
            break;
          }
          aux_paginacion.push(aux[i]);
        }
        res.send(aux_paginacion);
      }
    }else if(l==undefined && o!=undefined){
      if(o<0){
        res.sendStatus(400);
      }else{
        var pag1 = o; //o me dice la pos (incluye la 0)
        var pag2 = aux.length;
        var pag3 = pag2 - pag1;
        for(var i=o; i<o+pag3;i++){
          if(aux[i]==null){
            break;
          }
          aux_paginacion.push(aux[i]);
        }
        res.send(aux_paginacion);
         
      }
    }else if(l!=undefined && o!=undefined){
      var gg= [];
      if(l<0 || o<0){
        res.sendStatus(400);
      }else if(o>aux.length-1){
        res.send(gg);
      }else{
        var pag1 = o; //o me dice la pos (incluye la 0)
        var pag2 = aux.length;
        var pag3 = pag2 - pag1;
        var dd = [];
        console.log(pag3+"__"+o);
        for(var i=o; i<o+pag3;i++){
          if(aux[i]==null){
            break;
          }
          aux_paginacion.push(aux[i]);
        }
        console.log(aux_paginacion);
        for(k=0; k<l; k++){
          if(aux_paginacion[k]!=null){
            dd.push(aux_paginacion[k]);
          }
        }
        
        res.send(dd);
        } 
      
    //************

    }else{
        res.send(aux);
    }
  }else if(aux2.length!=0 && (f==undefined && t==undefined)){
    var aux_paginacion = [];
    if(l!=undefined && o==undefined){
      if(l<0){
        res.sendStatus(400);
      }else{
        for(var i=0; i<l;i++){
          if(aux2[i]==null){
            break;
          }
          aux_paginacion.push(aux2[i]);
        }
        res.send(aux_paginacion);
      }
    }else if(l==undefined && o!=undefined){
      if(o<0){
        res.sendStatus(400);
      }else{
        var pag1 = o; //o me dice la pos (incluye la 0)
        var pag2 = aux2.length;
        var pag3 = pag2 - pag1;
        for(var i=o; i<o+pag3;i++){
          if(aux2[i]==null){
            break;
          }
          aux_paginacion.push(aux2[i]);
        }
        res.send(aux_paginacion);
         
      }
    }else if(l!=undefined && o!=undefined){
      var gg= [];
      if(l<0 || o<0){
        res.sendStatus(400);
      }else if(o>aux2.length-1){
        res.send(gg);
      }else{
        var pag1 = o; //o me dice la pos (incluye la 0)
        var pag2 = aux2.length;
        var pag3 = pag2 - pag1;
        var dd = [];
        console.log(pag3+"__"+o);
        for(var i=o; i<o+pag3;i++){
          if(aux2[i]==null){
            break;
          }
          aux_paginacion.push(aux2[i]);
        }
        console.log(aux_paginacion);
        for(k=0; k<l; k++){
          if(aux_paginacion[k]!=null){
            dd.push(aux_paginacion[k]);
          }
        }
        if(aux_paginacion==[]){
          res.sendStatus(400);
        }else{
          res.send(dd);
        }  
      }
    }else{
      res.send(aux2);
    }
  }else if(encontrado == -1){
    res.sendStatus(404);
  }else if(aux2.length!=0 && (f!=undefined || t!=undefined)){
      res.sendStatus(400);
  }

  
  //------------------------------------------------------------------------------
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
  
  var alb = Object.keys(p).length;
  var semaforo = 0;

  if(population_growth.length==0){
    console.log("anita1");
    if(x==undefined || x2==undefined || x3==undefined || x4==undefined || x5==undefined || x6==undefined
      || alb!=6){
      res.sendStatus(400);
    }
  }else{
    for(k=0; k<population_growth.length; k++){
      if(x==population_growth[k].region && x2==population_growth[k].year){
        semaforo = 1;
      }
    }
    if(semaforo==1){
      res.sendStatus(409);
    }else{
      population_growth.push(p);
      console.log("New POST of resource " + "population growth");
      res.sendStatus(201);
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
  var x = p.region;
  var x2 = p.year;
  var x3 = p.age;
  var x4 = p.men;
  var x5 = p.women;
  var x6 = p.total_population;
  
  var alb = Object.keys(p).length;

  if(x==undefined || x2==undefined || x3==undefined || x4==undefined || x5==undefined || x6==undefined
    || alb!=6){
    res.sendStatus(400);
  }else if(year!=p.year || region!=p.region){
    res.sendStatus(400);
  }else{

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

module.exports.deleteStatisticsRegionOYear = function (req,res){
  var encontrado = -1;
  var id = req.params.id;
  var aux = [];
  var cont = 0;
  console.log(req.params);
  for (var i = 0; i < population_growth.length; i++) {
    if(id != population_growth[i].region && id!=population_growth[i].year){
      encontrado = i;
      aux.push(population_growth[i]);
    }
  }
  var l_aux = aux.length;

  console.log(aux);
  var indice_borrar= aux.length;
  for (var j = 0; j < population_growth.length; j++) {
    if(id == population_growth[j].region || id==population_growth[j].year){
      aux.push(population_growth[j]);
      cont = cont + 1;
    }
  }
  var l_aux_2 = aux.length;
  console.log(aux);
  if (l_aux==l_aux_2){
    res.sendStatus(404);
  }else{
    console.log("New DELETE of resource " + id);
    aux.splice(indice_borrar, cont);
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