import { loginSection } from '../../util/login';
const division1 = 'Division 1';
const division2 = 'Division 2';
const divisionEditName = 'Division 4';

describe('Add Division', () => {
  it('Login passed', () => {
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.viewport(1440, 900);
    cy.contains('div', 'Configuration').click({ force: true });
    addDivisionthenCancel();
    addDivisionExist();
    addSecondDivision();
    editDivisonExistName();
    editDivisionSuccess();
    deleteDivision();
    filterStatus();
  });

  const addDivisionthenCancel = () => {
    //Add division then cancel without enter data
    cy.contains('button', 'ADD DIVISION').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD DIVISION').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add and cancel after inputed name
    cy.contains('button', 'ADD DIVISION').click();
    cy.get('[name=name]').type(division1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but submit "YES" -> Create a division
    cy.contains('button', 'ADD DIVISION').click();
    cy.get('[name=name]').type(division1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').eq(1).click();
  };

  const addDivisionExist = () => {
    cy.contains('button', 'ADD DIVISION').click();
    cy.get('[name=name]').type(division1);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The division already exists');
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const addSecondDivision = () => {
    cy.contains('button', 'ADD DIVISION').click();
    cy.get('[name=name]').as('name').type(division2);
    cy.get('select').select('North Texas');
    cy.contains('span', 'Select Directors').click();
    cy.get('input[type="checkbox"]').eq(1).check({ force: true }); //select a checkbox (fixed)
    cy.get('@name').click();
    cy.contains('span', 'Select Admin').click();
    cy.get('input[type="checkbox"]').eq(1).check({ force: true }); //select a checkbox (fixed)
    cy.get('@name').click();
    cy.contains('div[class="!mt-3"]', 'Active').click();
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Added division successfully');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const editDivisonExistName = () => {
    cy.get('[name=query]').clear().type(division1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(division1)
      .each(division => {
        const division1 = division.text();
        if (division1 === division1) {
          cy.contains('span', 'Active');
          cy.wrap(division).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('[name=name]').as('nameEdited').clear().type(division2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The division already exists');
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editDivisionSuccess = () => {
    cy.get('[name=query]').type(division1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(division1)
      .each(division => {
        const division1 = division.text();
        if (division1 === division1) {
          cy.wrap(division).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('[name=name]').as('nameEdited').clear().type(divisionEditName);
    cy.get('select').select('West Texas (Odessa)');
    cy.contains('span', 'Erin Medina').click();
    cy.get('input[type="checkbox"]').eq(3).check({ force: true }); //select a checkbox (fixed)
    cy.get('@nameEdited').click();
    cy.contains('span', 'Jack Lochkos').click();
    cy.get('input[type="checkbox"]').eq(3).check({ force: true }); //select a checkbox (fixed)
    cy.get('@nameEdited').click();
    cy.contains('div[class="!mt-3"]', 'Active').click();
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Update success!');
    cy.contains('button', 'Cancel').click();
    return false;
  };

  const deleteDivision = () => {
    cy.contains('div', 'Configuration').click({ force: true });
    // Delete a division
    cy.get('[name=query]').clear().type(divisionEditName);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(divisionEditName)
      .each(division => {
        const division1 = division.text();
        if (division1 === divisionEditName) {
          cy.contains('span', 'Inactive');
          cy.wrap(division).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });

    cy.get('[name=query]').clear().type(division2);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(division2)
      .each(division => {
        const division2 = division.text();
        if (division2 === division2) {
          cy.contains('span', 'Active');
          cy.wrap(division).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    return true;
  };
  const filterStatus = () => {
    //Filter with "Active" status
    cy.contains('button', 'Filter').as('filter').click();
    cy.contains('div', 'Filters Divisions').should('be.visible');
    cy.contains('span', 'All').click();
    cy.contains('div', 'Active').click();
    cy.get('button[type="Submit"]').click();
    cy.wait(2000);

    //Filter with "inactive" status
    cy.get('@filter').click();
    cy.contains('div', 'Filters Divisions').should('be.visible');
    cy.contains('span', 'Active').click();
    cy.contains('div', 'Inactive').click();
    cy.get('button[type="Submit"]').click();
    cy.wait(2000);

    //Clear filter
    cy.get('@filter').click();
    cy.contains('button', 'Cancel').click();

    //Is clear filter work?
    cy.get('@filter').click();
    cy.contains('div', 'Filters Divisions').should('be.visible');
    cy.contains('span', 'All').should('be.visible');
  };
});
