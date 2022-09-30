import React from 'react';
import * as Buttons from '../Buttons/Buttons';

const generalStages = [
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
  // 2 - response was received with status code <> 2xx
  () => {
    return {
      msg: ['Что-то пошло не так'],
      acceptBtn: false,
      cancelBtn: true,
    }
  },
];

const getRequestStage = (stages, {index, data}) => {
  return stages[index](data);
}

const RequestStageInterface = ({additionalStages, stage, handleClick}) => {
  const stages = generalStages.concat(additionalStages);
  const stageData = getRequestStage(stages, stage);
  
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
  )
}

export default RequestStageInterface;
