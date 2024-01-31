module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "test/.*\\.test\\.ts$",
    "moduleNameMapper": {
      "rest-ts-axios": "<rootDir>/packages/rest-ts-axios/src",
      "rest-ts-core": "<rootDir>/packages/rest-ts-core/src",
      "rest-ts-express": "<rootDir>/packages/rest-ts-express/src"
    },
    "moduleFileExtensions": [
      "ts",
      "js",
      "json",
    ],
    "testEnvironment": "node",
    "collectCoverage": true,
    "coverageDirectory": "build/coverage",
    "coveragePathIgnorePatterns": [
      "node_modules",
      "test"
    ],
    "globals": {
      "ts-jest": {
        "isolatedModules": true
      }
    }
}