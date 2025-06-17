import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { selectOrders, fetchFeed, removeOrders, fetchIngredients} from '../../slices/burgerSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(removeOrders());
        dispatch(fetchFeed());
      }}
    />
  );};
