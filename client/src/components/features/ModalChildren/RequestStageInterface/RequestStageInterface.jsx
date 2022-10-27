import React from 'react';
import css from './RequestStageInterface.module.css'
import AcceptButton from '../../Buttons/SVGButtons/AcceptButton/AcceptButton';
import CancelButton from '../../Buttons/SVGButtons/CancelButton/CancelButton';

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
      <div className={css.message}>
        { stageData.msg.map((m) => <p key={m}>{m}</p>) }
      </div>
      <div className={css.buttonsContainer}>
        { stageData.acceptBtn && <AcceptButton handleClick={handleClick} />}
        { stageData.cancelBtn && <CancelButton handleClick={handleClick} />}
      </div>
    </div>
  )
}

export default RequestStageInterface;
