import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUI } from '@ui-pages';
import {fetchRegisterUser, selectErrorText} from '../../slices/burgerSlice';
import { AppDispatch } from '../../services/store';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const errorText = useSelector(selectErrorText);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegisterUser({ email, password, name: userName }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
