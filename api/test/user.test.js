const request = require('supertest');
const server = require('../index');
const User = require('../models/user');

const validRegistration = {
  email: 'test@domain.com',
  password: '12345678',
  name: {
    first: 'Kurt',
    last: 'Vonnegut',
  },
};

describe('User tests', () => {
  it('should allow new users to register with valid credentials', () => {
    return request(server).post('/user/register')
      .send(validRegistration)
      .expect(200);
  });

  it('should not allow new users to register with a missing email', () => {
    const invalidRegistration = Object.assign({}, validRegistration);
    delete invalidRegistration.email;

    return request(server).post('/user/register')
      .send(invalidRegistration)
      .expect(422);
  });

  // Remove saved user data from test database
  afterAll(() => User.remove({}));
});
