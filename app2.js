
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , streams = require('./routes/streams')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

streams.setSocket(io);

app.get('/', routes.index);
app.get('/camerastream', streams.camera);
app.get('/filterstream', streams.filtered);
app.get('/contourstream', streams.contours);
app.get('/circlestream', streams.circle);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
