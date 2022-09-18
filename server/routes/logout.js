module.exports = async (req, res, next) => {
  req.session.destroy((err) => {
    res.send(null);
    if (err) require('../libs/logger')(module.filename).error(err.stack)
  })
}

