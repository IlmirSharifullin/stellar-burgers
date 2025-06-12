import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  fetchUserOrders,
  removeUserOrders,
  selectUserOrders
} from '../../slices/burgerSlice';


export const ProfileOrders: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    dispatch(fetchUserOrders());
  }, []);
  const orders: TOrder[] = useSelector(selectUserOrders);

  if (orders.length) {
    return <ProfileOrdersUI orders={orders}/>;
  }

  return <Preloader />;
};
