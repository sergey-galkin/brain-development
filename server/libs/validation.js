const { User } = require('../db/request');

exports.regValidation = new class {
  isRegDataCorrect = ({login, email, password}) => {
    return (
      isLoginCorrect(login) && 
      isEmailCorrect(email) && 
      isPasswordCorrect(password)
    );
  }
  getMatches = (column, value) => {
    return User.count({
      where: {
        [column]: {
          equals: value,
          mode: 'insensitive'
        },
      }
    });
  }
}


function isLoginCorrect(login) {
  if ((login.match(/[\d a-z\.@!~_=-]/ig) || []).length !== login.length) return false;
  if (login.slice(0, 1) === ' ' || login.slice(-1) === ' ' || ~login.indexOf('  ')) return false;
  if (login.length > 30) return false;
  if (login.length < 3) return false;

  return true;
}

function isEmailCorrect(email) {
  if (!/[-.\w]+@([\w-]+\.)+[\w-]+/i.test(email)) return false;
  if (email.length > 100) return false;

  return true;
}

function isPasswordCorrect(password) {
  if ((password.match(/[\da-z\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/ig) || []).length !== password.length) return false;
  if (!/[\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/.test(password)) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/\d/.test(password)) return false;
  if (password.length > 100) return false;
  if (password.length < 7) return false;

  return true;
}
