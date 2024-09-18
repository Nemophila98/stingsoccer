import { loginSection } from '../../util/login';

const classificationName1 = 'Classification A';
const classificationName2 = 'Classification B';
const classificationNameEdited = 'Classification C';

describe('Classification', () => {
  it('Classification', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.get('[type=button]').contains('span', 'MORE').click({ force: true });
    cy.contains('a', 'CLASSIFICATIONS').click({ force: true });
    addClassification();
    addSecondClassification();
    editClassificationNameExist();
    editClassificationSuccess();
    deleteClassification();
  });

  const addClassification = () => {
    //Add classification then cancel without enter data
    cy.contains('button', 'ADD CLASSIFICATION').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD CLASSIFICATION').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add division with input name then cancel "No"
    cy.contains('button', 'ADD CLASSIFICATION').click();
    cy.get('[name=name]').type(classificationName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a classification
    cy.contains('button', 'ADD CLASSIFICATION').click();
    cy.get('[name=name]').type(classificationName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').last().click();
    cy.contains('div', 'Added classification successfully');
    cy.log('Added classification A');
  };

  const addSecondClassification = () => {
    cy.contains('button', 'ADD CLASSIFICATION').click();
    cy.get('[name=name]').type(classificationName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Added classification successfully');
    cy.log('Added classification B');
    return false;
  };

  const editClassificationNameExist = () => {
    cy.reload();
    cy.log('Edit classification A -> B');

    cy.get('[role=rowgroup]')
      .find('td')
      .contains(classificationName1)
      .each(classification => {
        const classification1 = classification.text();
        if (classification1 === classification1) {
          cy.wrap(classification).parents('tr').find('td').eq(2).find('a').click({ force: true });
        }
      });
    cy.get('input[name="name"]').as('classificationName').clear();
    cy.get('@classificationName').type(classificationName2);
    cy.contains('button', 'Save').first().click();
    cy.contains('div', 'Update classification successfully');
    cy.log('Edit classification A -> B done');
    return true;
  };

  const editClassificationSuccess = () => {
    cy.log('Edit classification B -> C');

    cy.reload();
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(classificationName2)
      .each(classification => {
        const classification1 = classification.text();
        if (classification1 === classification1) {
          cy.wrap(classification).parents('tr').find('td').eq(2).find('a').click({ force: true });
        }
      });
    cy.get('input[name="name"]').as('classificationName').clear();
    cy.get('@classificationName').type(classificationNameEdited);
    cy.contains('button', 'Save').first().click();
    cy.contains('div', 'Update classification successfully');
    cy.log('Edit classification B -> C done');
    return false;
  };

  const deleteClassification = () => {
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(classificationNameEdited)
      .each(classification => {
        const classificationNameEdited = classification.text();
        if (classificationNameEdited === classificationNameEdited) {
          cy.wrap(classification).parents('tr').find('td').eq(2).find('svg').eq(1).click({ force: true });
          cy.get('[type="submit"]').first().click();
        }
      });
    cy.reload();
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(classificationName2)
      .each(classification => {
        const classification2 = classification.text();
        if (classification2 === classification2) {
          cy.wrap(classification).parents('tr').find('td').eq(2).find('svg').eq(1).click({ force: true });
          cy.get('[type="submit"]').first().click();
        }
      });
    return true;
  };
});
