// @flow

import path from 'path';
import glob from 'glob';
import micromatch from 'micromatch';
import promisify from 'util.promisify';
import commondir from 'commondir';
import { sortBy } from 'lodash';
import { importModule } from './utils/importModule';
import { inferComponentName } from './utils/inferComponentName';
import { getComponentInfoFromFixture } from './utils/getComponentInfoFromFixture';
import { createDefaultNamer } from './utils/defaultNamer';

import type { ComponentType } from 'react';
import type { Components, FixturesByComponent } from './types';

const globAsync = promisify(glob);

type Args = ?{
  fileMatch?: Array<string>,
  cwd?: string
};

const defaultFileMatch = [
  '**/__fixture?(s)__/**/*.{js,jsx}',
  '**/?(*.)fixture?(s).{js,jsx}'
];

const defaults = {
  fileMatch: defaultFileMatch,
  cwd: process.cwd()
};

export async function getComponents(args: Args): Promise<Components> {
  const { fileMatch, cwd } = { ...defaults, ...args };

  // TODO: How do we watch for file changes?
  const allPaths = await globAsync('**/*', {
    cwd,
    absolute: true,
    ignore: '**/node_modules/**'
  });
  const fixturePaths = micromatch(allPaths, fileMatch);

  // Group all fixtures by component
  const fixturesByComponent: FixturesByComponent = new Map();
  const componentNames: Map<ComponentType<*>, string> = new Map();
  const componentPaths: Map<ComponentType<*>, string> = new Map();
  const defaultFixtureNamer = createDefaultNamer('default');

  // Can't use forEach because we want each (async) loop to be serial
  for (let i = 0; i < fixturePaths.length; i++) {
    const fixturePath = fixturePaths[i];
    const source = importModule(require(fixturePath));

    // Fixture files can export one fixture object or a list of fixture object
    const isMultiFixture = Array.isArray(source);
    const fixturesInFile = isMultiFixture ? source : [source];

    // Can't use forEach because we want each (async) loop to be serial
    for (let j = 0; j < fixturesInFile.length; j++) {
      const fixture = fixturesInFile[j];
      const { component, name } = fixture;

      // Is this the first fixture for this component?
      let compFixtures = fixturesByComponent.get(component);
      if (!compFixtures) {
        compFixtures = [];
        fixturesByComponent.set(component, compFixtures);
      }

      compFixtures.push({
        filePath: fixturePath,
        name: name || defaultFixtureNamer(component),
        source: fixture
      });

      if (!componentPaths.get(component)) {
        const {
          componentName,
          componentPath
        } = await getComponentInfoFromFixture({
          fixturePath,
          fixtureIndex: isMultiFixture ? j : null
        });

        // It's possible to identify the component name but not the file path
        if (componentName) {
          componentNames.set(component, componentName);
        }
        if (componentPath) {
          componentPaths.set(component, componentPath);
        }
      }
    }
  }

  // Add component meta data around fixtures
  const components: Components = [];
  const defaultComponentNamer = createDefaultNamer('Component');
  const componentCommonDir = getCommonDirFromPaths(componentPaths);

  for (let componentType of fixturesByComponent.keys()) {
    const compFixtures = fixturesByComponent.get(componentType);
    const filePath = componentPaths.get(componentType) || null;
    const name =
      // Try to read the Class/function name at run-time. User can override
      // this for custom naming
      inferComponentName(componentType) ||
      // Use the name that was used to reference the component in one of its
      // fixtures
      componentNames.get(componentType) ||
      // Fallback to "Component", "Component (1)", "Component (2)", etc.
      defaultComponentNamer();
    const namespace = getFileNamespace(componentCommonDir, filePath);

    components.push({
      name,
      namespace,
      filePath,
      type: componentType,
      fixtures: compFixtures ? sortBy(compFixtures, f => f.name) : []
    });
  }

  return sortBy(components, c => c.name);
}

function getCommonDirFromPaths(paths: Map<*, string>) {
  // Common dir isn't going to be used if we don't know of any component path
  return paths.size > 0 ? commondir(Array.from(paths.values())) : '';
}

function getFileNamespace(commonDir, filePath) {
  return filePath ? path.dirname(filePath).slice(commonDir.length + 1) : '';
}
