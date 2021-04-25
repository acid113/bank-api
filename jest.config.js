// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^@daos/(.*)$": "<rootDir>/src/daos/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@service/(.*)$": "<rootDir>/src/service/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@typedef/(.*)$": "<rootDir>/src/typedef/$1",
  },
  verbose: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: [
    "src/index.ts",
    "src/typedef",
    "src/server.ts",
    "src/shared/config.ts",
    "src/daos/*",
  ],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 90,
      functions: 80,
      lines: 95,
    },
  },
};
