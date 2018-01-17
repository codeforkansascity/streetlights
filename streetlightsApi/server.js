//Dependencies

//var express = require('express');
var http = require('http');
var app = require('./app');

var port = process.env.PORT||3000
var server = http.createServer(app);

//Express





server.listen(port);
console.log("Listening on "+ port);