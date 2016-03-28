var express=require("express");
var fs=require("fs");
var app=express();
var bodyParser=require("body-parser");
var time=require("./time.js");
var apif1teams=require("./public/api/Alberto/apif1teams.js");
var spainBirthsApi=require("./public/api/Alberto/spain-births-api.js");
var mortSickness = require("./public/api/Patricia/mort-sickness.js");
var musics = require("./public/api/Patricia/musicsjs");

app.use(bodyParser.json());


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
app.get("/api/v1/mort-sickness",mortSickness.getSickness);
app.get("/api/v1/mort-sickness/:region/:year", mortSickness.getSicknessRegionYear);
app.get("/api/v1/mort-sickness/:region", mortSickness.getSicknessRegion);
app.get("/api/v1/mort-sickness/:year", mortSickness.getSicknessRegion);

app.post("/api/v1/mort-sickness", mortSickness.postSickness);
app.post("/api/v1/mort-sickness/:region/:year", mortSickness.postSicknessRegionYear);
app.post("/api/v1/mort-sickness/:region", mortSickness.postSicknessRegion);
app.post("/api/v1/mort-sickness/:year", mortSickness.postSicknessRegion);

app.put("/api/v1/mort-sickness", mortSickness.putSickness);
app.put("/api/v1/mort-sickness/:region/:year", mortSickness.putSicknessRegionYear);
app.put("/api/v1/mort-sickness/:region", mortSickness.putSickness);
app.put("/api/v1/mort-sickness/:year", mortSickness.putSickness);

app.delete("/api/v1/mort-sickness", mortSickness.deleteSickness);
app.delete("/api/v1/mort-sickness/:region/:year", mortSickness.deleteSicknessRegionYear);
app.delete("/api/v1/mort-sickness/:region", mortSickness.deleteSicknessRegion);
app.delete("/api/v1/mort-sickness/:year", mortSickness.deleteSicknessRegion);
//Final código Patri

//Musics API Patri
app.get("/api/sandbox/music",musics.getMusics);
app.get("/api/sandbox/music/:name",musics.getMusicsName);
app.get("/api-test/musics/loadInitialData",musics.getLoadInitialData);

app.post("/api/sandbox/music",musics.postMusics);
app.post("/api/sandbox/music/:name",musics.postMusicsName);

app.delete("/api/sandbox/music",musics.deleteMusics);
app.delete("/api/sandbox/music/:name",musics.deleteMusicsName);

app.put("/api/sandbox/music",musics.putMusics);
app.put("/api/sandbox/music/:name",musics.putMusicsName);




var populationgrowth = require('./public/api/Ana/population-growth.js');


var populationgrowth = require('./public/api/Ana/population-growth.js');
app.get("/api/v1/population-growth", populationgrowth.getAllStatistics);
app.get("/api/v1/population-growth/:id", populationgrowth.getStatisticsId);
app.get("/api/v1/population-growth/:region/:year", populationgrowth.getStatisticsRegionAndYear);

app.post("/api/v1/population-growth", populationgrowth.postSatitistics);
app.post("/api/v1/population-growth/:id", populationgrowth.postStatisticsNotPermitted);
app.post("/api/v1/population-growth/:region/:year", populationgrowth.postStatisticsNotPermitted);

app.put("/api/v1/population-growth", populationgrowth.putStatisticsNotPermitted);
app.put("/api/v1/population-growth/:id", populationgrowth.putStatisticsNotPermitted);
app.put("/api/v1/population-growth/:region/:year", populationgrowth.putStatistics);

app.delete("/api/v1/population-growth", populationgrowth.deleteAllStatistics);
app.delete("/api/v1/population-growth/:region", populationgrowth.deleteStatisticsRegion);
app.delete("/api/v1/population-growth/:region/:year", populationgrowth.deleteStatistics);

app.get("/api/v1/population-growth/loadInitialData", populationgrowth.getStatisticsId);


app.use('/',express.static(__dirname + '/public'));

app.listen(port, ()=>{
	console.log("Magic happens on port: " + port);
});