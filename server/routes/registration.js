const { regValidation } = require('../libs/validation');
const { User } = require('../db/request');
const crypto = require('node:crypto');


module.exports = async (req, res, next) => {
  const regData = req.body;
  const isRegDataCorrect = regValidation.isRegDataCorrect(regData);
  if (!isRegDataCorrect) next(new Error('Incorrect regData!'));
  
  const isLoginUnique = !await regValidation.getMatches('login', regData.login);
  if (!isLoginUnique) {
    res.send({status: false, notUnique: 'login'});
    return;
  }
  
  regData.email = regData.email.toLowerCase();
  const isEmailUnique = !await regValidation.getMatches('email', regData.email);
  if (!isEmailUnique) {
    res.send({status: false, notUnique: 'email'});
    return;
  }
  
  const validData = {
    login: regData.login,
    email: regData.email,
    password: regData.password,
    salt: Math.random() + '',
  }

  User.create({
    data: {
      ...validData,
      password: encryptPassword(validData.password, validData.salt),
    }
  })
    .then((createdUser) => {
      res.send({status: true});
      console.log(createdUser);
    })
    .catch(next)
  ;
}

function encryptPassword(password, salt) {
  return crypto.createHmac('sha512', 'try to guess').update(salt).update(password).digest('hex');
}
