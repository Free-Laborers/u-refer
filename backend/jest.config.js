/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
    },
  },
};