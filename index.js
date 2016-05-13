var express=require("express");
var fs=require("fs");
var app=express();
var bodyParser=require("body-parser");
var cors=require("cors");
var request = require("request");
var time=require("./time.js");
var apif1teams=require("./public/api/Alberto/apif1teams.js");
var spainBirthsApi=require("./public/api/Alberto/spain-births-api.js");
var mortSickness = require("./public/api/Patricia/mort-sickness.js");
var musics = require("./public/api/Patricia/musics.js");

app.use(bodyParser.json());

//----

//PROXY ALBERTO
var pathAlbrodpul = '/api/v1/oil';
var apiServerHostAlbrodpul = 'http://sos-2016-01.herokuapp.com';

  app.use(pathAlbrodpul,function(req,res){
    var url = apiServerHostAlbrodpul + req.baseUrl + req.url;
    console.log("Piped: "+ req.baseUrl + req.url);
    console.log("URL Accesed: "+ url);

    req.pipe(request(url,(error,response,body)=>{
      if(error){
        console.error(error);
        res.sendStatus(503);
      }
    })).pipe(res);
  });


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




var port = (process.env.PORT || 11000);

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

app.use('/',express.static(__dirname + '/public'));

app.use('/mort-sickness', express.static(__dirname + '/mort-sickness'));


app.use('/population-growth',express.static(__dirname + '/public/population-growth'));

app.listen(port, ()=>{
    console.log("Magic happens on port: " + port);
});
