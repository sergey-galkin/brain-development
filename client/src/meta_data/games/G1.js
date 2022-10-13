import logoSVG from '../../images/background/gameSlab_1.svg';

export default {
  id: 'G1',
  urls: [
    'game-1',
    'igra-1',
  ],
  name: 'Игра 1',
  logo: logoSVG,
  header: 'Игра на внимательность и реакцию',
  description: [
    {
      header: 'Цель игры',
      internals: [
        'Набрать наибольшее количество очков до совершения 3-х ошибок',
      ],
    },
    {
      header: 'Правила',
      internals: [
        'Время на ход 1 секунда',
        'Смена уровней сложности через каждые 20 секунд',
        'Игра завершается после 3-х ошибок'
      ],
    },
    {
      header: 'Навыки',
      internals: [
        'Внимательность',
        'Реакция',
        'Концентрация',
      ],
    }
  ],
}