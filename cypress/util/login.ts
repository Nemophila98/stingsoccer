import account from '../fixtures/account.json';
export const login = (email?: string, password?: string) => {
  const mail = email || account.email;
  const pass = password || account.password;
  cy.visit('/');
  cy.contains('button', 'Sign in').click();
  cy.get('[name="email"]').type(mail);
  cy.get('[name="password"]').type(pass);
  cy.contains('button', 'Sign in').click();
  cy.contains('Outstanding Balance').should('be.visible');
};

export const loginSection = (email?: string, password?: string) => {
  const mail = email || account.email;
  cy.session(mail, () => {
    login(email, password);
  });
};
