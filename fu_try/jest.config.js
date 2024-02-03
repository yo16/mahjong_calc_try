module.exports = {
    testMatch: ["<rootDir>/test/**/*.test.js"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: 'jsdom',
    // 他のJestの設定...
};
