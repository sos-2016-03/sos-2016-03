
	var express = require("express");
	var app = express();

		app.get("/time",(req,res)=>{
			var now = new Date();
			res.write("It is: " + now);
			res.end();
		});