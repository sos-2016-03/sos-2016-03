'use strict';

var express=require("express");
var request = require("request");
var governify = require("governify");
var cors=require("cors");
var apiOil  = require('./public/api/Alberto/oil.js');
var app=express();
app.use(cors());

//SLA Alberto
governify.control(app,{
  datastore :"http://datastore.governify.io/api/v6.1/",
  namespace :"sos-2016-03-arp",
  defaultPath: "/api/v1/spain-births"
});
//Resto SLA

//PROXY ALBERTO

app.use('/api/v1/oil', apiOil);

//Proxy Patri
var pathsPatri='/api/v1/co2';
var apiServerHostPatri = 'http://sos-2016-01.herokuapp.com';

app.use(pathsPatri, function(req, res) {
  var url = apiServerHostPatri + pathsPatri + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url,(error,response, body)=>{
    if(error){
      console.error(error);
      res.sendStatus(503);
    }
  })).pipe(res);

});
//
/*******************************/
//PROXY ANA
var pathsAna='/api/v1/population';
//var apiServerHost = 'http://sos-contacts.herokuapp.com'; //el proxy hacia donde tiene que ir
var apiServerHostAna = 'https://sos-2016-02.herokuapp.com';
app.use(pathsAna, function(req, res) {
  var url = apiServerHostAna + req.baseUrl + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  console.log('URL accesed: ' + url);
  //req.pipe(request(url)).pipe(res); //Mandar la petición a la api externa; y de la api externa hace una tubería hacia la respuesta.
  req.pipe(request(url,(error,response,body)=>{
    if(error){
      console.error(error);
      res.sendStatus(503);
    }
  })).pipe(res);
});

/*******************************/



var fs=require("fs");
var bodyParser=require("body-parser");
var time=require("./time.js");
var apif1teams=require("./public/api/Alberto/apif1teams.js");
var spainBirthsApi=require("./public/api/Alberto/spain-births-api.js");
var mortSickness = require("./public/api/Patricia/mort-sickness.js");
var musics = require("./public/api/Patricia/musics.js");
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

app.use(bodyParser.json());
//----




var passport = require('passport');
var LocalAPIKeyStrategy = require('passport-localapikey-update').Strategy;
app.use(passport.initialize());

passport.use(new LocalAPIKeyStrategy(
  function(apikey, done) {
    done(null,apikey);
  }
));

function WriteAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!='write') {
            return res.sendStatus(401);
        }
        return next();
    })(req, res, next);
};

function ReadAccess(req, res, next) {
    passport.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!='read') {
            return res.sendStatus(401);
        }
        return next();
    })(req, res, next);
};
//---
var passportKey = require('passport');
var LocalAPIKey = require('passport-localapikey-update').Strategy;
app.use(passportKey.initialize());

passportKey.use(new LocalAPIKey(
  function(apikey, done) {
    done(null,apikey);
  }
));

function keyW(req, res, next) {
    passportKey.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!="patriW") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};

function keyR(req, res, next) {
    passportKey.authenticate('localapikey', function(err, user, info) {
        if(user==false)
            return res.sendStatus(401);
        else if (user!="patriR") {
            return res.sendStatus(403);
        }
        return next();
    })(req, res, next);
};


//Time
app.get("/time",time.getTime);

//F1Teams API (Hobby Alberto)
app.get("/api/sandbox/f1teams/:name",apif1teams.getItem);
app.get("/api/sandbox/f1teams",apif1teams.getList);
app.get("/api-test/f1teams/loadInitialData",apif1teams.getLoadInitialData);
app.post("/api/sandbox/f1teams",apif1teams.getPostItem);
app.post("/api/sandbox/f1teams/:name",apif1teams.getPostInvalid);
app.delete("/api/sandbox/f1teams",apif1teams.getDelete);
app.delete("/api/sandbox/f1teams/:name",apif1teams.getDeleteItem);
app.put("/api/sandbox/f1teams/",apif1teams.getPutInvalid);
app.put("/api/sandbox/f1teams/:name",apif1teams.getPut);

//Spain Births API (Main API Alberto)
app.use("/api/v1/spain-births",spainBirthsApi);

//Código Patri
app.get("/api/v1/mort-sickness",keyR, mortSickness.getSickness);
app.get("/api/v1/mort-sickness/loadInitialData",keyW, mortSickness.getLoad);
app.get("/api/v1/mort-sickness/:region/:year", keyR, mortSickness.getSicknessRegionYear);
app.get("/api/v1/mort-sickness/:region", keyR, mortSickness.getSicknessRegion);
app.get("/api/v1/mort-sickness/:year", keyR, mortSickness.getSicknessRegion);


app.post("/api/v1/mort-sickness", keyW, mortSickness.postSickness);
app.post("/api/v1/mort-sickness/:region/:year",keyW, mortSickness.postSicknessRegionYear);
app.post("/api/v1/mort-sickness/:region", keyW, mortSickness.postSicknessRegion);
app.post("/api/v1/mort-sickness/:year", keyW, mortSickness.postSicknessRegion);

app.put("/api/v1/mort-sickness", keyW,mortSickness.putSickness);
app.put("/api/v1/mort-sickness/:region/:year",keyW, mortSickness.putSicknessRegionYear);
app.put("/api/v1/mort-sickness/:region",keyW, mortSickness.putSickness);
app.put("/api/v1/mort-sickness/:year",keyW, mortSickness.putSickness);

app.delete("/api/v1/mort-sickness", keyW,mortSickness.deleteSickness);
app.delete("/api/v1/mort-sickness/:region/:year",keyW, mortSickness.deleteSicknessRegionYear);
app.delete("/api/v1/mort-sickness/:region",keyW, mortSickness.deleteSicknessRegion);
app.delete("/api/v1/mort-sickness/:year",keyW, mortSickness.deleteSicknessRegion);
//Final código Patri

//Musics API Patri
app.get("/api/sandbox/music",musics.getMusics);
app.get("/api/sandbox/music/:name",musics.getMusicsName);
app.get("/api-test/music/loadInitialData",musics.getLoadInitialData);

app.post("/api/sandbox/music",musics.postMusics);
app.post("/api/sandbox/music/:name",musics.postMusicsName);

app.delete("/api/sandbox/music",musics.deleteMusics);
app.delete("/api/sandbox/music/:name",musics.deleteMusicsName);

app.put("/api/sandbox/music",musics.putMusics);
app.put("/api/sandbox/music/:name",musics.putMusicsName);


//-----------------------------------------------------------------------------------------------

var populationgrowth = require('./public/api/Ana/population-growth.js');


var populationgrowth = require('./public/api/Ana/population-growth.js');
app.get("/api/v1/population-growth",ReadAccess, populationgrowth.getAllStatistics);
app.get("/api/v1/population-growth/:id",ReadAccess, populationgrowth.getStatisticsId);
app.get("/api/v1/population-growth/:region/:year",ReadAccess, populationgrowth.getStatisticsRegionAndYear);

app.post("/api/v1/population-growth",WriteAccess, populationgrowth.postSatitistics);
app.post("/api/v1/population-growth/:id",WriteAccess, populationgrowth.postStatisticsNotPermitted);
app.post("/api/v1/population-growth/:region/:year",WriteAccess, populationgrowth.postStatisticsNotPermitted);

app.put("/api/v1/population-growth",WriteAccess, populationgrowth.putStatisticsNotPermitted);
app.put("/api/v1/population-growth/:id",WriteAccess, populationgrowth.putStatisticsNotPermitted);
app.put("/api/v1/population-growth/:region/:year",WriteAccess, populationgrowth.putStatistics);

app.delete("/api/v1/population-growth",WriteAccess, populationgrowth.deleteAllStatistics);
app.delete("/api/v1/population-growth/:id",WriteAccess, populationgrowth.deleteStatisticsRegionOYear);
app.delete("/api/v1/population-growth/:region/:year", WriteAccess,populationgrowth.deleteStatistics);

app.get("/api/v1/population-growth/loadInitialData",ReadAccess, populationgrowth.getStatisticsId);
//------------------------------------------------------------------------------------------------


//Swagger Alberto
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./public/api/Alberto/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});
//----------------------------------------------------------

app.use('/',express.static(__dirname + '/public'));

app.use('/mort-sickness', express.static(__dirname + '/mort-sickness'));


app.use('/population-growth',express.static(__dirname + '/public/population-growth'));


var port = (process.env.PORT || 11000);
app.listen(port, ()=>{
    console.log("Magic happens on port: " + port);
});
