const request = require('supertest');
const app = require('../app');
const Enquiry = require('../models/Enquiry');

describe('Contact API', () => {
  describe('Valid Contact Submission', () => {
    it('should submit a valid contact enquiry', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Product Inquiry',
        message: 'I have a question about your products.'
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('Missing Required Fields', () => {
    it('should reject missing name', async () => {
      const res = await request(app).post('/api/contact').send({
        email: 'test@example.com',
        subject: 'Inquiry',
        message: 'Question'
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Please fill in all required fields');
    });

    it('should reject missing email', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Test User',
        subject: 'Inquiry',
        message: 'Question'
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Please fill in all required fields');
    });

    it('should reject missing subject', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Question'
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Please fill in all required fields');
    });

    it('should reject missing message', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Inquiry'
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Please fill in all required fields');
    });
  });

  describe('Invalid Request Body', () => {
    it('should reject empty body', async () => {
      const res = await request(app).post('/api/contact').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should reject invalid email', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Test User',
        email: 'not-an-email',
        subject: 'Inquiry',
        message: 'Question'
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Please fill in all required fields');
    });
  });