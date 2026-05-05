import store from '../store';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import ordersReducer from '../slices/ordersSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import orderDetailsReducer from '../slices/orderDetailsSlice';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при неизвестном экшене', () => {
    const initialState = {
      ingredients: ingredientsReducer(undefined, { type: 'unknown' }),
      burgerConstructor: constructorReducer(undefined, { type: 'unknown' }),
      feed: feedReducer(undefined, { type: 'unknown' }),
      orders: ordersReducer(undefined, { type: 'unknown' }),
      user: userReducer(undefined, { type: 'unknown' }),
      order: orderReducer(undefined, { type: 'unknown' }),
      orderDetails: orderDetailsReducer(undefined, { type: 'unknown' })
    };

    const state = store.getState();
    
    expect(state).toEqual(initialState);
  });
});
