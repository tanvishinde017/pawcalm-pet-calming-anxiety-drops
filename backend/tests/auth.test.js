const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Authentication', () => {
  beforeAll(async () => {
    // Clean up any existing test user - use deleteOne with strict mode
    await User.deleteOne({ email: 'testauth@example.com' });
  });

  describe('User Registration', () => {
    it('should register a new user with valid data', async () => {
      const res = await request(app).post('/api/users/register').send({
        name: 'Test User',
        email: 'testauth@example.com',
        password: 'password123',
        phone: '1234567890'
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data.user).toHaveProperty('email', 'testauth@example.com');
      expect(res.body.data.user).toHaveProperty('role', 'user');
    });

    it('should reject registration with missing fields', async () => {
      const res = await request(app).post('/api/users/register').send({ name: 'Test' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'All fields are required');
    });

    it('should reject registration with existing email', async () => {
      // Register first
      await request(app).post('/api/users/register').send({ name: 'Test', email: 'testauth@example.com', password: 'password123' });
      const res = await request(app).post('/api/users/register').send({ name: 'Test2', email: 'testauth@example.com', password: 'password123' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists with this email');
    });
  });

  describe('User Login', () => {
    it('should login with valid credentials', async () => {
      await request(app).post('/api/users/register').send({ name: 'Test', email: 'logintest@example.com', password: 'password123' });
      const res = await request(app).post('/api/users/login').send({ email: 'logintest@example.com', password: 'password123' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data.token');
    });

    it('should reject login with incorrect password', async () => {
      const res = await request(app).post('/api/users/login').send({ email: 'logintest@example.com', password: 'wrongpassword' });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should reject login with missing credentials', async () => {
      const res = await request(app).post('/api/users/login').send({ email: 'logintest@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });
  });

  describe('Protected Endpoints', () => {
    it('should get profile with valid token', async () => {
      const loginRes = await request(app).post('/api/users/login').send({ email: 'logintest@example.com', password: 'password123' });
      const res = await request(app).get('/api/users/profile').set('Authorization', 'Bearer ' + loginRes.body.data.token);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('data.user');
      expect(res.body.data.user).not.toHaveProperty('password');
    });

    it('should reject access without token', async () => {
      const res = await request(app).get('/api/users/profile');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Authorization token required');
    });

    it('should reject invalid token', async () => {
      const res = await request(app).get('/api/users/profile').set('Authorization', 'Bearer invalidtoken123');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid or expired token');
    });
  });

  describe('Password Hashing', () => {
    it('should hash password before saving', async () => {
      const res = await request(app).post('/api/users/register').send({ name: 'Hash Test', email: 'hashtest@example.com', password: 'secret123' });
      const user = await User.findOne({ email: 'hashtest@example.com' });
      expect(user.password).not.toBe('secret123');
      expect(user.password).toHaveLength(60); // bcrypt hash length
    });

    it('password hash should not be returned in responses', async () => {
      const loginRes = await request(app).post('/api/users/login').send({ email: 'hashtest@example.com', password: 'secret123' });
      expect(loginRes.body.data.user.password).toBeUndefined();
    });
  });
});