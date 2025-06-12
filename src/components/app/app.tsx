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
import {Routes, Route} from 'react-router-dom';
import {AppHeader, IngredientDetails, OrderInfo} from '@components';

const App = () => (
  <Routes>
    <Route
      path='*'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <NotFound404/>
        </div>
      }
    />
    <Route
      path='/'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <ConstructorPage/>
        </div>
      }
    />
    <Route
      path='/login'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <Login/>
        </div>
      }
    />
    <Route
      path='/register'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <Register/>
        </div>
      }
    />
    <Route
      path='/forgot-password'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <ForgotPassword/>
        </div>
      }
    />
    <Route
      path='/reset-password'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <ResetPassword/>
        </div>
      }
    />
    <Route
      path='/profile'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <Profile/>
        </div>
      }
    />
    <Route
      path='/feed'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <Feed/>
        </div>
      }
    />
    <Route
      path='/feed/:number'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <OrderInfo/>
        </div>
      }
    />
    <Route
      path='/ingredients/:id'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <IngredientDetails/>
        </div>
      }
    />
    <Route
      path='/profile/orders'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <ProfileOrders/>
        </div>
      }
    />
    <Route
      path='/profile/orders/:number'
      element={
        <div className={styles.app}>
          <AppHeader/>
          <OrderInfo/>
        </div>
      }
    />
  </Routes>
);

export default App;
