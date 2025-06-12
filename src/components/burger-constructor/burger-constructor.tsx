import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectOrderRequest,
  selectConstructorBurger,
  selectOrderModalData,
  fetchNewOrder,
  closeOrderRequest,
  selectIsAuthenticated
} from '../../slices/burgerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const orderRequest = useSelector(selectOrderRequest);
  const constructorItems = useSelector(selectConstructorBurger);
  const orderModalData = useSelector(selectOrderModalData);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        fetchNewOrder([
          constructorItems.bun._id,
          ...ingredientsIds,
        ])
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
