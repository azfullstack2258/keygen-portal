import axios from 'axios';
import mockAxios from 'jest-mock-axios';

// Replace axios with a mock before each test
jest.mock('axios', () => {
  return mockAxios;
});
