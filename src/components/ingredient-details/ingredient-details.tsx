import { FC, useEffect } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../slices/burgerSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!params.id) {
      navigate('/', { replace: true });
    }
  }, []);

  const ingredients = useAppSelector(selectIngredients);
  const ingredientData = ingredients.find((item) => item._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
