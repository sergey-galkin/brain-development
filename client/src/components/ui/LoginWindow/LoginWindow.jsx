import React, { useContext, useState } from 'react';
import { login } from '../../../api/dbRequest';
import { ModalContext } from '../../../contex';
import { regValidation } from '../../../libs/validation';
import Field from './Field/Field';
import css from './LoginWindow.module.css';
import RequestStageInterface from './RequestStageInterface/RequestStageInterface';


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

const LoginWindow = () => {
  const [loginData, setLoginData] = useState(setFormFieldInitialState(''));
  const [requestStage, setRequestStage] = useState({index: 0, data: ''});
  const modal = useContext(ModalContext);

  function handleFormFieldChange(e) {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // const loginData = {
    //   login: 'Johny',
    //   password: 'aaaaA1!',
    // };
    setRequestStage(1);
    login(loginData)
      .then(res => {
        console.log(res)
        if (res.data.status) closeModal();
        else setRequestStage({index: 4});
      })
      .catch(err => {console.log(err); setRequestStage(3)})
    ;
  }

  function closeModal(e) {
    setRequestStage({index: 0, data: ''});
    modal.update();
  }


  return (
    <div className={css.container}>
      { requestStage.index  
        ?
        <RequestStageInterface stage={requestStage} handleClick={closeModal} />
        :
        <form onSubmit={handleFormSubmit}>
          {fields.map((f) => {
            return <Field {...f} key={f.id}
              value={loginData[f.id]}
              onChange={handleFormFieldChange}
            />;
          })}
          <input type="submit" className={css.btn} value='Войти' />
        </form>
      }
    </div>
  );
}

export default LoginWindow;
