"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importModule = importModule;


/**
 * Normalize exported value of ES/CJS modules
 * https://github.com/esnext/es6-module-transpiler/issues/86
 */
function importModule(module, moduleName) {
  if (module.__esModule) {
    return moduleName && module[moduleName] || module.default;
  }

  return module;
}