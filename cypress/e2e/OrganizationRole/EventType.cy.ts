import { loginSection } from '../../util/login';
const eventtypeName1 = 'Event Type 1';
const eventtypeName2 = 'Event Type 2';
const eventtypeEdited = 'Event Type A';
describe('Event Type', () => {
  it('Event Type', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.get('[type=button]').contains('span', 'MORE').click({ force: true });
    cy.contains('a', 'EVENT TYPE').click({ force: true });
    addEventType();
    addSecondEventType();
    editEventTypeNameExist();
    editEventTypeSuccess();
    deleteEventType();
  });

  const addEventType = () => {
    //Add eventtype then cancel without enter data
    cy.contains('button', 'ADD EVENT TYPE').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD EVENT TYPE').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add division with input name then cancel "No"
    cy.contains('button', 'ADD EVENT TYPE').click();
    cy.get('[name=name]').type(eventtypeName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a eventtype
    cy.contains('button', 'ADD EVENT TYPE').click();
    cy.get('[name=name]').type(eventtypeName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').last().click();
    cy.contains('div', 'Added event type successfully');
  };

  const addSecondEventType = () => {
    cy.contains('button', 'ADD EVENT TYPE').click();
    cy.get('[name=name]').type(eventtypeName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Added event type successfully');
    return false;
  };

  const editEventTypeNameExist = () => {
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(eventtypeName1)
      .each(eventtype => {
        const eventtype1 = eventtype.text();
        if (eventtype1 === eventtype1) {
          cy.wrap(eventtype).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('eventtypeName').clear();
    cy.get('@eventtypeName').type(eventtypeName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The event type already exists');
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editEventTypeSuccess = () => {
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(eventtypeName1)
      .each(eventtype => {
        const eventtype1 = eventtype.text();
        if (eventtype1 === eventtype1) {
          cy.wrap(eventtype).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('eventtypeName').clear();
    cy.get('@eventtypeName').type(eventtypeEdited);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Updated event type successfully');
    return false;
  };

  const deleteEventType = () => {
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(eventtypeEdited)
      .each(eventtype => {
        const eventtypeNameEdited = eventtype.text();
        if (eventtypeNameEdited === eventtypeNameEdited) {
          cy.wrap(eventtype).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });

    cy.get('[role=rowgroup]')
      .find('td')
      .contains(eventtypeName2)
      .each(eventtype => {
        const eventtype2 = eventtype.text();
        if (eventtype2 === eventtype2) {
          cy.wrap(eventtype).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    return true;
  };
});
