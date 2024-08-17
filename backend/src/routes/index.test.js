// src/math.test.js

// Function to be tested
function add(a, b) {
    return a + b;
  }
  
  // Test suite
  describe('Math functions', () => {
    // Test case
    test('should add two numbers correctly', () => {
      expect(add(1, 2)).toBe(3);
    });
  });