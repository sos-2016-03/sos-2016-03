var express=require("express");
var fs=require("fs");
var app=express();
/*
app.get("/about/population-growth",(req,res)=>{
	fs.readFile('population-growth.json','utf-8',(err,content)=>{
		console.log("Data read");
		pops=JSON.parse(content);
		res.write('<html><h2>Population growth</h2>');
		res.write('<body>This page shows data about population growth in Spain in the lastest years. <br /> Data are classified acording to differents parameters, such as: <br /><ul>');
		res.write('<li>Region</li>');
		res.write('<li>Year</li>');
		res.write('<li>Age</li>');
		res.write('<li>Men</li>');
		res.write('<li>Women</li>');
		res.write('<li>Total population</li>');
		res.write("</ul>Data example:<ul>");
		res.write("<li>region, year => men, women, total population</li>")
		pops.forEach((pop) =>{
			res.write("<li>"+pop.region+", "+pop.year+" => "+pop.men+", "+pop.women+", "+pop.totalpopulation+"</li>");
		});
		res.write("</body></html>");
		res.end();
	});
	
});*/

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

