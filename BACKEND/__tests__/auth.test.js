// Example Jest test for Auth routes
const request = require('supertest');
const app = require('../api');

describe('Auth API', () => {
  it('should return 400 for missing email on signup', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ password: '1234567890' });
    expect(res.statusCode).toBe(400);
  });
});
