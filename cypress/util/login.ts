export const login = (email: string, password: string) => {
  cy.visit('/');
  cy.contains('button', 'Sign in').click();
  cy.get('[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.contains('button', 'Sign in').click();
};
export const loginSection = (email: string, password: string) => {
  cy.session(email, () => {
    login(email, password);
  });
};
