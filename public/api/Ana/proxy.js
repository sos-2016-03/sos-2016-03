var express = require('express');
var router = express.Router();
var request = require('request');

module.exports = router;

//var pathAna = '/api/v1/population';
var pathAna = '/api/v2/';

//var apiServerHostAna = 'https://sos-2016-02.herokuapp.com';
var apiServerHostAna = 'https://bikeindex.org';

router.use("/", function(req,res){
  var url = apiServerHostAna + pathAna + req.url;
  console.log("Piped: "+ req.baseUrl + req.url);
  console.log("URL Accesed: "+ url);

  req.pipe(request(url,(error,response,body)=>{
    if(error){
      console.error(error);
      res.sendStatus(503);
    }
  })).pipe(res);
});