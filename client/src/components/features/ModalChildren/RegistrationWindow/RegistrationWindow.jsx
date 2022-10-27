import React, { useState } from 'react';
import { createUser } from '../../../../api/dbRequest';
import { regValidation } from '../../../../libs/validation';
import Field from './Field/Field';
import css from './RegistrationWindow.module.css';
import RequestStageInterface from '../RequestStageInterface/RequestStageInterface';
import additionalStages from "./requestStages";
import ModalWindowButton from '../../Buttons/CSSButtons/ModalWindowButton/ModalWindowButton';


const fields = [
  {
    id: 'login',
    type: 'text',
    placeholder: 'Логин',
  },
  {
    id: 'email',
    type: 'text',
    placeholder: 'E-mail',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Пароль',
  },
  {
    id: 'repeatedPassword',
    type: 'password',
    placeholder: 'Повторите пароль',
  },
];

const setFormFieldInitialState = (value) => {
  const state = {};
  fields.forEach((f) => state[f.id] = value);
  return state;
}

const isRegDataCorrect = (warnings) => {
  for (const field in warnings) {
    if (Object.hasOwnProperty.call(warnings, field)) {
      if (warnings[field]) return false;
    }
  }
  return true;
}

const RegistrationWindow = ({closeModal}) => {
  const [regData, setRegData] = useState(setFormFieldInitialState(''));
  const [warnings, setWarnings] = useState(setFormFieldInitialState(''));
  const [requestStage, setRequestStage] = useState({index: 0, data: ''});

  function handleFormFieldChange(e) {
    setRegData({
      ...regData,
      [e.target.id]: e.target.value,
    });
  }

  function handleFormFieldBlur(e) {
    setWarnings({
      ...warnings,
      [e.target.id]: regValidation[e.target.id](regData),
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newW = regValidation.checkAll(regData);
    // const regData = {
    //   login: 'Johny',
    //   email: 'JohnyConor@gmail.com',
    //   password: 'aaaaA1!',
    // };
    if (isRegDataCorrect(newW)) {
    // if (true) {
      setRequestStage(1);
      createUser(regData)
        .then(res => {
          if (res.data.status) setRequestStage({index: 3, data: ''});
          else {
            const field = res.data.notUnique;
            const value = regData[field];
            if (field === 'login') setRequestStage({index: 4, data: value})
            if (field === 'email') setRequestStage({index: 5, data: value})
          }
        })
        .catch(err => {console.log(err); setRequestStage(2)})
      ;
    } else {
      setWarnings(newW);
    }
  }

  return (
    <div className={css.container}>
      { requestStage.index  
        ?
        <RequestStageInterface additionalStages={additionalStages} stage={requestStage} handleClick={closeModal} />
        :
        <form onSubmit={handleFormSubmit}>
          {fields.map((f) => {
            return <Field {...f} key={f.id}
              value={regData[f.id]}
              onChange={handleFormFieldChange}
              onBlur={handleFormFieldBlur}
              msg={warnings[f.id]}
            />;
          })}
          <ModalWindowButton type="submit" value='Зарегистрироваться' />
        </form>
      }
    </div>
  );
}

export default RegistrationWindow;
