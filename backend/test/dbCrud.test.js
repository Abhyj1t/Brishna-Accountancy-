// dbCrud.test.js

// Mock the `pg` module using the mock implementation from the fixture folder
jest.mock('pg', () => require('./fixture/pgMock'));  // Adjust the path if necessary

const { Pool, __mockQuery } = require('./fixture/pgMock');  // Import the mock pool and query functions

describe('Database CRUD Operations with Mock', () => {
  let pool;
  const tableName = 'test_table';

  beforeAll(async () => {
    pool = new Pool();

    // Simulate creating the table
    __mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);
  });

  afterAll(async () => {
    // Simulate dropping the table
    __mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
    pool.end();
  });

  it('should insert a new row into the table', async () => {
    // Simulate inserting a row
    __mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Test Name' }],
    });

    const insertResult = await pool.query(
      `INSERT INTO ${tableName} (name) VALUES ($1) RETURNING *`,
      ['Test Name']
    );
    expect(insertResult.rows.length).toBe(1);
    expect(insertResult.rows[0]).toHaveProperty('id', 1);
    expect(insertResult.rows[0].name).toBe('Test Name');
  });

  it('should read the inserted row from the table', async () => {
    // Simulate reading the row
    __mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Test Name' }],
    });

    const readResult = await pool.query(`SELECT * FROM ${tableName}`);
    expect(readResult.rows.length).toBeGreaterThan(0);
    expect(readResult.rows[0]).toHaveProperty('name', 'Test Name');
  });

  it('should update the inserted row in the table', async () => {
    // Simulate updating the row
    __mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Updated Name' }],
    });

    const updateResult = await pool.query(
      `UPDATE ${tableName} SET name = $1 WHERE name = $2 RETURNING *`,
      ['Updated Name', 'Test Name']
    );
    expect(updateResult.rows.length).toBe(1);
    expect(updateResult.rows[0]).toHaveProperty('name', 'Updated Name');
  });

  it('should delete the updated row from the table', async () => {
    // Simulate deleting the row
    __mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, name: 'Updated Name' }],
    });

    const deleteResult = await pool.query(
      `DELETE FROM ${tableName} WHERE name = $1 RETURNING *`,
      ['Updated Name']
    );
    expect(deleteResult.rows.length).toBe(1);
    expect(deleteResult.rows[0]).toHaveProperty('name', 'Updated Name');

    // Simulate verifying that the row is deleted
    __mockQuery.mockResolvedValueOnce({
      rows: [],
    });

    const readResult = await pool.query(`SELECT * FROM ${tableName} WHERE name = $1`, ['Updated Name']);
    expect(readResult.rows.length).toBe(0);
  });
});
