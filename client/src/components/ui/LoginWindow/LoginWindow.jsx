import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { close } from '../Modal/modalSlice';
import Field from './Field/Field';
import css from './LoginWindow.module.css';
import RequestStageInterface from './RequestStageInterface/RequestStageInterface';
import { useAuthenticationMutation } from '../../../api/apiSlice';


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
  const [authData, setAuthData] = useState(setFormFieldInitialState(''));
  const [requestStage, setRequestStage] = useState(0);
  const dispatch = useDispatch();
  const [authentication, { isLoading }] = useAuthenticationMutation();

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
    setRequestStage(1);
    authentication(authData).unwrap()
      .then(res => {
        // console.log(res)
        if (res) closeModal();
        else setRequestStage(4);
      })
      .catch(err => {console.log(err); setRequestStage(3)})
    ;
  }

  function closeModal(e) {
    setRequestStage(0);
    dispatch(close());
  }


  return (
    <div className={css.container}>
      { requestStage
        ?
        <RequestStageInterface stage={requestStage} handleClick={closeModal} />
        :
        <form onSubmit={handleFormSubmit}>
          {fields.map((f) => {
            return <Field {...f} key={f.id}
              value={authData[f.id]}
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
