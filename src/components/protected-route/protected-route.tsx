import { selectIsAuthenticated, selectIsInit } from '../../slices/burgerSlice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import {Preloader} from "@ui";

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInit = useSelector(selectIsInit);
  const location = useLocation();

  if (!isInit) {
    return <Preloader />;
  }

  if (!unAuthOnly && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (unAuthOnly && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
