// import { loginSection } from '../../util/login';
// const division1 = 'Division 1';
// const division2 = 'Division 2';
// const divisionEditName = 'Division 4';

//DIVISION

// describe(' Division', () => {
//   it('Login passed', () => {
//     loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
//     cy.visit('/');
//     cy.viewport(1440, 900);
//     cy.contains('div', 'Configuration').click({ force: true });
//     addDivisionthenCancel();
//     addDivisionExist();
//     addSecondDivision();
//     editDivisonExistName();
//     editDivisionSuccess();
//     filterStatus();
//     deleteDivision();
//   });

//   const addDivisionthenCancel = () => {
//     //Add division then cancel without enter data
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.contains('button', 'Cancel').click();

//     //Add division save without input name
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.contains('button', 'Add').click();
//     cy.contains('p', 'Please enter name').should('be.visible');
//     cy.contains('button', 'Cancel').click();

//     //Add and cancel after inputed name
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.get('[name=name]').type(division1);
//     cy.contains('button', 'Cancel').click();
//     cy.contains('header', 'Unsaved Changes').should('be.visible');
//     cy.contains('button', 'No').click();

//     //Cancel but submit "YES" -> Create a division
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.get('[name=name]').type(division1);
//     cy.contains('button', 'Cancel').click();
//     cy.contains('header', 'Unsaved Changes').should('be.visible');
//     cy.get('[type=submit]').eq(1).click({ force: true });
//   };

//   const addDivisionExist = () => {
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.get('[name=name]').type(division1);
//     cy.contains('button', 'Add').click();
//     cy.contains('div', 'The division already exists');
//     cy.contains('button', 'Cancel').click();
//     return true;
//   };

//   const addSecondDivision = () => {
//     cy.contains('button', 'ADD DIVISION').click();
//     cy.get('[name=name]').as('name').type(division2);
//     // cy.get('select').select('North Texas');
//     cy.contains('span', 'Select Directors').click();
//     cy.get('input[type="checkbox"]').eq(1).check({ force: true }); //select a checkbox (fixed)
//     cy.get('@name').click();
//     cy.contains('span', 'Select Admin').click();
//     cy.get('input[type="checkbox"]').eq(1).check({ force: true }); //select a checkbox (fixed)
//     cy.get('@name').click();
//     cy.contains('div[class="!mt-3"]', 'Active').click();
//     cy.contains('button', 'Add').click();
//     cy.contains('div', 'Added division successfully');
//     // cy.contains('button', 'Cancel').click();
//     return false;
//   };

//   const editDivisonExistName = () => {
//     cy.get('[name=query]').clear().type(division1);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(division1)
//       .each(division => {
//         const division1 = division.text();
//         if (division1 === division1) {
//           cy.contains('span', 'Active');
//           cy.wrap(division).parents('tr').find('td').eq(2).find('a').click();
//         }
//       });
//     cy.get('[name=name]').clear();
//     cy.get('[name=name]').type(division2);
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'The division already exists');
//     cy.contains('button', 'Cancel').click();
//     return true;
//   };

//   const editDivisionSuccess = () => {
//     cy.get('[name=query]').clear().type(division2);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(division2)
//       .each(division => {
//         const division2 = division.text();
//         if (division2 === division2) {
//           cy.wrap(division).parents('tr').find('td').eq(2).find('a').click();
//         }
//       });
//     cy.get('[name=name]').as('nameEdited').clear();
//     cy.get('@nameEdited').type(divisionEditName);
//     // cy.get('select').select('West Texas (Odessa)');
//     cy.contains('span', 'Erin Medina').click();
//     cy.get('input[type="checkbox"]').eq(3).check({ force: true }); //select a checkbox (fixed)
//     cy.get('@nameEdited').click();
//     cy.contains('span', 'Jack Lochkos').click();
//     cy.get('input[type="checkbox"]').eq(3).check({ force: true }); //select a checkbox (fixed)
//     cy.get('@nameEdited').click();
//     cy.contains('div[class="!mt-3"]', 'Active').click();
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'Update success!');
//     cy.contains('button', 'Cancel').click();
//     return false;
//   };

//   const deleteDivision = () => {
//     cy.contains('div', 'Configuration').click({ force: true });
//     // Delete a division
//     cy.get('[name=query]').clear().type(divisionEditName);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(divisionEditName)
//       .each(division => {
//         const division1 = division.text();
//         if (division1 === divisionEditName) {
//           cy.contains('span', 'Inactive');
//           cy.wrap(division).parents('tr').find('td').eq(2).find('svg').eq(1).click({force: true} );
//           cy.get('[type="submit"]').first().click();
//         }
//       });

//     cy.get('[name=query]').clear().type(division1);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(division1)
//       .each(division => {
//         const division1 = division.text();
//         if (division1 === division1) {
//           cy.contains('span', 'Active');
//           cy.wrap(division).parents('tr').find('td').eq(2).find('svg').eq(1).click({force: true} );
//           cy.get('[type="submit"]').first().click();
//         }
//       });
//     return true;
//   };

//   const filterStatus = () => {
//     //Filter with "Active" status
//     cy.contains('button', 'Filter').as('filter').click();
//     cy.contains('div', 'Filters Divisions').should('be.visible');
//     cy.contains('span', 'All').click();
//     cy.contains('div', 'Active').click();
//     cy.get('button[type="Submit"]').click();
//     cy.wait(2000);

//     //Filter with "inactive" status
//     cy.get('@filter').click();
//     cy.contains('div', 'Filters Divisions').should('be.visible');
//     cy.contains('span', 'Active').click();
//     cy.contains('div', 'Inactive').click();
//     cy.get('button[type="Submit"]').click();
//     cy.wait(2000);

//     //Clear filter
//     cy.get('@filter').click();
//     cy.contains('button', 'Cancel').click();

//     //Is clear filter work?
//     cy.get('@filter').click();
//     cy.contains('div', 'Filters Divisions').should('be.visible');
//     cy.contains('span', 'All').should('be.visible');
//   };
// });

//MARKET
// const marketName1 = 'Market 1';
// const marketName2 = 'Market 2';
// const marketNameEdited = 'Market 4';

// describe('Market', () => {
//   it('Market', () => {
//     cy.viewport(1440, 900);
//     loginSection('zxc112n+orgadmin@gmail.com', 'a123456A#');
//     cy.visit('/');
//     cy.contains('div', 'Configuration').click({ force: true });
//     cy.contains('a', 'MARKET').click();

//     addMarketthenCancel();
//     addMarketExist();
//     addSecondMarket();
//     editMarketNameExist();
//     editMarketSuccess();
//     filterStatus();
//     deleteMarket();
//   });

//   const addMarketthenCancel = () => {
//     //Add Market then cancel without enter data
//     cy.contains('button', 'ADD MARKET').click();
//     cy.contains('button', 'Cancel').click();

//     //Add market save without input name
//     cy.contains('button', 'ADD MARKET').click();
//     cy.contains('button', 'Save').click();
//     cy.contains('p', 'Please enter name').should('be.visible');
//     cy.contains('button', 'Cancel').click();

//     //Add and cancel after inputed name
//     cy.contains('button', 'ADD MARKET').click();
//     cy.get('[name=name]').type(marketName1);
//     cy.contains('button', 'Cancel').click();
//     cy.contains('header', 'Unsaved Changes').should('be.visible');
//     cy.contains('button', 'No').click();

//     //Cancel but submit "YES" -> create a market
//     cy.contains('button', 'ADD MARKET').click();
//     cy.get('[name=name]').type(marketName1);
//     cy.contains('button', 'Cancel').click();
//     cy.contains('header', 'Unsaved Changes').should('be.visible');
//     cy.get('[type=submit]').eq(1).click();
//     cy.contains('div', 'Added market successfully');
//   };

//   const addMarketExist = () => {
//     cy.contains('button', 'ADD MARKET').click();
//     cy.get('[name=name]').type(marketName1);
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'The market already exists');
//     cy.contains('button', 'Cancel').click();
//     return false;
//   };

//   const addSecondMarket = () => {
//     cy.contains('button', 'ADD MARKET').click();
//     cy.get('[name=name]').type(marketName2);
//     cy.contains('div[class="flex flex-col w-full"]', 'Status').click();
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'Added market successfully');
//     // cy.contains('button', 'Cancel').click();
//     return false;
//   };

//   const editMarketNameExist = () => {
//     cy.get('[name=query]').clear().type(marketName1);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(marketName1)
//       .each(market => {
//         const market1 = market.text();
//         if (market1 === market1) {
//           cy.contains('span', 'Active');
//           cy.wrap(market).parents('tr').find('td').eq(3).find('a').click();
//         }
//       });
//     cy.get('input[name="name"]').as('marketName').clear();
//     cy.get('@marketName').type(marketName2);
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'Market already exsits'); //Market already exsits with name Market 2. Please choose a different name or update the existing one.
//     cy.contains('button', 'Cancel').click();
//     return true;
//   };

//   const editMarketSuccess = () => {
//     cy.get('[name=query]').type(marketName1);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(marketName1)
//       .each(market => {
//         const market1 = market.text();
//         if (market1 === market1) {
//           cy.wrap(market).parents('tr').find('td').eq(3).find('a').click();
//         }
//       });
//     cy.get('input[name="name"]').as('marketName').clear();
//     cy.get('@marketName').type(marketNameEdited);
//     // cy.contains('div[class="flex flex-col w-full"]', 'Status').click();
//     cy.contains('button', 'Save').click();
//     cy.contains('div', 'Update market successfully');
//     cy.contains('button', 'Cancel').click();
//     return false;
//   };

//   const deleteMarket = () => {
//     cy.contains('div', 'Configuration').click({ force: true });
//     cy.contains('a', 'MARKET').click();

//     cy.get('[name=query]').clear().type(marketNameEdited);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(marketNameEdited)
//       .each(market => {
//         const marketNameEdited = market.text();
//         if (marketNameEdited === marketNameEdited) {
//           cy.contains('span', 'Active');
//           cy.wrap(market).parents('tr').find('td').eq(3).find('svg').eq(1).click();
//           cy.get('[type="submit"]').click();
//         }
//       });

//     cy.get('[name=query]').clear().type(marketName2);
//     cy.get('[role=rowgroup]')
//       .find('td')
//       .contains(marketName2)
//       .each(market => {
//         const market2 = market.text();
//         if (market2 === market2) {
//           cy.contains('span', 'Inactive');
//           cy.wrap(market).parents('tr').find('td').eq(3).find('svg').eq(1).click();
//           cy.get('[type="submit"]').click();
//         }
//       });
//     return true;
//   };

//   const filterStatus = () => {
//     //Filter with "Active" status
//     cy.contains('button', 'Filter').as('filter').click();
//     cy.contains('div', 'Filter Markets').should('be.visible');
//     cy.contains('span', 'All').click();
//     cy.contains('div', 'Active').click();
//     cy.get('button[type="Submit"]').click();
//     cy.wait(2000);

//     //Filter with "inactive" status
//     cy.get('@filter').click();
//     cy.contains('div', 'Filter Markets').should('be.visible');
//     cy.contains('span', 'Active').click();
//     cy.contains('div', 'Inactive').click();
//     cy.get('button[type="Submit"]').click();
//     cy.wait(2000);

//     //Clear filter
//     cy.get('@filter').click();
//     cy.contains('button', 'Cancel').click();

//     //Is clear filter work?
//     cy.get('@filter').click();
//     cy.contains('div', 'Filter Markets').should('be.visible');
//     cy.contains('span', 'All').should('be.visible');
//   };
// });
