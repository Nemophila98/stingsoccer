import { faker } from '@faker-js/faker';
import { contains } from 'cypress/types/jquery';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://stingsoccer.dev.thesportcheck.com');
    cy.contains('p', 'Create An Account').click();
    const fname = faker.person.firstName();
    const lName = faker.person.lastName();
    const phone = faker.phone.number();
    const address1 = faker.location.secondaryAddress();
    const city = faker.location.city();
    const email = faker.internet.email({ provider: 'yopmail.com' });
    const zipcode = faker.location.zipCode();
    const password = faker.internet.password({ length: 8, memorable: false, pattern: /[A-Za-z0-9]/ });

    cy.get('[name=firstName]').type(fname);
    cy.get('[name=lastName]').type(lName);
    cy.get('[name=email]').type(lName);
    cy.get('[name=address1]').type(address1);
    cy.get('[type=tel]').first().clear().type(phone);
    cy.get('[name=email]').type('zxc112n+1@yopmail.com');
    cy.get('[name=city]').type(city);
    cy.get('[name=state]').first().select('Arizona');
    cy.get('[name=zipCode]').first().type(zipcode);
    cy.get('[name=occupationId]').first().prev().click();
    cy.contains('div', 'TEACHER').click();
    cy.get('[name=secondaryFirstName]').type(fname);
    cy.get('[name=secondaryLastName]').type(lName);
    cy.get('[type=tel]').eq(2).clear().type(phone);
    cy.get('[name=secondaryAddress1]').type(address1);
    cy.get('[name=secondaryEmail]').type(email);
    cy.get('[name=secondaryCity]').type(city);
    cy.get('[name=secondaryState]').first().select('Colorado');
    cy.get('[name=secondaryZipCode]').first().type(zipcode);
    cy.get('[name=password').type(password);
    cy.get('[name=verfiyPassword').type(password);
    cy.get('[type=submit]').click();

  });  
  it('navigates to example.cypress.io and runs additional commands', () => {
    cy.visit('https://stingsoccer.dev.thesportcheck.com');
    cy.visit('https://yopmail.com'); // visit a different superdomain
    cy.origin('https://yopmail.com', () => {
      cy.get('[placeholder="Enter your inbox here"]').type('zxc112n+1@yopmail.com');
      cy.get('#refreshbut').click();
      cy.get('iframe[id="ifmail"]').its('0.contentDocument').find('a').contains('Verify Email').click();
    });
  });
});
