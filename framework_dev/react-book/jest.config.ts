const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "jest",
  testEnvironment: "jsdom", // 또는 "jsdom" (React 프로젝트라면)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/", // Jest의 루트 디렉토리를 기준으로 경로 매핑
  }),
  rootDir: ".", // Jest의 루트 디렉토리를 지정
};

// module.exports = {
//   testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
// };
