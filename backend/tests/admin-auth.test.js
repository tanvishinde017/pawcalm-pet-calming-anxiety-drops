const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Admin Authorization', () => {
  let adminToken;
  let userToken;

  beforeAll(async () => {
    // Create admin user
    await User.deleteMany({});
    // Register admin
    const adminRes = await request(app).post('/api/users/register').send({
      name: 'Admin User',
      email: 'admin@pawcalm.com',
      password: 'admin123',
      role: 'admin'
    });
    adminToken = adminRes.body.data.token;
    // Register regular user
    const userRes = await request(app).post('/api/users/register').send({
      name: 'Regular User',
      email: 'user@pawcalm.com',
      password: 'user123'
    });
    userToken = userRes.body.data.token;
  });

  describe('Admin can access admin operations', () => {
    it('admin should access admin products list', async () => {
      const res = await request(app).get('/api/admin/products').set('Authorization', 'Bearer ' + adminToken);
      expect(res.statusCode).toBe(200);
    });

    it('admin should access admin orders list', async () => {
      const res = await request(app).get('/api/admin/orders').set('Authorization', 'Bearer ' + adminToken);
      expect(res.statusCode).toBe(200);
    });

    it('admin should access admin users list', async () => {
      const res = await request(app).get('/api/admin/users').set('Authorization', 'Bearer ' + adminToken);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Normal users cannot access admin operations', () => {
    it('regular user should be denied admin products list', async () => {
      const res = await request(app).get('/api/admin/products').set('Authorization', 'Bearer ' + userToken);
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message', 'Admin access required');
    });

    it('regular user should be denied admin orders list', async () => {
      const res = await request(app).get('/api/admin/orders').set('Authorization', 'Bearer ' + userToken);
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message', 'Admin access required');
    });

    it('regular user should be denied admin users list', async () => {
      const res = await request(app).get('/api/admin/users').set('Authorization', 'Bearer ' + userToken);
      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message', 'Admin access required');
    });
  });

  describe('Unauthenticated users cannot access admin operations', () => {
    it('unauthenticated user should be denied admin products', async () => {
      const res = await request(app).get('/api/admin/products');
      expect(res.statusCode).toBe(401);
    });

    it('unauthenticated user should be denied admin orders', async () => {
      const res = await request(app).get('/api/admin/orders');
      expect(res.statusCode).toBe(401);
    });
  });
});