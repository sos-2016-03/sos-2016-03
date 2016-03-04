
	var express = require("express");
	var app = express();
	app.use("/",express.static(__dirname + '/'));

	var port = (process.env.PORT || 5000);
		app.get("/",(req,res)=>{
			var now = new Date();
			res.write("It is: " + now);
			res.end();
		});
		app.listen(port);