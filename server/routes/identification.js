module.exports = (req, res, next) => {
  const user = req.session.user;
  res.send(user);
}