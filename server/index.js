process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import config from 'config';
import routes from './routes/index.js';

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
