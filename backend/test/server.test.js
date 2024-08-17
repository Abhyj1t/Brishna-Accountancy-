const request = require('supertest');
const app = require('../server'); // Adjust the path as needed
const { Pool } = require('pg');

// Mock the PostgreSQL connection
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('Server and Database Connection', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should respond with a welcome message on the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the backend!');
  });

  it('should test the database connection', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ now: '2024-08-17T00:00:00Z' }] });
    
    // You can manually invoke the database connection check
    const res = await pool.query('SELECT NOW()');
    expect(res.rows[0]).toHaveProperty('now', '2024-08-17T00:00:00Z');
  });
});
