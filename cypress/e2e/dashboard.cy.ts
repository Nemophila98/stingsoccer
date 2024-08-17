import { loginSection } from '../util/login';

describe('Dashboard Feature', () => {
  it('Navigate to Dashboard', () => {
    loginSection();
    cy.visit('/');
    cy.contains('Outstanding Balance').should('be.visible');
  });
});
