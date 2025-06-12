import {FC, SyntheticEvent, useState} from 'react';
import {LoginUI} from '@ui-pages';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../services/store';
import {selectErrorText, fetchLoginUser, getUserThunk} from '../../slices/burgerSlice';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const errorText = useSelector(selectErrorText);

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
