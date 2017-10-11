'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComponents = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getComponents = exports.getComponents = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
    var _defaults$args, fileMatch, cwd, allPaths, fixturePaths, fixtureCommonDir, defaultFixtureNamer, fixturesByComponent, componentNames, componentPaths, i, fixturePath, source, fileNamespace, isMultiFixture, fixturesInFile, j, fixture, fixtureIndex, component, name, namespace, compFixtures, _ref2, componentName, componentPath, components, componentCommonDir, defaultComponentNamer, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, componentType, _compFixtures, filePath, _name, _namespace;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _defaults$args = _extends({}, defaults, args), fileMatch = _defaults$args.fileMatch, cwd = _defaults$args.cwd;

            // TODO: How do we watch for file changes?

            _context.next = 3;
            return globAsync('**/*', {
              cwd: cwd,
              absolute: true,
              ignore: '**/node_modules/**'
            });

          case 3:
            allPaths = _context.sent;
            fixturePaths = (0, _micromatch2.default)(allPaths, fileMatch);
            fixtureCommonDir = getCommonDirFromPaths(fixturePaths);
            defaultFixtureNamer = (0, _defaultNamer.createDefaultNamer)('default');

            // Group all fixtures by component

            fixturesByComponent = new Map();
            componentNames = new Map();
            componentPaths = new Map();

            // Can't use forEach because we want each (async) loop to be serial

            i = 0;

          case 11:
            if (!(i < fixturePaths.length)) {
              _context.next = 40;
              break;
            }

            fixturePath = fixturePaths[i];
            source = (0, _importModule.importModule)(require(fixturePath));
            fileNamespace = getFileNamespace(fixtureCommonDir, fixturePath);

            // Fixture files can export one fixture object or a list of fixture object

            isMultiFixture = Array.isArray(source);
            fixturesInFile = isMultiFixture ? source : [source];

            // Can't use forEach because we want each (async) loop to be serial

            j = 0;

          case 18:
            if (!(j < fixturesInFile.length)) {
              _context.next = 37;
              break;
            }

            fixture = fixturesInFile[j];
            fixtureIndex = isMultiFixture ? j : null;
            component = fixture.component, name = fixture.name;

            // TODO: Throw if fixture.component is missing

            // Check user specified namespace first, fallback to namespacing based
            // on file path

            namespace = fixture.namespace || fileNamespace;

            // Is this the first fixture for this component?

            compFixtures = fixturesByComponent.get(component);

            if (!compFixtures) {
              compFixtures = [];
              fixturesByComponent.set(component, compFixtures);
            }

            compFixtures.push({
              filePath: fixturePath,
              fixtureIndex: fixtureIndex,
              name: name || defaultFixtureNamer(component),
              namespace: namespace
            });

            if (componentPaths.get(component)) {
              _context.next = 34;
              break;
            }

            _context.next = 29;
            return (0, _getComponentInfoFromFixture.getComponentInfoFromFixture)({
              fixturePath: fixturePath,
              fixtureIndex: fixtureIndex
            });

          case 29:
            _ref2 = _context.sent;
            componentName = _ref2.componentName;
            componentPath = _ref2.componentPath;


            // It's possible to identify the component name but not the file path
            if (componentName) {
              componentNames.set(component, componentName);
            }
            if (componentPath) {
              componentPaths.set(component, componentPath);
            }

          case 34:
            j++;
            _context.next = 18;
            break;

          case 37:
            i++;
            _context.next = 11;
            break;

          case 40:

            // Add component meta data around fixtures
            components = [];
            componentCommonDir = getCommonDirFromPaths(Array.from(componentPaths.values()));
            defaultComponentNamer = (0, _defaultNamer.createDefaultNamer)('Component');
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 46;


            for (_iterator = fixturesByComponent.keys()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              componentType = _step.value;
              _compFixtures = fixturesByComponent.get(componentType);
              filePath = componentPaths.get(componentType) || null;
              _name =
              // Try to read the Class/function name at run-time. User can override
              // this for custom naming
              (0, _inferComponentName.inferComponentName)(componentType) ||
              // Use the name that was used to reference the component in one of its
              // fixtures
              componentNames.get(componentType) ||
              // Fallback to "Component", "Component (1)", "Component (2)", etc.
              defaultComponentNamer();
              _namespace = typeof componentType.namespace === 'string' ? componentType.namespace : getFileNamespace(componentCommonDir, filePath);


              components.push({
                filePath: filePath,
                name: _name,
                namespace: _namespace,
                type: componentType,
                fixtures: _compFixtures ? (0, _lodash.sortBy)(_compFixtures, function (f) {
                  return f.name;
                }) : []
              });
            }

            _context.next = 54;
            break;

          case 50:
            _context.prev = 50;
            _context.t0 = _context['catch'](46);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 54:
            _context.prev = 54;
            _context.prev = 55;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 57:
            _context.prev = 57;

            if (!_didIteratorError) {
              _context.next = 60;
              break;
            }

            throw _iteratorError;

          case 60:
            return _context.finish(57);

          case 61:
            return _context.finish(54);

          case 62:
            return _context.abrupt('return', (0, _lodash.sortBy)(components, function (c) {
              return c.name;
            }));

          case 63:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[46, 50, 54, 62], [55,, 57, 61]]);
  }));

  return function getComponents(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _micromatch = require('micromatch');

var _micromatch2 = _interopRequireDefault(_micromatch);

var _util = require('util.promisify');

var _util2 = _interopRequireDefault(_util);

var _commondir = require('commondir');

var _commondir2 = _interopRequireDefault(_commondir);

var _lodash = require('lodash');

var _importModule = require('./utils/importModule');

var _inferComponentName = require('./utils/inferComponentName');

var _getComponentInfoFromFixture = require('./utils/getComponentInfoFromFixture');

var _defaultNamer = require('./utils/defaultNamer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var globAsync = (0, _util2.default)(_glob2.default);

var defaultFileMatch = ['**/__fixture?(s)__/**/*.{js,jsx}', '**/?(*.)fixture?(s).{js,jsx}'];

var defaults = {
  fileMatch: defaultFileMatch,
  cwd: process.cwd()
};

function getCommonDirFromPaths(paths) {
  return paths.length > 0 ? (0, _commondir2.default)(paths) : '';
}

function getFileNamespace(commonDir, filePath) {
  return filePath ? _path2.default.dirname(filePath).slice(commonDir.length + 1) : '';
}