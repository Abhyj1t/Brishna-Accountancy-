// db-setup.test.js

// Mock the `pg` module using the mock implementation from the fixture folder
jest.mock('pg', () => require('./fixture/pgMock'));  // Adjust the path if necessary

const { Pool, __mockQuery } = require('./fixture/pgMock');  // Import the mock pool and query functions

describe('Database Connection with Mock', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool();
  });

  afterAll(() => {
    pool.end();
  });

  it('should simulate a successful database connection', async () => {
    // Simulate a successful query
    __mockQuery.mockResolvedValueOnce({
      rows: [{ now: '2024-08-17T00:00:00Z' }],
    });

    const res = await pool.query('SELECT NOW()');
    expect(res.rows.length).toBeGreaterThan(0);
    expect(res.rows[0]).toHaveProperty('now', '2024-08-17T00:00:00Z');
  });

  it('should simulate a failed database connection', async () => {
    // Simulate a failed query
    __mockQuery.mockRejectedValueOnce(new Error('Connection failed'));

    try {
      await pool.query('SELECT NOW()');
    } catch (error) {
      expect(error.message).toBe('Connection failed');
    }
  });
});
