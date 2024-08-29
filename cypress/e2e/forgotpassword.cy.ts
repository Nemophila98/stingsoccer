// import account from '../fixtures/account.json';

// const email1 = account.email;
const email1 = 'zxc112n@yopmail.com';

// const password = account.password;
describe('Forgot Password', () => {
  it('passes', () => {
    // Open forgot password page from the Login page
    // cy.visit('/');
    // cy.contains('p', 'Forgot Password?').click();
    // const email = 'zxc112n@yopmail.com';
    // cy.get('[name=email]').type(email);
    // cy.contains('button', 'Continue').click();

    cy.origin('https://yopmail.com', { args: { email1 } }, ({ email1 }) => {
      cy.visit('/');
      cy.get('#login').type(email1);
      cy.get('#refreshbut>button').click();
      //   cy.wait(2000);
      cy.get('#refresh').click();

      cy.reload();
      cy.get('iframe').then($iframe => {
        const iframeContent = $iframe.contents().find('body');
        cy.wrap(iframeContent)
          .find('a')
          .each((item, index) => {
            if (index === 1) {
              const att = item.attr('href');
              cy.visit((att || '').replace('http', 'https'));
              //  cy.request(URL: att);

              // cy.get('a').should('contain','forgot-password');
            }
          });
      });
    });
  });
});
