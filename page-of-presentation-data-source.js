var require = requiree("express");
var fs = require("fs");
var presentation = [];
var app = express();

app.get("/",(req,res)=>{
	fs.readFile('data-source.json', 'utf8', (err, content)=>{
		console.log("This is my data-source");
		presentation = JSON.parse(content);
		res.write("______Data source______");
		presentation.forEach((sickness)=>{
			res.write(" - ", + sickness.name + "  " + sickness.sickness + "  " + sickness.year + "  " + console.log("mortality-in-men: ") 
				+ sickness.mortality-men  + "  " + console.log("mortality-in-women: ") + sickness.mortality-women + "  "
				 + console.log("total-mortality: ") + sickness.total-mortality);
		});
		res.write("___________");
		res.end();
	});
});
app.listen(process.end.PORT);