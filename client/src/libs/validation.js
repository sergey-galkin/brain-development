export const regValidation = new class {
  login = checkLogin;
  email = checkEmail;
  password = checkPassword;
  repeatedPassword = checkRepeatedPassword;
  checkAll = (regData) => {
    return {
      login: this.login(regData),
      email: this.email(regData),
      password: this.password(regData),
      repeatedPassword: this.repeatedPassword(regData),
    }
  }
}

function checkLogin({login}) {
  let msg = '';
  if ((login.match(/[\d a-z\.@!~_=-]/ig) || []).length !== login.length) {
    msg = 'Логин может содержать только латинские буквы, цифры и следующие спецсимволы: .@!~_=-';
  }
  if (login.slice(0, 1) === ' ' || login.slice(-1) === ' ' || ~login.indexOf('  ')) {
    msg = 'Логин не должен содержать пробелов в начале и конце, а также 2 подряд идущих пробела';
  }
  if (login.length > 30) msg = 'Вы ввели слишком длинный Логин';
  if (login.length < 3) msg = 'Вы ввели слишком короткий Логин';
  if (login.length === 0) msg = 'Поле не заполнено';

  return msg;
}

function checkEmail({email}) {
  let msg = '';
  if (!/[-.\w]+@([\w-]+\.)+[\w-]+/i.test(email)) msg = 'Вы указали адрес неправильного формата. Пример правильного адреса: "example@mail.ru"';
  if (email.length > 100) msg = 'Вы ввели слишком длинный email';
  if (email.length === 0) msg = 'Поле не заполнено';

  return msg;
}

function checkPassword({password}) {
  let msg = '';
  if ((password.match(/[\da-z\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/ig) || []).length !== password.length) {
    msg = 'Пароль может содержать латинские буквы, цифры и следующие спецсимволы: []/\\^$.|*+()@!~_={}-';
  }
  if (!/[\[\]\/\\\^\$\.\|\*\+\(\)@!~_={}-]/.test(password)) msg = 'Пароль должен содержать не менее 1 спецсимвола: []/\\^$.|*+()@!~_={}-';
  if (!/[A-Z]/.test(password)) msg = 'Пароль должен содержать не менее 1 заглавной буквы латинского алфавита';
  if (!/[a-z]/.test(password)) msg = 'Пароль должен содержать не менее 1 строчной буквы латинского алфавита';
  if (!/\d/.test(password)) msg = 'Пароль должен содержать не менее 1 цифры';
  if (password.length > 100) msg = 'Вы ввели слишком длинный пароль';
  if (password.length < 7) msg = 'Пароль должен быть длиной не менее 7 символов';
  if (password.length === 0) msg = 'Поле не заполнено';

  return msg;
}

function checkRepeatedPassword({password, repeatedPassword}) {
  let msg = '';
  if (password !== repeatedPassword) msg = 'Пароль не совпадает';
  if (repeatedPassword.length === 0) msg = 'Поле не заполнено';
  
  return msg;
}
