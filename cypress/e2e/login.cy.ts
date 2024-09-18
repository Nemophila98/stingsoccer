import account from '../fixtures/account.json';

const inputdata = (email?: string, password?: string) => {
  const mail = email || account.email;
  const pass = password || account.password;
  cy.get('[name=email]').as('email').type(mail);
  cy.get('[name=password]').as('pwd').type(pass);
};

describe('Login Feature', () => {
  //Case: Invalid email format
  it('Invalid email format', () => {
    cy.visit('/');
    cy.viewport(1440, 900);

    inputdata('zxc112n+09423@yop');
    cy.contains('button', 'Sign in').click();
    cy.contains('p', 'Must be a valid email').should('be.visible');
  });

  //Case: Email not exits in the system
  it('Email not exits', done => {
    cy.visit('/');
    const email = 'zxc112n+09423@yopmail.com';
    const pwd = 'a123455A#';
    inputdata(email, pwd);
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include(`IdentityUser with Email: ${email} was not found in the database.`);
      done();
      return false;
    });
    cy.contains('button', 'Sign in').click();
  });

  //Case: Password incorrect,Email correct.
  it('Password incorrect', done => {
    cy.visit('/');
    const email = 'zxc112n+orgadmin@gmail.com';
    const pwd = 'a123455A#';
    inputdata(email, pwd);
    // cy.get('@email').invoke('val').should('equal', email);
    // cy.get('@pwd').invoke('val').should('equal', pwd); //thuc su can check moi khi nhap email/pass?
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include('Invalid credentials.');
      done();
      return true;
    });
    cy.contains('button', 'Sign in').click();
  });

  //Case: Account is not active
  it('Inactive user', done => {
    cy.visit('/');
    const email = 'notactiveuser@yopmail.com';
    const pwd = 'a123456A#';
    inputdata(email, pwd);
    cy.on('uncaught:exception', err => {
      expect(err.message).to.include('is not active.');
      done();
      return true;
    });
    cy.contains('button', 'Sign in').click();
  });

  //Case: Email not confirmed yet
  it('Not confirm email', () => {
    cy.visit('/');
    const email = 'notconfirmemail@yopmail.com';
    const pwd = 'a123456A#';
    inputdata(email, pwd);
    cy.contains('button', 'Sign in').click();
    cy.contains('p', 'Verify your account');
  });

  //Case: Valid email and password.
  it('Valid account', () => {
    cy.visit('/');
    const email = account.email;
    const pwd = account.password;
    inputdata(email, pwd);
    // signupinfo( account.email,account.password);
    cy.contains('button', 'Sign in').click();
    cy.contains('Outstanding Balance').should('be.visible');
  });
});
