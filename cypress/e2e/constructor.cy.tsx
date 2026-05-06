/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json', delayMs: 500 }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json', delayMs: 100 }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json', delayMs: 2000 }).as('createOrder');

    cy.setCookie('accessToken', 'fake-access-token');
    localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 30000 });
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  // ========== ТЕСТ 1: РАБОТА КОНСТРУКТОРА ==========
  describe('Работа конструктора', () => {
    it('должен добавлять ингредиент в конструктор', () => {
      cy.contains('Краторная булка N-200i', { timeout: 30000 })
        .parents('li')
        .contains('Добавить')
        .click();

      cy.contains('Краторная булка N-200i (верх)', { timeout: 30000 }).should('exist');
      cy.contains('Краторная булка N-200i (низ)', { timeout: 30000 }).should('exist');

      cy.contains('Биокотлета из марсианской Магнолии', { timeout: 30000 })
        .parents('li')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии', { timeout: 30000 }).should('exist');
    });
  });

  // ========== ТЕСТ 2: МОДАЛЬНЫЕ ОКНА ==========
  describe('Работа модального окна ингредиента', () => {
    it('должен открывать модальное окно с правильными данными ингредиента', () => {
      cy.contains('Краторная булка N-200i', { timeout: 30000 }).click();

      cy.get('#modals', { timeout: 30000 }).should('exist');
      cy.get('#modals').contains('Краторная булка N-200i').should('exist');
      cy.get('#modals').contains('420', { timeout: 30000 }).should('exist');
    });

    it('должен закрывать модальное окно по клику на крестик', () => {
      cy.contains('Краторная булка N-200i', { timeout: 30000 }).click();
      cy.get('#modals', { timeout: 30000 }).should('exist');

      cy.get('#modals button').click();

      cy.url({ timeout: 30000 }).should('eq', 'http://localhost:4000/');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i', { timeout: 30000 }).click();
      cy.get('#modals', { timeout: 30000 }).should('exist');

      // Кликаем в позиции вне модального окна (левый верхний угол)
      cy.get('body').click(10, 10);

      cy.url({ timeout: 30000 }).should('eq', 'http://localhost:4000/');
    });
  });

  // ========== ТЕСТ 3: ОФОРМЛЕНИЕ ЗАКАЗА ==========
  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.contains('Краторная булка N-200i', { timeout: 30000 })
        .parents('li')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии', { timeout: 30000 })
        .parents('li')
        .contains('Добавить')
        .click();
    });

    it('должен создавать заказ и очищать конструктор', () => {
      cy.contains('Оформить заказ', { timeout: 30000 }).click();
      cy.wait('@createOrder', { timeout: 120000 });
      
      cy.get('#modals', { timeout: 60000 }).should('be.visible');
      cy.get('#modals').contains('54321', { timeout: 60000 }).should('exist');
      
      cy.get('#modals button').click();
      
      // Даём время на анимацию
      cy.wait(3000);
      
      // Проверяем, что элементов с классом constructor-element нет
      cy.get('[class*="constructor-element"]', { timeout: 10000 }).should('have.length', 0);
      
      // Или проверяем, что есть сообщение "Выберите булки"
      cy.contains('Выберите булки', { timeout: 5000 }).should('exist');
    });
  });
});
