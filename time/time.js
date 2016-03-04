
	var express = require("express");
	var app = express();
	app.use("/time",express.static(__dirname + '/time'));

	var port = (process.env.PORT || 5000);
		app.get("/time",(req,res)=>{
			var now = new Date();
			res.write("It is: " + now);
			res.end();
});
		app.listen(port);