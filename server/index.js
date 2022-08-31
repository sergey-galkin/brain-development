process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const config = require('config');
const routes = require('./routes/index');

const app = express();
const httpApp = express();

let server, httpServer, secureCookie;

if ( config.get('https') ) {
  const options = {
    key: fs.readFileSync( config.get('cert.key') ),
    cert: fs.readFileSync( config.get('cert.cert') )
  }

  server = https.createServer(options, app);
  secureCookie = true;
  
  httpServer = http.createServer(httpApp);
  httpApp.get("*", function (req, res, next) {
    res.redirect("https://" + req.headers.host + req.url);
  });
  httpServer.listen(80);

} else {
  server = http.createServer(app);
  secureCookie = false;
}

server.listen( config.get('port') );

console.log('Server is running at port ' + config.get('port'));


routes(app);
