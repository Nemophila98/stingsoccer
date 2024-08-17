import { login } from '../util/login';
import account from '../fixtures/account.json';

describe('Login Feature', () => {
  it('should login with valid credentials', () => {
    login(account.email, account.password);
  });
});
