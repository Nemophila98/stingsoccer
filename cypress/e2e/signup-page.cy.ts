import { faker } from '@faker-js/faker';

const fname = faker.person.firstName();
const lName = faker.person.lastName();
const email = faker.internet.email({ provider: 'yopmail.com', firstName: fname, lastName: lName });
const phone = faker.phone.number();
const address1 = faker.location.secondaryAddress();
const city = faker.location.city();
const zipcode = faker.location.zipCode();
const password = '123456@aA';
describe('template spec', () => {
  it('passes', () => {
    //Open sign up page from the Login page
    cy.visit('/');
    cy.contains('p', 'Create An Account').click();

    //Fill date to form sign up page
    cy.get('[name=firstName]').type(fname);
    cy.get('[name=lastName]').type(lName);
    cy.get('[name=email]').type(lName);
    cy.get('[name=address1]').type(address1);
    cy.get('[type=tel]').first().clear().type(phone);
    cy.get('[name=email]').type(email);
    cy.get('[name=city]').type(city);
    cy.get('[name=state]').first().select('AL');
    cy.get('[name=zipCode]').first().type(zipcode);
    cy.get('[name=occupationId]').first().prev().click();
    cy.contains('div', 'TEACHER').click();
    cy.get('[name=secondaryFirstName]').type(fname);
    cy.get('[name=secondaryLastName]').type(lName);
    cy.get('[type=tel]').eq(2).clear().type(phone);
    cy.get('[name=secondaryAddress1]').type(address1);
    cy.get('[name=secondaryEmail]').type(email);
    cy.get('[name=secondaryCity]').type(city);
    cy.get('[name=secondaryState]').first().select('AZ');
    cy.get('[name=secondaryZipCode]').first().type(zipcode);
    cy.get('[name=password').type(password);
    cy.get('[name=verfiyPassword').type(password);
    cy.contains('button', 'Register').click();
    cy.url().should('contain', '/login');

    cy.origin('https://yopmail.com', { args: { email } }, ({ email }) => {
      cy.visit('/');
      cy.get('#login').type(email);
      cy.get('#refreshbut>button').click();

      cy.get('iframe').then($iframe => {
        const iframeContent = $iframe.contents().find('body');
        cy.wrap(iframeContent)
          .find('a')
          .each((item, index) => {
            if (index === 1) {
              const att = item.attr('href');
              cy.visit((att || '').replace('http', 'https'));
            }
          });
      });
    });

    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.contains('button', 'Sign in').click();
  });
});
