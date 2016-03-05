var express = require("express");
var app = express();

var port = (process.env.PORT || 11000);


app.get("/",(req,res)=>{
	var now = new Date();
	res.write("It is: " + now);
	res.end();
});

app.listen(port);