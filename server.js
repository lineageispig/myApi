'use strict'

var request = require("request");
var nodeStatusCodes = require('node-status-codes');
var express = require('express');
var bodyParser = require('body-parser'); 
var morgan     = require('morgan');
var app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('short'));
app.use(express.static(__dirname)); 

app.get('/', function(req, res) {

    res.sendfile('/Users/mac/Desktop/myProject/myApi/myproduct.html');
})

app.post('/', function(req, res){

  console.log('access success!') 

  var user_name=req.body.user;
  var password=req.body.password;
  var lat = req.body.lat;
  var lng = req.body.lng; 
  var url =  "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + user_name + "&destinations=" + password  + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8',
    url2 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + user_name + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8',
    url3 = "https://maps.googleapis.com/maps/api/geocode/json?address="  + password + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8';

    request({
    url: url,
    json: true
}, function (error, response, body) {
        if (!error && response.statusCode === 200) {
        console.log('"status":' +body.status)
    }
})
   request({ 
    url: url2,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    console.log('"START":' + '[' + body.results[0].geometry.location.lat + ',' + body.results[0].geometry.location.lng  +']')
    }
})
    request({ 
    url: url3,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
    console.log( '"DROPOFF":' + '[' + body.results[0].geometry.location.lat + ',' + body.results[0].geometry.location.lng + ']')
    }
})
    request({ 
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {   
        console.log('"total_distance":' +body.rows[0].elements[0].distance.value) 
        console.log('"total_time":' +body.rows[0].elements[0].duration.value)
    }
})
  res.end("yes");
});

app.listen(8080, function(){
    
    console.log('port success on 8080.')
})


