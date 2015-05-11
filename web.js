//var gzippo = require('gzippo');
var express = require('express');
var app = express();



//app.use(express.logger('dev'));
//app.use(gzippo.staticGzip("" + __dirname + "/dist"));

var serveDir = __dirname + '/dist';
app.use(express.static(serveDir));
console.log("Express serving statically dir:" + serveDir);

var port = process.env.PORT || 9000;
app.listen(port);
console.log("Express listening at: " + port);