import { login } from '../util/login';
import account from '../fixtures/account.json';

describe('Profile', () => {
  it('Edit Profile', () => {
    cy.visit('/');
    cy.viewport(1920, 1080);
    login(account.email, account.password);
    cy.contains('Outstanding Balance').should('be.visible');
  });
});
