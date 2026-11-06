const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const { Product: ProductModel, Category, indianCategories } = require('../models/Product');

describe('Product API', () => {
  let adminToken;
  let userToken;

  beforeAll(async () => {
    // Create users
    await User.deleteMany({});
    const adminRes = await request(app).post('/api/users/register').send({
      name: 'Admin User', email: 'admin@pawcalm.com', password: 'admin123', role: 'admin'
    });
    adminToken = adminRes.body.data.token;
    const userRes = await request(app).post('/api/users/register').send({
      name: 'Regular User', email: 'user@pawcalm.com', password: 'user123'
    });
    userToken = userRes.body.data.token;
  });

  describe('Product Listing', () => {
    it('should list products without authentication', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should list products with pagination', async () => {
      const res = await request(app).get('/api/products?page=1&limit=10');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Product Creation', () => {
    it('admin should create a product', async () => {
      const productData = {
        name: 'Test Calming Drop',
        slug: 'test-calming-drop',
        brand: 'Drools',
        category: 'calming-and-wellness',
        price: 500,
        mrp: 600,
        discount: 16.67,
        packSize: '200ml',
        stock: 50,
        inStock: true,
        images: ['https://example.com/image1.jpg'],
        description: 'Test product description',
        specifications: { key: 'value' }
      };
      const res = await request(app).post('/api/products').set('Authorization', 'Bearer ' + adminToken).send(productData);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
    });

    it('regular user should be denied product creation', async () => {
      const productData = {
        name: 'Test Product', slug: 'test-product', brand: 'Drools',
        category: 'dog-food', price: 100, packSize: '1kg', stock: 10
      };
      const res = await request(app).post('/api/products').set('Authorization', 'Bearer ' + userToken).send(productData);
      expect(res.statusCode).toBe(403);
    });

    it('product creation with invalid data should fail', async () => {
      const res = await request(app).post('/api/products').set('Authorization', 'Bearer ' + adminToken).send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Product Details', () => {
    let productId;

    beforeAll(async () => {
      // Create a product first
      const created = await request(app).post('/api/products').set('Authorization', 'Bearer ' + adminToken).send({
        name: 'Detail Test', slug: 'detail-test', brand: 'Drools',
        category: 'dog-food', price: 200, packSize: '500ml', stock: 30,
        images: ['https://example.com/img.jpg'], description: 'Details test'
      });
      productId = created.body.data.id;
    });

    it('should get product details', async () => {
      const res = await request(app).get(`/api/products/${productId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });

    it('should return 404 for invalid product ID', async () => {
      const res = await request(app).get('/api/products/invalid-id');
      expect(res.statusCode).toBe(404);
    });
  });

  describe('Product Modification', () => {
    let productId;

    beforeAll(async () => {
      // Create a product first
      const created = await request(app).post('/api/products').set('Authorization', 'Bearer ' + adminToken).send({
        name: 'Mod Test', slug: 'mod-test', brand: 'Drools',
        category: 'dog-food', price: 150, packSize: '250ml', stock: 20,
        images: ['https://example.com/img.jpg'], description: 'Mod test'
      });
      productId = created.body.data.id;
    });

    it('admin should modify a product', async () => {
      const res = await request(app).patch(`/api/products/${productId}`).set('Authorization', 'Bearer ' + adminToken).send({ price: 200 });
      expect(res.statusCode).toBe(200);
    });

    it('regular user should be denied product modification', async () => {
      const res = await request(app).patch(`/api/products/${productId}`).set('Authorization', 'Bearer ' + userToken).send({ price: 200 });
      expect(res.statusCode).toBe(403);
    });
  });

  describe('Product Deletion', () => {
    let productId;

    beforeAll(async () => {
      // Create a product first
      const created = await request(app).post('/api/products').set('Authorization', 'Bearer ' + adminToken).send({
        name: 'Del Test', slug: 'del-test', brand: 'Drools',
        category: 'dog-food', price: 100, packSize: '100ml', stock: 10,
        images: ['https://example.com/img.jpg'], description: 'Del test'
      });
      productId = created.body.data.id;
    });

    it('admin should delete a product', async () => {
      const res = await request(app).delete(`/api/products/${productId}`).set('Authorization', 'Bearer ' + adminToken);
      expect(res.statusCode).toBe(204);
    });

    it('regular user should be denied product deletion', async () => {
      const res = await request(app).delete(`/api/products/${productId}`).set('Authorization', 'Bearer ' + userToken);
      expect(res.statusCode).toBe(403);
    });
  });
});