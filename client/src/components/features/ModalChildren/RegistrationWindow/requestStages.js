export default [
  // 3 - response was received with status code 2xx 
  () => {
    return {
      msg: [
        'На указанный вами E-mail отправленно письмо.',
        'Для завершения процесса регистрации пройдите по ссылке, указанной в письме.'
      ],
      acceptBtn: true,
      cancelBtn: false,
    }
  },
  // 4 - response was received with status code 2xx, but login is not unique
  (login) => {
    return {
      msg: [`Пользователь с логином "${login}" уже зарегистрирован на сайте`],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
  // 5 - response was received with status code 2xx, but e-mail is not unique
  (email) => {
    return {
      msg: [`Пользователь с E-mail "${email}" уже зарегистрирован на сайте`],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
];
