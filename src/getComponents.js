// @flow

import glob from 'glob';
import micromatch from 'micromatch';
import promisify from 'util.promisify';
import { sortBy } from 'lodash';
import { importModule } from './utils/importModule';
import { inferComponentName } from './utils/inferComponentName';
import { inferComponentPath } from './utils/inferComponentPath';
import { createDefaultNamer } from './utils/defaultNamer';

import type { ComponentType } from 'react';
import type { Components, FixturesByComponent } from './types';

const globAsync = promisify(glob);

type args = ?{
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

export async function getComponents(args: args): Promise<Components> {
  const { fileMatch, cwd } = { ...defaults, ...args };

  const allPaths = await globAsync('**/*', {
    cwd,
    absolute: true,
    ignore: '**/node_modules/**'
  });
  const fixturePaths = micromatch(allPaths, fileMatch);

  // Group all fixtures by component
  const fixturesByComponent: FixturesByComponent = new Map();
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
        const componentPath = await inferComponentPath({
          fixturePath,
          fixtureIndex: isMultiFixture ? j : null
        });

        if (componentPath) {
          componentPaths.set(component, componentPath);
        }
      }
    }
  }

  // Add component meta data around fixtures
  const components: Components = [];
  const defaultComponentNamer = createDefaultNamer('Component');

  for (let componentType of fixturesByComponent.keys()) {
    const compFixtures = fixturesByComponent.get(componentType);
    const name = inferComponentName(componentType) || defaultComponentNamer();

    components.push({
      name,
      filePath: componentPaths.get(componentType) || null,
      type: componentType,
      fixtures: compFixtures ? sortBy(compFixtures, f => f.name) : []
    });
  }

  return sortBy(components, c => c.name);
}
