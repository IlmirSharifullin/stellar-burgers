import { selectIsAuthChecked } from '../../slices/burgerSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  if (isAuthChecked && unAuthOnly) {
    return <Navigate to='/' />;
  }

  if (!isAuthChecked) {
    return <Navigate to='/login' />;
  }

  return children;
};
