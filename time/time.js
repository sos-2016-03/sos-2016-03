var express = require("express");
var app = express();
app.use("/time",express.static(__dirname + '/time'));

app.get("/time",(req,res)=>{
	var now = new Date();
	res.write("It is: " + now);
	res.end();
});
