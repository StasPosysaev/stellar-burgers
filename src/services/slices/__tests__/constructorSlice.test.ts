import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  ConstructorState
} from '../constructorSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

// Моковый ингредиент
const mockIngredient: TIngredient = {
  _id: 'test-id-1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'test.jpg',
  image_large: 'test-large.jpg',
  image_mobile: 'test-mobile.jpg'
};

const mockBun: TIngredient = {
  ...mockIngredient,
  _id: 'bun-id',
  type: 'bun',
  name: 'Test Bun'
};

describe('constructorSlice', () => {
  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };

  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addIngredient', () => {
    it('должен добавлять начинку в конструктор', () => {
      const action = addIngredient(mockIngredient);
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('test-id-1');
      expect(state.ingredients[0].id).toBeDefined(); // Проверяем, что добавился id
      expect(state.bun).toBeNull();
    });

    it('должен добавлять булку в конструктор (заменять существующую)', () => {
      // Добавляем первую булку
      let state = constructorReducer(initialState, addIngredient(mockBun));
      expect(state.bun?._id).toBe('bun-id');

      // Добавляем вторую булку
      const newBun = { ...mockBun, _id: 'bun-id-2', name: 'New Bun' };
      state = constructorReducer(state, addIngredient(newBun));

      expect(state.bun?._id).toBe('bun-id-2');
      expect(state.bun?.name).toBe('New Bun');
      expect(state.ingredients).toHaveLength(0);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалять ингредиент из конструктора', () => {
      // Сначала добавляем ингредиент
      const addAction = addIngredient(mockIngredient);
      let state = constructorReducer(initialState, addAction);
      expect(state.ingredients).toHaveLength(1);

      const ingredientId = state.ingredients[0].id;
      const removeAction = removeIngredient(ingredientId);
      state = constructorReducer(state, removeAction);

      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалять другие ингредиенты', () => {
      // Добавляем два ингредиента
      let state = constructorReducer(initialState, addIngredient(mockIngredient));
      const secondIngredient = { ...mockIngredient, _id: 'test-id-2' };
      state = constructorReducer(state, addIngredient(secondIngredient));

      expect(state.ingredients).toHaveLength(2);

      const ingredientId = state.ingredients[0].id;
      state = constructorReducer(state, removeIngredient(ingredientId));

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('test-id-2');
    });
  });

  describe('moveIngredient', () => {
    it('должен перемещать ингредиент вверх', () => {
      // Добавляем три ингредиента
      let state = constructorReducer(initialState, addIngredient(mockIngredient));
      const secondIngredient = { ...mockIngredient, _id: 'test-id-2', name: 'Second' };
      state = constructorReducer(state, addIngredient(secondIngredient));
      const thirdIngredient = { ...mockIngredient, _id: 'test-id-3', name: 'Third' };
      state = constructorReducer(state, addIngredient(thirdIngredient));

      const idsBefore = state.ingredients.map(i => i._id);
      expect(idsBefore).toEqual(['test-id-1', 'test-id-2', 'test-id-3']);

      // Перемещаем ингредиент с позиции 2 на позицию 1
      state = constructorReducer(state, moveIngredient({ from: 2, to: 1 }));

      const idsAfter = state.ingredients.map(i => i._id);
      expect(idsAfter).toEqual(['test-id-1', 'test-id-3', 'test-id-2']);
    });

    it('должен перемещать ингредиент вниз', () => {
      let state = constructorReducer(initialState, addIngredient(mockIngredient));
      const secondIngredient = { ...mockIngredient, _id: 'test-id-2' };
      state = constructorReducer(state, addIngredient(secondIngredient));
      const thirdIngredient = { ...mockIngredient, _id: 'test-id-3' };
      state = constructorReducer(state, addIngredient(thirdIngredient));

      // Перемещаем ингредиент с позиции 0 на позицию 1
      state = constructorReducer(state, moveIngredient({ from: 0, to: 1 }));

      const ids = state.ingredients.map(i => i._id);
      expect(ids).toEqual(['test-id-2', 'test-id-1', 'test-id-3']);
    });
  });

  describe('resetConstructor', () => {
    it('должен очищать конструктор', () => {
      // Добавляем ингредиенты
      let state = constructorReducer(initialState, addIngredient(mockBun));
      state = constructorReducer(state, addIngredient(mockIngredient));
      state = constructorReducer(state, addIngredient(mockIngredient));

      expect(state.bun).not.toBeNull();
      expect(state.ingredients).toHaveLength(2);

      state = constructorReducer(state, resetConstructor());

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
