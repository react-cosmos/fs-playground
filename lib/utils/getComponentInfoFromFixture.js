'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponentInfoFromFixture = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Detect component name and file path from fixture code (statically)
 *
 * Note: There's no 100% guarantee. Components can be inlined in the same file
 * as fixtures, in which case the path returned will be null.
 *
 * TODO: Support CJS
 */
var getComponentInfoFromFixture = exports.getComponentInfoFromFixture = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
    var _defaults$args, fixturePath, fixtureIndex, code, ast, body, imports, defaultExportNode, exportBody, fixtureNode, componentProperty, _componentName, _componentPath, componentAbsPath, componentResolvedPath;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _defaults$args = _extends({}, defaults, args), fixturePath = _defaults$args.fixturePath, fixtureIndex = _defaults$args.fixtureIndex;

            // TODO: Memoize

            _context.next = 3;
            return readFileAsync(fixturePath, 'utf8');

          case 3:
            code = _context.sent;


            // TODO: How do we support everything user is using? (eg. Flow, TS, etc)
            ast = babylon.parse(code, {
              sourceType: 'module',
              plugins: ['jsx']
            });
            _context.prev = 5;
            body = ast.program.body;

            // Get a list of all imports to query them later

            imports = body.filter(isTyper('ImportDeclaration'));
            defaultExportNode = body.find(isTyper('ExportDefaultDeclaration'));

            if (defaultExportNode) {
              _context.next = 11;
              break;
            }

            throw Error('Could not find default export in fixture file');

          case 11:
            exportBody = defaultExportNode.declaration;
            fixtureNode = void 0;

            // Support for single and multi fixture files

            if (isType(exportBody, 'ArrayExpression')) {
              fixtureNode = exportBody.elements[fixtureIndex];
            } else if (isType(exportBody, 'ObjectExpression')) {
              fixtureNode = exportBody;
            }

            if (fixtureNode) {
              _context.next = 18;
              break;
            }

            throw Error('Could not parse fixture export');

          case 18:
            componentProperty = fixtureNode.properties.find(function (prop) {
              return prop.key.name === 'component';
            });
            _componentName = componentProperty.value.name;

            // From this point we'll return the component name even if we fail to
            // detect the component file path

            _context.prev = 20;
            _componentPath = getImportPathByName(imports, _componentName);

            if (_componentPath) {
              _context.next = 24;
              break;
            }

            throw Error('Could not find corresponding component import. ' + 'Maybe the component is declared inside the fixture?');

          case 24:

            // TODO: What if path isn't relative?
            componentAbsPath = _path2.default.join(_path2.default.dirname(fixturePath), _componentPath);
            componentResolvedPath = require.resolve(componentAbsPath);
            return _context.abrupt('return', {
              componentName: _componentName,
              componentPath: componentResolvedPath
            });

          case 29:
            _context.prev = 29;
            _context.t0 = _context['catch'](20);
            return _context.abrupt('return', {
              componentName: _componentName,
              componentPath: null
            });

          case 32:
            _context.next = 37;
            break;

          case 34:
            _context.prev = 34;
            _context.t1 = _context['catch'](5);
            return _context.abrupt('return', {
              componentName: null,
              componentPath: null
            });

          case 37:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[5, 34], [20, 29]]);
  }));

  return function getComponentInfoFromFixture(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _util = require('util.promisify');

var _util2 = _interopRequireDefault(_util);

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var readFileAsync = (0, _util2.default)(_fs2.default.readFile);

var defaults = {
  fixtureIndex: null
};

function getImportPathByName(imports, componentName) {
  // TODO: Support `import { component }` or `import { component as component }`
  var relevantImport = imports.find(function (i) {
    return i.specifiers[0].local.name === componentName;
  });

  return relevantImport ? relevantImport.source.value : null;
}

function isTyper(nodeType) {
  return function (node) {
    return isType(node, nodeType);
  };
}

function isType(node, nodeType) {
  return node.type === nodeType;
}