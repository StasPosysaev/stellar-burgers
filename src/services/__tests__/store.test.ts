import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('должен правильно инициализировать начальное состояние', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('orderDetails');
  });

  it('должен возвращать то же состояние при неизвестном экшене', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const initState = rootReducer(undefined, { type: '@@INIT' });
    const state = rootReducer(initState, fakeAction);

    expect(state).toEqual(initState);
  });
});
