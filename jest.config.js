/** @type {import('jest').Config} */
const config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testRegex: ".e2e.spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};

module.exports = config;
