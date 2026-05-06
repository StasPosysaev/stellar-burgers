import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

export const rootReducer = (state: any = undefined, action: any) => ({
  ingredients: ingredientsReducer(state?.ingredients, action),
  burgerConstructor: constructorReducer(state?.burgerConstructor, action),
  feed: feedReducer(state?.feed, action),
  orders: ordersReducer(state?.orders, action),
  user: userReducer(state?.user, action),
  order: orderReducer(state?.order, action),
  orderDetails: orderDetailsReducer(state?.orderDetails, action)
});

const rootReducerObject = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer
};

const store = configureStore({
  reducer: rootReducerObject,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = dispatchHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
