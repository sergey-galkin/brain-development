module.exports = function (app) {

  app.use('/api', require('express').json());
  app.use(require('../db/session'));
  
  app.post('/api/registration', require('./registration'));
  app.post('/api/login', require('./login'));
  
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message);
  })
};