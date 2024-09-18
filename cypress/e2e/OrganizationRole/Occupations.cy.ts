import { loginSection } from '../../util/login';

const occupationName1 = 'occupation 1';
const occupationName2 = 'occupation 2';
const occupationNameEdited = 'occupation 4';

describe('occupation', () => {
  it('occupation', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'OCCUPATIONS').click();

    addoccupationThenCancel();
    catchErroroccupationnExist();
    addSecondoccupation();
    editoccupationNameExist();
    editoccupationSuccess();
    deleteoccupation();
  });

  const addoccupationThenCancel = () => {
    //Add occupation then cancel without enter data
    cy.contains('button', 'ADD OCCUPATION').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD OCCUPATION').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    cy.contains('button', 'ADD OCCUPATION').click();
    cy.get('[name=name]').type(occupationName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a occupation
    cy.contains('button', 'ADD OCCUPATION').click();
    cy.get('[name=name]').type(occupationName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').eq(1).click();
    cy.contains('button', 'Cancel').click();
  };

  const catchErroroccupationnExist = () => {
    cy.contains('button', 'ADD OCCUPATION').click();
    cy.get('[name=name]').as('name').type(occupationName1);
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include('Occupation has existed');

      return false;
    });
    cy.contains('button', 'Save').click();
    cy.contains('button', 'Cancel').click();
  };

  const addSecondoccupation = () => {
    cy.contains('button', 'ADD OCCUPATION').click();
    cy.get('[name=name]').type(occupationName2);
    cy.contains('button', 'Save').click();
    cy.contains('button', 'Cancel').click();
    return false;
  };

  const editoccupationNameExist = () => {
    cy.get('[name=query]').clear().type(occupationName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(occupationName1)
      .each(occupation => {
        const occupation1 = occupation.text();
        if (occupation1 === occupation1) {
          cy.wrap(occupation).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('occupationName').clear();
    cy.get('@occupationName').type(occupationName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Occupation has existed');
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editoccupationSuccess = () => {
    cy.get('[name=query]').type(occupationName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(occupationName1)
      .each(occupation => {
        const occupation1 = occupation.text();
        if (occupation1 === occupation1) {
          cy.wrap(occupation).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('occupationName').clear();
    cy.get('@occupationName').type(occupationNameEdited);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Occupation is updated successfully.');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const deleteoccupation = () => {
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'OCCUPATIONS').click();
    cy.get('[name=query]').clear().type(occupationNameEdited);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(occupationNameEdited)
      .each(occupation => {
        const occupation2 = occupation.text();
        if (occupation2 === occupation2) {
          cy.wrap(occupation).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    cy.get('[name=query]').clear().type(occupationName2);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(occupationName2)
      .each(occupation => {
        const occupation2 = occupation.text();
        if (occupation2 === occupation2) {
          cy.wrap(occupation).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
          cy.contains('div', 'Occupation is deleted successfully.');
        }
      });
    return true;
  };
});
