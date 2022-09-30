export default [
  // 3 - response was received with status code 2xx 
  () => {},
  // 4 - response was received with status code 2xx, but credentials are not right
  () => {
    return {
      msg: [`Пользователь с введёнными учётными данными не найден`],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
];
