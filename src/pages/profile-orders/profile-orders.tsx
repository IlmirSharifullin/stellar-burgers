import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  fetchUserOrders,
  fetchIngredients,
  removeUserOrders,
  selectUserOrders
} from '../../slices/burgerSlice';


export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(removeUserOrders());
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
  }, []);
  const orders: TOrder[] = useAppSelector(selectUserOrders);

  if (orders.length) {
    return <ProfileOrdersUI orders={orders}/>;
  }

  return <Preloader />;
};
