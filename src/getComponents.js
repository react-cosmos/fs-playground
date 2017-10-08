// @flow

import glob from 'glob';
import micromatch from 'micromatch';
import promisify from 'util.promisify';
import { sortBy } from 'lodash';
import { importModule } from './utils/importModule';
import { inferComponentName } from './utils/inferComponentName';
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
  const fixtures: FixturesByComponent = new Map();
  const defaultFixtureNamer = createDefaultNamer('default');

  fixturePaths.forEach(fixturePath => {
    const source = importModule(require(fixturePath));

    // Fixture files can export one fixture object or a list of fixture object
    const fixturesInFile = Array.isArray(source) ? source : [source];

    fixturesInFile.forEach(fixture => {
      const { component, name } = fixture;

      // Is this the first fixture for this component?
      let compFixtures = fixtures.get(component);
      if (!compFixtures) {
        compFixtures = [];
        fixtures.set(component, compFixtures);
      }

      compFixtures.push({
        filePath: fixturePath,
        name: name || defaultFixtureNamer(component),
        source: fixture
      });
    });
  });

  // Add component meta data around fixtures
  const components: Components = [];
  const defaultComponentNamer = createDefaultNamer('Component');

  for (let componentType of fixtures.keys()) {
    const compFixtures = fixtures.get(componentType);
    const name = inferComponentName(componentType) || defaultComponentNamer();

    components.push({
      name,
      type: componentType,
      fixtures: compFixtures ? sortBy(compFixtures, f => f.name) : []
    });
  }

  return sortBy(components, c => c.name);
}
