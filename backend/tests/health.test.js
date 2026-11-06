const request = require('supertest');
const app = require('../app');

describe('Health', () => {
  it('GET /api/health returns 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
  it('unknown route 404', async () => {
    const res = await request(app).get('/api/nope');
    expect(res.statusCode).toBe(404);
  });
});
