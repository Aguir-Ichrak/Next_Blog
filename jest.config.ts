export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Needed for testing React components
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript + JSX
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Ensure jest-dom is loaded
  };
  