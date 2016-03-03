var express=require("express");
var fs=require("fs");
var app=express();


app.get("/about/mort-sickness",(req,res)=>{
	fs.readFile('mort-sickness.json', 'utf8', (err, content)=>{
		console.log("This is my data source");
		sic = JSON.parse(content);
		res.write('<html><h1>Mort sickness</h1>');
		res.write('<body>My data source is about mortality sexually transmited disease. For example:</br>');
		res.write("<li>region, year, mortality-in-men, mortality-in-women, total-mortality</li>")
		sic.forEach((sick) =>{
			res.write("<li>" + sick.region + " " +sick.sickness + " " + sick.year + " " + sick.mortalityinmen  + " " + sick.mortalityinwomen + " "
				  + sick.totalmortality + "</li>");
		});
		res.write("</body></html>");
		res.end();
	});
});

app.use('/',express.static(__dirname + '/public'));
app.use('/about',express.static(__dirname + '/about'));

app.listen(process.env.PORT || 11000);

