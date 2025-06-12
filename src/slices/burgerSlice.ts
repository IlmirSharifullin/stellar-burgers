import {
  TLoginData,
  getIngredientsApi,
  loginUserApi,
  orderBurgerApi
} from '@api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TConstructorBurger, TIngredient, TOrder} from '@utils-types';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  constructorBurger: TConstructorBurger;
  orderRequest: boolean;
  errorText: string;
};

const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderModalData: null,
  constructorBurger: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  orderRequest: false,
  errorText: ''
};

const burgerSlice = createSlice({
  name: 'stellarBurger',
  initialState,
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorBurger: (state) => state.constructorBurger,
    selectOrderRequest: (state) => state.orderRequest,
    selectErrorText: (state) => state.errorText
  },
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type !== 'bun') {
        state.constructorBurger.ingredients.push(action.payload);
      } else {
        state.constructorBurger.bun = action.payload;
      }
    },
    makeOrderRequest(state, action: PayloadAction<TOrder>) {
      state.orderModalData = action.payload;
      state.orderRequest = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchNewOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);


export const {
  selectLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorBurger,
  selectOrderRequest,
  selectErrorText
} = burgerSlice.selectors;
export const {addIngredient, makeOrderRequest} = burgerSlice.actions;
export default burgerSlice.reducer;
