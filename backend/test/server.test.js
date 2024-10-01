const request = require('supertest');
const app = require('../server'); // Ensure this path is correct
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
  let server;

  beforeAll((done) => {
    pool = new Pool();
    // Start the server
    server = app.listen(5001, () => {
      console.log('Server running on port 5001');
      done();
    });
  });

  afterAll((done) => {
    // Stop the server
    server.close(done);
    jest.clearAllMocks();
  });

  it('should respond with a welcome message on the root route', async () => {
    const res = await request(server).get('/'); // Pass the server instance
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Welcome to the backend!');
  });

  it('should test the database connection', async () => {
    // Mock the database query
    pool.query.mockResolvedValueOnce({ rows: [{ now: '2024-08-17T00:00:00Z' }] });

    // Execute a database query to check the connection
    const res = await pool.query('SELECT NOW()');
    expect(res.rows[0]).toHaveProperty('now', '2024-08-17T00:00:00Z');
  });
});
