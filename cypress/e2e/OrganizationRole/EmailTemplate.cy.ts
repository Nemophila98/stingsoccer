import { loginSection } from '../../util/login';
const templateName = 'template test+';
const subject = 'subject text';
const content = 'text content';

describe('EmailTemplate', () => {
  it('EmailTemplate', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'EMAIL TEMPLATES').click();
    addTemplateThenCancel();
    editTemplate();
    deleteTemplate();
  });

  const addTemplateThenCancel = () => {
    //Add template then cancel without enter data
    cy.contains('button', 'ADD EMAIL TEMPLATES').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD EMAIL TEMPLATES').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('p', 'Please enter subject').should('be.visible');
    cy.contains('p', 'Please enter body').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add division with input name then cancel "No"
    cy.contains('button', 'ADD EMAIL TEMPLATES').click();
    cy.get('[name=name]').type(templateName);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a template
    cy.contains('button', 'ADD EMAIL TEMPLATES').click();
    cy.get('[name=name]').type(templateName);
    cy.get('[name=subject]').type(subject);
    cy.get('#textArea').type(content);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').last().click();

    cy.on('uncaught:exception', (e, runnable) => {
      console.log('error', e);
      console.log('runnable', runnable);
      Cypress.log({ message: 'some message' });
      return false;
    });
  };

  const editTemplate = () => {
    cy.get('[name=query]').type(templateName);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(templateName)
      .each(template => {
        const templateName = template.text();
        if (templateName === templateName) {
          cy.wrap(template).parents('tr').find('td').eq(2).find('a').click();
        }
        cy.get('[name=name]').as('name').clear();
        cy.get('@name').type(templateName);
        cy.get('[name=subject]').as('subject').clear();
        cy.get('@subject').type(subject);
        cy.get('#textArea').as('content').clear();
        cy.get('@content').type(content);
        cy.contains('button', 'Save').click();
      });
  };

  const deleteTemplate = () => {
    cy.get('[name=query]').clear().type(templateName);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(templateName)
      .each(template => {
        const templateItem = template.text();
        if (templateItem === templateItem) {
          cy.wrap(template).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
  };
});
