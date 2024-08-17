const mockQuery = jest.fn();

const mockPool = {
  query: mockQuery,
  connect: jest.fn(),
  end: jest.fn(),
};

module.exports = {
  Pool: jest.fn(() => mockPool),
  __mockQuery: mockQuery,
};
