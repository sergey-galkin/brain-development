import React, { useState } from 'react';
import Field from './Field/Field';
import css from './LoginWindow.module.css';
import RequestStageInterface from '../RequestStageInterface/RequestStageInterface';
import additionalStages from "./requestStages";
import { useAuthenticationMutation } from '../../../../api/apiSlice';
import ModalWindowButton from '../../Buttons/CSSButtons/ModalWindowButton/ModalWindowButton';


const fields = [
  {
    id: 'login',
    type: 'text',
    placeholder: 'Логин',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Пароль',
  },
];

const setFormFieldInitialState = (value) => {
  const state = {};
  fields.forEach((f) => state[f.id] = value);
  return state;
}

const LoginWindow = ({closeModal}) => {
  const [authData, setAuthData] = useState(setFormFieldInitialState(''));
  const [requestStage, setRequestStage] = useState({index: 0, data: ''});
  const [authentication, {}] = useAuthenticationMutation();

  function handleFormFieldChange(e) {
    setAuthData({
      ...authData,
      [e.target.id]: e.target.value,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    
    // const authData = {
    //   login: 'Johny',
    //   password: 'aaaaA1!',
    // };
    setRequestStage({index: 1, data: ''});
    authentication(authData).unwrap()
      .then(res => {
        if (res) closeModal();
        else setRequestStage({index: 4, data: ''});
      })
      .catch(err => setRequestStage({index: 2, data: ''}))
    ;
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
              value={authData[f.id]}
              onChange={handleFormFieldChange}
            />;
          })}
          <ModalWindowButton type="submit" value='Войти' />
        </form>
      }
    </div>
  );
}

export default LoginWindow;
