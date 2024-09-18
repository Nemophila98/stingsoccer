import { loginSection } from '../../util/login';

const leagueName1 = 'league 1';
const leagueName2 = 'league 2';
const leagueNameEdited = 'league 4';

describe('league', () => {
  it('league', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'LEAGUES').click();

    addLeagueThenCancel();
    catchErrorLeaguenExist();
    addSecondLeague();
    editLeagueNameExist();
    editLeagueSuccess();
    deleteLeague();
  });

  const addLeagueThenCancel = () => {
    //Add league then cancel without enter data
    cy.contains('button', 'ADD LEAGUE').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD LEAGUE').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    cy.contains('button', 'ADD LEAGUE').click();
    cy.get('[name=name]').type(leagueName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a league
    cy.contains('button', 'ADD LEAGUE').click();
    cy.get('[name=name]').type(leagueName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').eq(1).click();
    cy.contains('div', 'League has created successfully.').should('be.visible');
  };

  const catchErrorLeaguenExist = () => {
    cy.contains('button', 'ADD LEAGUE').click();
    cy.get('[name=name]').as('name').type(leagueName1);
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include('already exists');

      return false;
    });
    cy.contains('button', 'Save').click();
    cy.contains('button', 'Cancel').click();
  };

  const addSecondLeague = () => {
    cy.contains('button', 'ADD LEAGUE').click();
    cy.get('[name=name]').type(leagueName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'League has created successfully.').should('be.visible');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const editLeagueNameExist = () => {
    cy.get('[name=query]').clear().type(leagueName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(leagueName1)
      .each(league => {
        const league1 = league.text();
        if (league1 === league1) {
          cy.wrap(league).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('leagueName').clear();
    cy.get('@leagueName').type(leagueName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The league already exists');
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editLeagueSuccess = () => {
    cy.get('[name=query]').type(leagueName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(leagueName1)
      .each(league => {
        const league1 = league.text();
        if (league1 === league1) {
          cy.wrap(league).parents('tr').find('td').eq(2).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('leagueName').clear();
    cy.get('@leagueName').type(leagueNameEdited);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'League is updated successfully.');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const deleteLeague = () => {
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'LEAGUES').click();
    cy.get('[name=query]').clear().type(leagueNameEdited);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(leagueNameEdited)
      .each(league => {
        const league2 = league.text();
        if (league2 === league2) {
          cy.wrap(league).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    cy.get('[name=query]').clear().type(leagueName2);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(leagueName2)
      .each(league => {
        const league2 = league.text();
        if (league2 === league2) {
          cy.wrap(league).parents('tr').find('td').eq(2).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    return true;
  };
});
