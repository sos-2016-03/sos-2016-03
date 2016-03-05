var express = require("express");
var app = express();
app.use("/",express.static(__dirname + '/time'));

app.get("/",(req,res)=>{
	var now = new Date();
	res.write("It is: " + now);
	res.end();
});
