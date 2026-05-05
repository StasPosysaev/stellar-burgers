describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });
    cy.setCookie('accessToken', 'fake-token');
    localStorage.setItem('refreshToken', 'fake-refresh');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('добавление ингредиента в конструктор', () => {
    cy.contains('Добавить').first().click();
  });

  it('открытие модального окна ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();
  });

  it('закрытие модального окна по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('#modals button').click();
  });

  it('создание заказа', () => {
    cy.contains('Добавить').first().click();
    cy.contains('Оформить заказ').click();
  });
});
