/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageThreshold: { //please change this as we write more tests
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
};

