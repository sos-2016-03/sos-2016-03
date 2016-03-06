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
 		res.write("<html><body><link rel='stylesheet' type='text/css' href='../stylesheets/spain-births.css' />");
		res.write('<h3>Spanish births </h3>');
 		res.write("<div class='main'><p style='text-align: justify;'>It will display data about spanish births, by regions and years. Making difference between men and women, showing the total number of births in the last column, as following: </p>");		
 		res.write("Data example:<ul>");
 		res.write("<table rules='all' cellpadding='5'><tr bgcolor='#81BEF7'><td>region</td><td>year</td><td>men</td><td>women</td><td>total birth</td></tr>");
 		births.forEach((birth) =>{
 			res.write("<tr bgcolor='#FFFFFF'><td>"+birth.region+"</td><td>"+birth.year+"</td><td>"+birth.men+"</td><td>"+birth.women+"</td><td>"+birth.totalbirth+"</td></tr>");
 		});
 		res.write("</table></div><br /><a href='/about/'>« Previous</a>");
 		res.write("</body></html>");
 		res.end();
 	});
 	
 });

app.get("/about/mort-sickness",(req,res)=>{
	fs.readFile('mort-sickness.json', 'utf-8', (err, content)=>{
		console.log("This is my data source");
		sic = JSON.parse(content);
		res.write('<html><h1>Mort sickness</h1>');
		res.write('<body>My data source is about mortality sexually transmited disease. For example:');
		res.write("<table rules=all cellpadding=7>");
		res.write("<tr bgcolor=#81BEF7><td>region</td><td>sickness</td><td>year</td><td>mortality-in-men</td><td>mortality-in-women</td><td>total-mortality</td></tr>");
		sic.forEach((sick) =>{
			res.write('<tr bgcolor="#F2F2F2">'+ '<td>'+sick.region+'</td>' + '<td>'+sick.sickness+'</td>' +'<td>'+sick.year+'</td>'+ '<td>'+sick.mortalityinmen+'</td>' + '<td>'+sick.mortalityinwomen+'</td>' + '<td>'+sick.totalmortality+'</td>' + '</tr>' +'</br>');
		});
		res.write('</table>');
		res.write("</ul><a href='/about/'>« Previous</a>");
		res.write("</body></html>");
		res.end();
	});
});

app.get('/about/',(req,res) =>{
	fs.readFile('members.json','utf-8',(err,content) =>{
		members=JSON.parse(content);
		res.write("<html><body><link rel='stylesheet' type='text/css' href='../stylesheets/about.css' />");
  		res.write("<h3><table border='1' rules='all' cellpadding='5'>Group members:</h3><ul>");	
  		res.write("<tr bgcolor='#81BEF7'><td>Group member</td><td>Data</td>");	
  		members.forEach((member) =>{
 			res.write("<tr bgcolor='#FFFFFF'><td>"+member.name+"</td><td><a href=/about/"+member.source+">"+member.source+"</a></td></tr>");
 		});
		res.write("</table><h3>Project theme:</h3>");
		res.write("<p style='text-align: justify;'>Our sources of information are aimed for analyzing the relationship between the number of births over the years in the regions of Spain, along with the number of deaths due to different types of disease and population growth in our country.</p></body></html>");
 		res.write("<a href='/'>« Previous</a>");
 		res.end();
 	});
 });


app.get("/time",(req,res)=>{
	var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	var months=[
  		"January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		  ];
	var now = new Date();
	var hour=now.getHours();
	var min=now.getMinutes();
	var sec=now.getSeconds();
	var year=now.getFullYear();
	var month=now.getMonth();
	var day=now.getDate();
	if(hour<12){
		if(sec<10){
			res.write("<html><body><h2>Good morning, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<html><body><h2>Good morning, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}else if(hour<20){
		if(sec<10){
			res.write("<html><body><h2>Good afternoon, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<html><body><h2>Good afternoon, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}else{
		if(sec<10){
			res.write("<html><body><h2>Good night, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":0"+sec+"</h2><br />");
		}else{
			res.write("<html><body><h2>Good night, today is "+days[day]+" "+day+" "+months[month]+" "+year+" and it is "+hour+":"+min+":"+sec+"</h2><br />");
		}
	}
	res.write("<a href='/about.html'>« Previous</a></body></html>");
	res.end();
});



app.use('/',express.static(__dirname + '/public'));
app.use('/about',express.static(__dirname + '/about'));


app.listen(process.env.PORT || 7000);

