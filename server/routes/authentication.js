const { User } = require('../db/request');
const crypto = require('node:crypto');


module.exports = async (req, res, next) => {
  const loginData = req.body;

  const user = await User.findUnique({
    where: {login: loginData.login},
    select: {login: true, password: true, salt: true},
  });

  if (!user) {
    res.send({status: false});
    return;
  }
  
  const isPasswordCorrect = user.password === encryptPassword(loginData.password, user.salt);
  if (!isPasswordCorrect) {
    res.send({status: false});
    return;
  }
  req.session.user = {login: user.login};
  // console.log(req.session);
  res.send({status: true, login: user.login});
}

function encryptPassword(password, salt) {
  return crypto.createHmac('sha512', 'try to guess').update(salt).update(password).digest('hex');
}
