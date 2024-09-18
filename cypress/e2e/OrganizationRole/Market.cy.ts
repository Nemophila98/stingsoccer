import { loginSection } from '../../util/login';

const marketName1 = 'Market 1';
const marketName2 = 'Market 2';
const marketNameEdited = 'Market 4';

describe('Market', () => {
  it('Market', () => {
    cy.viewport(1440, 900);
    loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
    cy.visit('/');
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'MARKET').click();

    addMarketthenCancel();
    addMarketExist();
    addSecondMarket();
    editMarketNameExist();
    editMarketSuccess();
    filterStatus();
    deleteMarket();
  });

  const addMarketthenCancel = () => {
    //Add Market then cancel without enter data
    cy.contains('button', 'ADD MARKET').click();
    cy.contains('button', 'Cancel').click();

    //Add market save without input name
    cy.contains('button', 'ADD MARKET').click();
    cy.contains('button', 'Save').click();
    cy.contains('p', 'Please enter name').should('be.visible');
    cy.contains('button', 'Cancel').click();

    //Add and cancel after inputed name
    cy.contains('button', 'ADD MARKET').click();
    cy.get('[name=name]').type(marketName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.contains('button', 'No').click();

    //Cancel but submit "YES" -> create a market
    cy.contains('button', 'ADD MARKET').click();
    cy.get('[name=name]').type(marketName1);
    cy.contains('button', 'Cancel').click();
    cy.contains('header', 'Unsaved Changes').should('be.visible');
    cy.get('[type=submit]').eq(1).click();
    cy.contains('div', 'Added market successfully');
  };

  const addMarketExist = () => {
    cy.contains('button', 'ADD MARKET').click();
    cy.get('[name=name]').type(marketName1);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'The market already exists');
    cy.contains('button', 'Cancel').click();
    return false;
  };

  const addSecondMarket = () => {
    cy.contains('button', 'ADD MARKET').click();
    cy.get('[name=name]').type(marketName2);
    cy.contains('div[class="flex flex-col w-full"]', 'Status').click();
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Added market successfully');
    // cy.contains('button', 'Cancel').click();
    return false;
  };

  const editMarketNameExist = () => {
    cy.get('[name=query]').clear().type(marketName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(marketName1)
      .each(market => {
        const market1 = market.text();
        if (market1 === market1) {
          cy.contains('span', 'Active');
          cy.wrap(market).parents('tr').find('td').eq(3).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('marketName').clear();
    cy.get('@marketName').type(marketName2);
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Market already exsits'); //Market already exsits with name Market 2. Please choose a different name or update the existing one.
    cy.contains('button', 'Cancel').click();
    return true;
  };

  const editMarketSuccess = () => {
    cy.get('[name=query]').type(marketName1);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(marketName1)
      .each(market => {
        const market1 = market.text();
        if (market1 === market1) {
          cy.wrap(market).parents('tr').find('td').eq(3).find('a').click();
        }
      });
    cy.get('input[name="name"]').as('marketName').clear();
    cy.get('@marketName').type(marketNameEdited);
    // cy.contains('div[class="flex flex-col w-full"]', 'Status').click();
    cy.contains('button', 'Save').click();
    cy.contains('div', 'Update market successfully');
    cy.contains('button', 'Cancel').click();
    return false;
  };

  const deleteMarket = () => {
    cy.contains('div', 'Configuration').click({ force: true });
    cy.contains('a', 'MARKET').click();

    cy.get('[name=query]').clear().type(marketNameEdited);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(marketNameEdited)
      .each(market => {
        const marketNameEdited = market.text();
        if (marketNameEdited === marketNameEdited) {
          cy.contains('span', 'Active');
          cy.wrap(market).parents('tr').find('td').eq(3).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });

    cy.get('[name=query]').clear().type(marketName2);
    cy.get('[role=rowgroup]')
      .find('td')
      .contains(marketName2)
      .each(market => {
        const market2 = market.text();
        if (market2 === market2) {
          cy.contains('span', 'Inactive');
          cy.wrap(market).parents('tr').find('td').eq(3).find('svg').eq(1).click();
          cy.get('[type="submit"]').click();
        }
      });
    return true;
  };

  const filterStatus = () => {
    //Filter with "Active" status
    cy.contains('button', 'Filter').as('filter').click();
    cy.contains('div', 'Filter Markets').should('be.visible');
    cy.contains('span', 'All').click();
    cy.contains('div', 'Active').click();
    cy.get('button[type="Submit"]').click();
    cy.wait(2000);

    //Filter with "inactive" status
    cy.get('@filter').click();
    cy.contains('div', 'Filter Markets').should('be.visible');
    cy.contains('span', 'Active').click();
    cy.contains('div', 'Inactive').click();
    cy.get('button[type="Submit"]').click();
    cy.wait(2000);

    //Clear filter
    cy.get('@filter').click();
    cy.contains('button', 'Cancel').click();

    //Is clear filter work?
    cy.get('@filter').click();
    cy.contains('div', 'Filter Markets').should('be.visible');
    cy.contains('span', 'All').should('be.visible');
  };
});
