import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  setupFilesAfterEnv: ['<rootDir>/src/shared/test/jest.setup.integration.ts'],
  maxWorkers: 1,
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@modules/*': ['modules/*'],
      '@config/*': ['config/*'],
      '@shared/*': ['shared/*'],
      '@errors/*': ['errors/*'],
      '@utils/*': ['utils/*'],
    },
    {
      prefix: '<rootDir>/src/',
    },
  ),
  preset: 'ts-jest',

  testEnvironment: 'node',
  testMatch: ['**/integration/**/*.spec.ts', '**/unit/**/*.spec.ts'],
} as JestConfigWithTsJest;
