import feedReducer, { fetchFeeds, FeedState } from '../feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    number: 12345,
    ingredients: []
  }
];

describe('feedSlice', () => {
  const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeeds', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: { orders: mockOrders, total: 100, totalToday: 5 }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(5);
      expect(state.error).toBeNull();
    });

    it('должен обрабатывать rejected состояние', () => {
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка загрузки ленты' }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты');
    });
  });
});
