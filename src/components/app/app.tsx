import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import {
  AppHeader,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import {
  fetchFeed,
  fetchIngredients,
  getUserThunk,
  init
} from '../../slices/burgerSlice';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const token = getCookie('accessToken');
    dispatch(fetchFeed());
    if (token) {
      dispatch(getUserThunk());
      dispatch(fetchIngredients());
    } else {
      dispatch(init());
    }
  }, []);

  return (
    <Routes>
      <Route
        path='*'
        element={
          <div className={styles.app}>
            <AppHeader />
            <NotFound404 />
          </div>
        }
      />
      <Route
        path='/'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ConstructorPage />
          </div>
        }
      />
      <Route
        path='/login'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Login />
          </div>
        }
      />
      <Route
        path='/register'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Register />
          </div>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ForgotPassword />
          </div>
        }
      />
      <Route
        path='/reset-password'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ResetPassword />
          </div>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <div className={styles.app}>
              <AppHeader />
              <Profile />
            </div>
          </ProtectedRoute>
        }
      />
      <Route
        path='/feed'
        element={
          <div className={styles.app}>
            <AppHeader />
            <Feed />
          </div>
        }
      />
      <Route
        path='/feed/:number'
        element={
          <div className={styles.app}>
            <AppHeader />
            <OrderInfo />
          </div>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <div className={styles.app}>
            <AppHeader />
            <IngredientDetails />
          </div>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <div className={styles.app}>
            <AppHeader />
            <ProfileOrders />
          </div>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <div className={styles.app}>
              <AppHeader />
              <OrderInfo />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
