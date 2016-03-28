var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var app=express();
var router=express.Router();
var keyWrite ='"write"';
var keyRead='"read"';
var births=[];

app.use(bodyParser.json());

//API Alberto
//Métodos GET
//Devuelve la lista de recursos
router.get("/",(req,res) => {
  var apikey=req.query.apikey;
  if(apikey && apikey==keyRead){
    res.send(births);
  }else{
    res.sendStatus(401);
  }
});

router.get("/loadInitialData",(req,res)=>{
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
    births=[];
    fs.readFile('./public/api/Alberto/spain-births.json','utf8',(err,content) => {
      aux=JSON.parse(content);
      aux.forEach((birth) =>{
        births.push(birth);
      });
    });
    res.sendStatus(200);
  }else{
    res.sendStatus(401);
  }
});

//Devuelve una lista del recurso, por región, año + búsqueda, paginación
router.get("/:region/",(req,res) => {
    var year = req.params.region;
    var region = req.params.region;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var from = req.query.from;
    var to = req.query.to;
    var birth = [];
    var apikey=req.query.apikey;
    if(apikey && apikey==keyRead){
      //From: desde un año en específico; To: hasta un año específico
      if(from && to){
        for(i=0;i<births.length;i++){
            if((births[i].region == region || births[i].year == year) && births[i].year>=from && births[i].year<=to){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          res.send(birth);
        }else{
          res.sendStatus(404);
        }       
        //To: Hasta un año específico
      }else if(to){
        for(i=0;i<births.length;i++){
            if((births[i].region == region || births[i].year == year) && births[i].year<=to){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          res.send(birth);
        }else{
          res.sendStatus(404);
        }       
        //From: Desde un año específico hasta el final
      }else if(from){
        for(i=0;i<births.length;i++){
            if((births[i].region == region || births[i].year == year) && births[i].year>=from){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          res.send(birth);
        }else{
          res.sendStatus(404);
        }       
        //Limit: cantidad a mostrar; Offset: a partir de donde
      }else if(limit && offset){
        for(i=0;i<births.length;i++){
            if(births[i].region == region || births[i].year == year){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          aux=birth.slice(offset,birth.length);
          aux.splice(limit,aux.length);
          res.send(aux);
        }else{
          res.sendStatus(404);
        }
        //Limit: cantidad a mostrar
      }else if(limit){
        for(i=0;i<births.length;i++){
            if(births[i].region == region || births[i].year == year){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          birth.splice(limit,birth.length);
          res.send(birth);
        }else{
          res.sendStatus(404);
        }
        //Offset: a partir de donde
      }else if(offset){
        for(i=0;i<births.length;i++){
            if(births[i].region == region || births[i].year == year){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          aux=birth.slice(offset,birth.length);
          res.send(aux);
        }else{
          res.sendStatus(404);
        }      
        //Ningún parámetro, método normal y original
      }else{
        for(i=0;i<births.length;i++){
            if(births[i].region == region || births[i].year == year){
              birth.push(births[i]);
            }
        }
        if(birth.length!=0){
          res.send(birth);
        }else{
          res.sendStatus(404);
        }
      }
    }else{
      res.sendStatus(401);
    }
});

//Consulta un elemento por región y año
router.get("/:region/:year",(req,res) => {
    var apikey=req.query.apikey;
    var year = req.params.year;
    var region = req.params.region;
    var birth = [];
    if(apikey && apikey==keyRead){
      for(i=0;i<births.length;i++){     
          if(births[i].year == year && births[i].region == region){
          	birth.push(births[i]);
          	break;
        	}
      }
      if(birth.length!=0){
          res.send(birth);
      }else{
      	 res.sendStatus(404);
      }
    }else{
      res.sendStatus(401);
    }
});


//Método que crea 2 equipos en la lista
function loadInitialData(){
  births=[];
  fs.readFile('./public/api/Alberto/spain-births.json','utf8',(err,content) => {
    aux=JSON.parse(content);
    aux.forEach((birth) =>{
      births.push(birth);
    });
  });
}


//Métodos POST
//Método que añade un nuevo equipo; 409 si ya existe el elemento por región y año
router.post("/",(req,res) => {
  var apikey=req.query.apikey;
  var birth=req.body;
  var aux=Object.keys(birth).length;
  cont=0;
  if(apikey && apikey==keyWrite){
    if(births.length==0){
      if(birth.region && birth.year && birth.men && birth.women && birth.totalbirth && aux==5){
        births.push(birth);
        res.sendStatus(201); 
      }else{
        res.sendStatus(400);
      }
    }else{
        for(i=0;i<births.length;i++){  
          if(births[i].region==birth.region && births[i].year==birth.year){
            cont=1;
            break;
          }
        }
        if(cont==1){
          res.sendStatus(409);
        }else if(birth.region && birth.year && birth.men && birth.women && birth.totalbirth && aux==5){
          births.push(birth);
          res.sendStatus(201);
        }else{
          res.sendStatus(400);
        }
    }
  }else{
    res.sendStatus(401);
  }
});

//Método inválido por región
router.post("/:region",(req,res) => {
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
	  res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
});

//Método inválido por año

router.post("/:year",(req,res)=>{
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
    res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
})

//Método inválido por región y año
router.post("/:region/:year",(req,res) => {
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
    res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
});

//Métodos DELETE
//Borra toda la lista
router.delete("/",(req,res) => {
	var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
    births=[];
	  res.sendStatus(200);
  }else{
    res.sendStatus(401);
  }
});

//Borra un recurso individual por región o año; 404 si no está
router.delete("/:region",(req,res) => {
	var apikey=req.query.apikey;
  var region=req.params.region;
  var year=req.params.region;
	var cont=0;
  var aux=births.length;
  if(apikey && apikey==keyWrite){
    for(j=0;j<aux;j++){
      for(i=0;i<births.length;i++){
      	if(births[i].region == region || births[i].year == year){
          births.splice(i,1);
         	cont=1;          
        }
      }
    }
    if(cont==1){
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  }else{
    res.sendStatus(401);
  }
});

//Borra un recurso individual por región y año; 404 si no está
router.delete("/:region/:year",(req,res) => {
  var apikey=req.query.apikey;
  var region=req.params.region;
  var year=req.params.year;
  var cont=0;
  if(apikey && apikey==keyWrite){
    for(i=0;i<births.length;i++){
        if(births[i].region == region && births[i].year == year){
          births.splice(i,1);
          cont=1;
          break;
        }
    }
    if(cont==1){
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  }else{
    res.sendStatus(401);
  }
});

//Métodos PUT
//Método inválido
router.put("/",(req,res) => {
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
	 res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
});

//Método inválido
router.put("/:region",(req,res) => {
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
   res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
});

//Método inválido
router.put("/:year",(req,res)=>{
  var apikey=req.query.apikey;
  if(apikey && apikey==keyWrite){
   res.sendStatus(405);
  }else{
    res.sendStatus(401);
  }
});

//Actualiza un recurso por región y año; devuelve 404 si no está; devuelve 400 si formato erróneo
router.put("/:region/:year",(req,res) => {
    var apikey=req.query.apikey;
    var region = req.params.region;
    var year = req.params.year;
    var regionUpdated = req.body;
    var cont = 0;
    if(apikey && apikey==keyWrite){
      for(i=0;i<births.length;i++){
          if(births[i].region == region && births[i].year == year){
            cont=1;
            if(births[i].region==regionUpdated.region && births[i].year==regionUpdated.year && regionUpdated.region && regionUpdated.year && regionUpdated.men && regionUpdated.women && regionUpdated.totalbirth){
              births[i]=regionUpdated;
              break;
            }else{
              cont=2;  
            }
        }
      }
    if(cont==1){
      res.sendStatus(200);
    }else if(cont==2){
      res.sendStatus(400);
    }else{
      res.sendStatus(404);
    }
  }else{
    res.sendStatus(401);
  }
});

module.exports=router;