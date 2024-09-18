import { loginSection } from '../../util/login';
const seasonName1 = 'Spring';
const seasonName2 = 'Summer';
const seasonEdited = 'Autumn';
describe('Seasons', () => {
  it('Season', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.get('[type=button]').contains('span', 'MORE').click({ force: true });
    cy.contains('a', 'SEASONS').click({ force: true });
    addSeason();
    addSecondSeason();
    editSeasonNameExist();
    editSeasonSuccess();
    deleteSeason();
  });

  const addSeason = () => {
    //Add season then cancel without enter data
    cy.contains('button', 'ADD SEASON').click();
    cy.contains('button', 'Cancel').click();

    //Add division save without input name
    cy.contains('button', 'ADD SEASON').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add division with input name then cancel "No"
    cy.contains('button', 'ADD SEASON').click();
    cy.get('[name=name]').type(seasonName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but "Yes" -> Create a season
    cy.contains('button', 'ADD SEASON').click();
    cy.get('[name=name]').type(seasonName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').last().click();
    cy.contains('div', 'Added season successfully');
  };

  const addSecondSeason = () => {
    cy.contains('button', 'ADD SEASON').click();
    cy.get('[name=name]').type(seasonName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Added season successfully');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const editSeasonNameExist = () => {
    cy.get('[name=query]').clear().type(seasonName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(seasonName1)
      .each(season => {
        const season1 = season.text();
        if (season1 === season1) {
          cy.wrap(season).parents('tr').find('td').eq(3).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('seasonName').clear();
    cy.get('@seasonName').type(seasonName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The season already exists'); //Season already exsits with name Season 2. Please choose a different name or update the existing one.
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editSeasonSuccess = () => {
    cy.get('[name=query]').type(seasonName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(seasonName1)
      .each(season => {
        const season1 = season.text();
        if (season1 === season1) {
          cy.wrap(season).parents('tr').find('td').eq(3).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('seasonName').clear();
    cy.get('@seasonName').type(seasonEdited);
    // cy.contains('div[class="flex flex-col w-full"]', 'Status').click();
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Updated season successfully');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const deleteSeason = () => {
    cy.contains('div', 'Configuration').click({ force: true });
    cy.get('[type=button]').contains('span', 'MORE').click({ force: true });
    cy.contains('a', 'SEASONS').click({ force: true });

    cy.get('[name=query]').clear().type(seasonEdited);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(seasonEdited)
      .each(season => {
        const seasonNameEdited = season.text();
        if (seasonNameEdited === seasonNameEdited) {
          cy.wrap(season).parents('tr').find('td').eq(3).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });

    cy.get('[name=query]').clear().type(seasonName2);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(seasonName2)
      .each(season => {
        const season2 = season.text();
        if (season2 === season2) {
          cy.wrap(season).parents('tr').find('td').eq(3).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    return true;
  };
});
