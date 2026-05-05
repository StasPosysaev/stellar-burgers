import orderReducer, {
  createOrder,
  closeOrderModal,
  OrderState
} from '../orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: 'order-123',
  status: 'done',
  name: 'Test Burger',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ing1', 'ing2']
};

describe('orderSlice', () => {
  const initialState: OrderState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('closeOrderModal', () => {
    it('должен очищать состояние модального окна', () => {
      const filledState: OrderState = {
        orderRequest: false,
        orderModalData: mockOrder,
        error: null
      };

      const state = orderReducer(filledState, closeOrderModal());

      expect(state.orderModalData).toBeNull();
      expect(state.orderRequest).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('createOrder', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
      expect(state.orderModalData).toBeNull();
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orderModalData).toBeNull();
    });
  });
});
