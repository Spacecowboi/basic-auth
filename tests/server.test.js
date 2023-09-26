const request = require('supertest');
const app = require('../src/server.js');
const User = require('../src/auth/models/user-model.js');

beforeEach(async () => {
  // Delete all users before each test
  await User.destroy({ where: {} });
});

describe('POST /signup', () => {
  test('should create a new user and return 201 status', async () => {
    const response = await request(app).post('/signup').send({
      username: 'testuser',
      password: 'testpassword'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe('testuser');
  });
});

describe('POST /signin', () => {
  test('should sign in a user and return 200 status', async () => {
    // First, create a user
    await request(app).post('/signup').send({
      username: 'testuser',
      password: 'testpassword'
    });

    // Then, try to sign in
    const response = await request(app).post('/signin').auth('testuser', 'testpassword');

    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('testuser');
  });
});

//I prompted ChatGPT with "I need tests that help me test my endpoints for my routes, and tests for my middleware, can you help me?"
//After providing ChatGPT with the routes and my middleware it provided these test suites
//Specifically lines 5 - 36. 