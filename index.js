var express=require("express");
var fs=require("fs");
var app=express();

app.get("/about/spain-births",(req,res)=>{
	fs.readFile('spain-births.json','utf-8',(err,content)=>{
		console.log("Data read");
		births=JSON.parse(content);
		res.write('<html><body><h3>Spanish births </h3><br />');
		res.write('It will display data about spanish births, by regions and years. <br />Making difference between men and women, showing the total number of births in the last column, as following: <br />');		
		res.write("Data example:<ul>");
		res.write("<li>region, year => men, women, total birth</li>")
		births.forEach((birth) =>{
			res.write("<li>"+birth.region+", "+birth.year+" => "+birth.men+", "+birth.women+", "+birth.totalbirth+"</li>");
		});
		res.write("</body></html>");
		res.end();
	});
	
});

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
	
});

app.get("/about/mort-sickness",(req,res)=>{
	fs.readFile('mort-sickness.json', 'utf8', (err, content)=>{
		console.log("This is my data source");
		sic = JSON.parse(content);
		res.write('<html><h1>Mort sickness</h1>');
		res.write('<body>My data source is about mortality sexually transmited disease');
		res.write('<li>Region</li>');
		res.write('<li>sickness</li>');
		res.write('<li>year</li>');
		res.write('<li>mortalityinmen</li>');
		res.write('<li>mortalityinwomen</li>');
		res.write('<li>totalmortality</li>');
		sic.forEach((sick) =>{
			res.write("<li>" + sick.region + "  " + sick.sickness + "  " + sick.year + "  " 
				+ sick.mortalityinmen  + "  " + sick.mortalityinwomen + "  "
				  + sick.totalmortality + "</li>");
		sic.forEach((sickness)=>{
			res.write(" - " + sickness.region + "  " + sickness.sickness + "  " + sickness.year + "  " + sickness.mortalityinmen  + "  " + sickness.mortalityinwomen + "  " + sickness.totalmortality);
		});
		res.write("</body></html>");
		res.end();
	});
});

app.get('/about',(req,res) => {
	fs.readFile('members.json','utf-8',(err,content) => {
		console.log("Data read");
		members=JSON.parse(content);
		res.write("<html><body>Group members:<ul>");

		members.forEach((member) =>{
			res.write("<li>"+member.name+" => <a href=https://sos-2016-03.herokuapp.com/about/"+member.source+">"+member.source+"</a></li>");
		});
		res.write("</ul>Our sources of information are aimed for analyzing the relationship between the number of births<br />over the years in the regions of Spain, along with the number of deaths<br /> due to different types of disease and population growth in our country .</body></html>");
		res.end();
	});
});
app.listen(process.env.PORT);

