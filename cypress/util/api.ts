export const registerIntercept = (api: string, alias: string) => {
  cy.intercept('GET', Cypress.env().api_url + api).as(alias);
  return '@' + alias;
};
