export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: ['src/**/*.js'],
};
