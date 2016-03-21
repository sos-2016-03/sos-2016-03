var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var app=express();
var router=express.Router();

var births=[];

app.use(bodyParser.json());

//API Alberto
//Métodos GET
//Devuelve la lista de recursos
router.get("/",(req,res) => {
  res.send(births);
});

//Devuelve un recurso individual
router.get("/:region/",(req,res) => {
    var region = req.params.region;
    var birth = [];
    if(region=='loadInitialData'){
      loadInitialData();
      res.sendStatus(200);
    }else{
      for(i=0;i<births.length;i++){
          if(births[i].region == region){
            birth.push(births[i]);
            break;
          }
      }
      if(birth.length!=0){
          res.send(birth);
      }else{
         res.sendStatus(404);
      }
    }
});

router.get("/:year/",(req,res) => {
    var year = req.params.year;
    var birth = [];
    if(region=='loadInitialData'){
      loadInitialData();
      res.sendStatus(200);
    }else{
      for(i=0;i<births.length;i++){
          if(births[i].year == year){
            birth.push(births[i]);
            break;
          }
      }
      if(birth.length!=0){
          res.send(birth);
      }else{
         res.sendStatus(404);
      }
    }
});

router.get("/:region/:year",(req,res) => {
    var year = req.params.year;
    var region = req.params.region;
    var birth = [];
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
//Método que añade un nuevo equipo
router.post("/",(req,res) => {
  var birth=req.body;
  console.log("dwhqdwqdw "+birth.region);
  for(i=0;i<births.length;i++){  
    if(births[i]==birth.region){
      console.log("Hola");
     // break;
      res.sendStatus(409);
    }else{
      births.push(birth);
   //   break;
      res.sendStatus(201);     
    }
  }
});

//Método inválido
router.post("/:region",(req,res) => {
	res.sendStatus(405);
});

//Métodos DELETE
//Borra toda la lista
router.delete("/",(req,res) => {
	births=[];
	res.sendStatus(200);
});

//Borra un recurso individual
router.delete("/:region",(req,res) => {
	var region=req.params.region;
	var cont=0;
  console.log("New DELETE request of resource "+name);
  for(i=0;i<births.length;i++){
     	if(births[i].region == region){
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
});

//Métodos PUT
//Método inválido
router.put("/",(req,res) => {
	res.sendStatus(405);
});

//Actualiza un elemento de array o en su caso devuelve 404
router.get("/:region",(req,res) => {
    var region = req.params.region;
    var regionUpdated = req.body;
    var cont = 0;
    for(i=0;i<births.length;i++){
      	if(births[i].region == region){
        	births[i]=regionUpdated;
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

module.exports=router;