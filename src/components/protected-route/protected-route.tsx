import { selectIsAuthenticated, selectIsInit } from '../../slices/burgerSlice';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import {Preloader} from "@ui";
import {useAppSelector} from "../../services/store";

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthOnly = false
}: ProtectedRouteProps) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInit = useAppSelector(selectIsInit);
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
