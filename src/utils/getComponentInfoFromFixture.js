// @flow

import fs from 'fs';
import path from 'path';
import promisify from 'util.promisify';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';

const readFileAsync = promisify(fs.readFile);

type Args = {
  fixturePath: string,
  fixtureIndex: number | null
};

type Output = {
  // The name of the component might also come in handy in case we couldn't
  // determine it otherwise
  componentName: string | null,
  componentPath: string | null
};

const defaults = {
  fixtureIndex: null
};

/**
 * Detect component name and file path from fixture code (statically)
 *
 * Note: There's no 100% guarantee. Components can be inlined in the same file
 * as fixtures, in which case the path returned will be null.
 *
 * TODO: Support CJS
 */
export async function getComponentInfoFromFixture(args: Args): Promise<Output> {
  const { fixturePath, fixtureIndex } = { ...defaults, ...args };

  // TODO: Memoize
  const code = await readFileAsync(fixturePath, 'utf8');

  // TODO: How do we support everything user is using? (eg. Flow, TS, etc)
  const ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });

  return new Promise(resolve => {
    traverse(ast, {
      ExportDefaultDeclaration(exportPath) {
        // Get a list of all imports to query them later
        const imports = exportPath.parent.body.filter(
          n => n.type === 'ImportDeclaration'
        );
        const exportBody = exportPath.node.declaration;

        // Support for single and multi fixture files
        let fixtureObject;
        if (exportBody.type === 'ArrayExpression') {
          fixtureObject = exportBody.elements[fixtureIndex];
        } else if (exportBody.type === 'ObjectExpression') {
          fixtureObject = exportBody;
        }

        if (!fixtureObject) {
          // Could not understand fixture contents so we report that we were
          // unsuccessful in detecting the component path
          resolve({
            componentName: null,
            componentPath: null
          });
        } else {
          const componentProperty = fixtureObject.properties.find(
            prop => prop.key.name === 'component'
          );

          // TODO: Warn and return if component property wasn't found on fixture
          const componentName = componentProperty.value.name;
          const componentPath = getImportPathByName(imports, componentName);

          if (!componentPath) {
            // Seems like there's no import corresponding to fixture.component.
            // Maybe the component is declared inside the fixture.
            resolve({
              componentName,
              componentPath: null
            });
          } else {
            // TODO: What if path isn't relative?
            const componentAbsPath = path.join(
              path.dirname(fixturePath),
              componentPath
            );

            try {
              const componentResolvedPath = require.resolve(componentAbsPath);
              resolve({
                componentName,
                componentPath: componentResolvedPath
              });
            } catch (e) {
              resolve({
                componentName,
                componentPath: null
              });
            }
          }
        }
      }
    });
  });
}

function getImportPathByName(imports, componentName: string): string | null {
  // TODO: Support `import { component }` or `import { component as component }`
  const relevantImport = imports.find(
    i => i.specifiers[0].local.name === componentName
  );

  return relevantImport ? relevantImport.source.value : null;
}
