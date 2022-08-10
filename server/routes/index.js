export default function (app) {

  app.get('/api', function(req, res) {
    res.send({msg: 'Answer from server'});
  });
  
};