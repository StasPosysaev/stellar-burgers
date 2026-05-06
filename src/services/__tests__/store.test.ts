import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import feedReducer from '../slices/feedSlice';
import ordersReducer from '../slices/ordersSlice';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import orderDetailsReducer from '../slices/orderDetailsSlice';

const rootReducerObject = {
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer
};

const rootReducer = (state: any = undefined, action: any) => ({
  ingredients: ingredientsReducer(state?.ingredients, action),
  burgerConstructor: constructorReducer(state?.burgerConstructor, action),
  feed: feedReducer(state?.feed, action),
  orders: ordersReducer(state?.orders, action),
  user: userReducer(state?.user, action),
  order: orderReducer(state?.order, action),
  orderDetails: orderDetailsReducer(state?.orderDetails, action)
});

describe('rootReducer', () => {
  it('должен возвращать начальное состояние при неизвестном экшене', () => {
    const expectedState = {
      ingredients: ingredientsReducer(undefined, { type: 'unknown' }),
      burgerConstructor: constructorReducer(undefined, { type: 'unknown' }),
      feed: feedReducer(undefined, { type: 'unknown' }),
      orders: ordersReducer(undefined, { type: 'unknown' }),
      user: userReducer(undefined, { type: 'unknown' }),
      order: orderReducer(undefined, { type: 'unknown' }),
      orderDetails: orderDetailsReducer(undefined, { type: 'unknown' })
    };

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(expectedState);
  });
});
