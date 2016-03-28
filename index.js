var express=require("express");
var fs=require("fs");
var app=express();
var bodyParser=require("body-parser");
var timeCtrl=require("./timeCtrl.js");
var spainBirthsApi=require("./public/api/Alberto/spain-births-api.js");
var mortSickness = require("./public/api/Patricia/mort-sickness.js");

app.use(bodyParser.json());


var port = (process.env.PORT || 11000);


app.get("/time",timeCtrl.getTime);

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