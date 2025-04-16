module.exports = {
    ...require('./jest.unit.config.cjs'),
    setupFilesAfterEnv: ['./jest.integration.setup.js'], 
    testMatch: ['**/__tests__/integration/**/*.test.ts']
};