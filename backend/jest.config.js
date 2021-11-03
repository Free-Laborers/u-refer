/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageThreshold: {
      global: { //should changed to 50-60
        branches: 10,
        functions: 10,
        lines: 10,
        statements: 10
      }
    }
  };