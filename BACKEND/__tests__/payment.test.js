// Example Jest test for Payment routes
const request = require('supertest');
const app = require('../api');

describe('Payment API', () => {
  it('should return 400 for missing email on update premium access', async () => {
    const res = await request(app)
      .patch('/api/payment/update_premium_access')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
