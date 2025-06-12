import {
  TLoginData,
  TRegisterData,
  getFeedsApi,
  getIngredientsApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  getOrdersApi,
  loginUserApi,
  orderBurgerApi,
  registerUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorBurger, TIngredient, TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  orderModalData: TOrder | null;
  constructorBurger: TConstructorBurger;
  orderRequest: boolean;
  errorText: string;
  isAuthenticated: boolean;
  isInit: boolean;
  isModalOpen: boolean;
  user: TUser;
  orders: TOrder[];
  userOrders: TOrder[];
  totalOrders: number;
  ordersToday: number;
};

const initUser: TUser = {
  name: '',
  email: ''
};

const initContructorBurger = {
  bun: {
    price: 0
  },
  ingredients: []
};

const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  orderModalData: null,
  constructorBurger: initContructorBurger,
  orderRequest: false,
  errorText: '',
  isAuthenticated: false,
  isInit: false,
  isModalOpen: false,
  user: initUser,
  orders: [],
  userOrders: [],
  totalOrders: 0,
  ordersToday: 0
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorBurger.bun = action.payload;
      } else {
        state.constructorBurger.ingredients.push(action.payload);
      }
    },
    deleteIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredientIndex = state.constructorBurger.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      state.constructorBurger.ingredients =
        state.constructorBurger.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    closeOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.constructorBurger = initContructorBurger;
    },
    init(state) {
      state.isInit = true;
    },
    removeOrders(state) {
      state.orders.length = 0;
    },
    removeUserOrders(state) {
      state.userOrders.length = 0;
    },
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorBurger: (state) => state.constructorBurger,
    selectOrderRequest: (state) => state.orderRequest,
    selectErrorText: (state) => state.errorText,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsInit: (state) => state.isInit,
    selectIsModalOpen: (state) => state.isModalOpen,
    selectUser: (state) => state.user,
    selectOrders: (state) => state.orders,
    selectTotalOrders: (state) => state.totalOrders,
    selectTodayOrders: (state) => state.ordersToday,
    selectUserOrders: (state) => state.userOrders
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
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message) {
          state.errorText = action.error.message;
        }
      })
      .addCase(fetchRegisterUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = initUser;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuthenticated = true;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.total;
        state.ordersToday = action.payload.totalToday;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
          state.user = initUser;
          state.isAuthenticated = false;
        }
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user.name = action.payload.user.name;
          state.user.email = action.payload.user.email;
        }
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);


export const getUserThunk = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const fetchUserOrders = createAsyncThunk('user/orders', async () =>
  getOrdersApi()
);

export const fetchFeed = createAsyncThunk('user/feed', async () =>
  getFeedsApi()
);

export const fetchLogout = createAsyncThunk('user/logout', async () =>
  logoutApi()
);



export const {
  selectLoading,
  selectIngredients,
  selectOrderModalData,
  selectConstructorBurger,
  selectOrderRequest,
  selectErrorText,
  selectIsAuthenticated,
  selectIsInit,
  selectIsModalOpen,
  selectUser,
  selectOrders,
  selectUserOrders,
  selectTodayOrders,
  selectTotalOrders
} = burgerSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  init,
  closeOrderRequest,
  removeOrders,
  removeUserOrders,
  openModal,
  closeModal
} =
  burgerSlice.actions;
export default burgerSlice.reducer;
