module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testEnvironment: 'jest-environment-jsdom', // Use jest-environment-jsdom
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>/mocks/styleMock.js'
  }
};
