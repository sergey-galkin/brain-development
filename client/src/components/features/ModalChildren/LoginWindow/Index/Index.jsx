import React, { useMemo, useState } from 'react';
import Field from '../Field/Field';
import css from './Index.module.css';
import RequestStageInterface from '../../RequestStageInterface/RequestStageInterface';
import additionalStages from "../requestStages";
import ModalWindowButton from '../../../Buttons/CSSButtons/ModalWindowButton/ModalWindowButton';
import { useCallback } from 'react';
import { authentication } from '../../../../../api/fakeServer/fakeServer';

const LoginWindow = ({ closeModal }) => {
  const fields = useMemo(() => [
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
  ], []);
  
  const setFormFieldInitialState = useCallback((value) => {
    const state = {};
    fields.forEach((f) => state[f.id] = value);
    return state;
  }, []);

  const [authData, setAuthData] = useState(setFormFieldInitialState(''));
  const [requestStage, setRequestStage] = useState({index: 0, data: ''});

  const handleFormFieldChange = useCallback((e) => {
    setAuthData(p => ({...p, [e.target.id]: e.target.value}));
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    setRequestStage({index: 1, data: ''});
    authentication(authData)
      .then(res => {
        if (res.status) closeModal();
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
          <ModalWindowButton type="submit">
            Войти
          </ModalWindowButton>
        </form>
      }
    </div>
  );
}

export default LoginWindow;
