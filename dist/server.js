'use strict';

var express = require('express');

// Variables de entorno
var PORT = process.env.PORT || 8080;
var HOST = process.env.HOST || '0.0.0.0';
var greetingMessage = process.env.GREETING_MESSAGE || 'Hello World';

// App
var app = express();
app.get('/', function (req, res) {
  res.send(greetingMessage);
});
app.get('/health', function (req, res) {
  res.status(200).send('Healthy');
});
app.listen(PORT, HOST, function () {
  console.log("Running on http://".concat(HOST, ":").concat(PORT));
});
module.exports = app;