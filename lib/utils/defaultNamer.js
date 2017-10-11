"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultNamer = createDefaultNamer;
var global = {};

/**
 * Generate unique, consecutive default names
 * E.g. default, default (1), default (2), etc.
 */
function createDefaultNamer(baseName) {
  var countPerId = new WeakMap();

  return function defaultNamer() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global;

    var count = countPerId.get(id);

    if (count === undefined) {
      count = 0;
      countPerId.set(id, 1);
    } else {
      countPerId.set(id, count + 1);
    }

    return count > 0 ? baseName + " (" + count + ")" : baseName;
  };
}