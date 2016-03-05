var express=require("express");
var fs=require("fs");
var app=express();

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
 		res.write("</ul><a href='/about/'>« Previous</a>");
 		res.write("</body></html>");
 		res.end();
 	});
 	
 });

app.get("/about/spain-births",(req,res)=>{
  	fs.readFile('spain-births.json','utf-8',(err,content)=>{
 		console.log("Data read");
 		births=JSON.parse(content);
		res.write('<html><body><h3>Spanish births </h3>');
 		res.write("<p style='text-align: justify;'>It will display data about spanish births, by regions and years. Making difference between men and women, showing the total number of births in the last column, as following: </p>");		
 		res.write("Data example:<ul>");
 		res.write("<li>region, year => men, women, total birth</li>");
 		births.forEach((birth) =>{
 			res.write("<li>"+birth.region+", "+birth.year+" => "+birth.men+", "+birth.women+", "+birth.totalbirth+"</li>");
 		});
 		res.write("</ul><a href='/about/'>« Previous</a>");
 		res.write("</body></html>");
 		res.end();
 	});
 	
 });

app.get("/about/mort-sickness",(req,res)=>{
	fs.readFile('mort-sickness.json', 'utf8', (err, content)=>{
		console.log("This is my data source");
		sic = JSON.parse(content);
		res.write('<html><h1>Mort sickness</h1>');
		res.write('<body>My data source is about mortality sexually transmited disease. For example:</br>');
		res.write("<li>region, year, mortality-in-men, mortality-in-women, total-mortality</li>")
		sic.forEach((sick) =>{
			res.write("<li>" + sick.region + " " +sick.sickness + " " + sick.year + " " + sick.mortalityinmen  + " " + sick.mortalityinwomen + " "+ sick.totalmortality + "</li>");
		});
		res.write("</ul><a href='/about/'>« Previous</a>");
		res.write("</body></html>");
		res.end();
	});
});

app.get('/about/',(req,res) =>{
	fs.readFile('members.json','utf8',(err,content) =>{
		members=JSON.parse(content);
  		res.write("<html><body><h3>Group members:</h3><ul>");		
  		members.forEach((member) =>{
 			res.write("<li>"+member.name+" => <a href=/about/"+member.source+">"+member.source+"</a></li>");
 		});
		res.write("</ul><h3>Project theme:</h3>");
		res.write("<p style='text-align: justify;'>Our sources of information are aimed for analyzing the relationship between the number of births over the years in the regions of Spain, along with the number of deaths due to different types of disease and population growth in our country.</p></body></html>");
 		res.write("<a href='/'>« Previous</a>");
 		res.end();
 	});
 });




app.use('/',express.static(__dirname + '/public'));
app.use('/about',express.static(__dirname + '/about'));
app.use('/time',express.static(__dirname + '/time/time.js'));


app.listen(process.env.PORT || 11000);

