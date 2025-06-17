import {FC, SyntheticEvent, useState} from 'react';
import {LoginUI} from '@ui-pages';
import {useAppDispatch, useAppSelector} from '../../services/store';
import {selectErrorText, fetchLoginUser, getUserThunk} from '../../slices/burgerSlice';

export const Login: FC = () => {
  const dispatch= useAppDispatch();
  const errorText = useAppSelector(selectErrorText);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password })).then(() =>
      dispatch(getUserThunk())
    );
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
