module.exports = function (app) {

  app.use('/api', require('express').json());
  app.use(require('../db/session'));
  
  app.get('/api/identification', require('./identification'));
  app.post('/api/registration', require('./registration'));
  app.post('/api/authentication', require('./authentication'));
  app.post('/api/logout', require('./logout'));
  
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message);
  })
};