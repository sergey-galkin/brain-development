import React from 'react';
import * as Buttons from '../../Buttons/Buttons';

const requestStages = [
  // 0 - preparing request 
  () => {},
  // 1 - request was send
  () => {
    return {
      msg: ['Обработка запроса...'],
      acceptBtn: false,
      cancelBtn: false,
    }
  },
  // 2 - response was received with status code 2xx 
  () => {},
  // 3 - response was received with status code <> 2xx
  () => {
    return {
      msg: ['Что-то пошло не так'],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
  // 4 - response was received with status code 2xx, but credentials are not right
  () => {
    return {
      msg: [`Пользователь с введёнными учётными данными не найден`],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
];

const getRequestStage = ({index, data}) => {
  return requestStages[index](data);
}

const RequestStageInterface = ({stage, handleClick}) => {
  const stageData = getRequestStage(stage);
  return (
    <div>
      <div style={{'lineHeight': '25px'}}>
        { stageData.msg.map((m) => <p key={m}>{m}</p>) }
      </div>
      <Buttons.Container>
        { stageData.acceptBtn && <Buttons.AcceptButton handleClick={handleClick} />}
        { stageData.cancelBtn && <Buttons.CancelButton handleClick={handleClick} />}
      </Buttons.Container>
    </div>
  );
}

export default RequestStageInterface;
