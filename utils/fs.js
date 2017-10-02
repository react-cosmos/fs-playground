// @flow

import glob from 'glob';
import micromatch from 'micromatch';
import { sortBy } from 'lodash';

import type { ComponentType } from 'react';
import type { Components, FixturesByComponent } from './types';

function inferComponentName(componentType: ComponentType<*>): string {
  // TODO: Are there cases when .name is missing?
  return componentType.name;
}

export function getComponents(fileMatch: Array<string>): Components {
  const allPaths = glob.sync('!(node_modules)/**/*', { absolute: true });
  const fixturePaths = micromatch(allPaths, fileMatch);

  // Group all fixtures by component
  const fixtures: FixturesByComponent = new Map();
  const unnamedByComponent: Map<ComponentType<*>, number> = new Map();
  fixturePaths.forEach(fixturePath => {
    const source = require(fixturePath).default;

    // Fixture files can export one fixture object or a list of fixture object
    const fixturesInFile = Array.isArray(source) ? source : [source];
    fixturesInFile.forEach(fixture => {
      const { component, name } = fixture;

      // Is this the first fixture for this component?
      let compFixtures = fixtures.get(component);
      if (!compFixtures) {
        compFixtures = [];
        fixtures.set(component, compFixtures);
        unnamedByComponent.set(component, 0);
      }

      // Unnamed fixtures will be named: default, default (1), default (2)...
      const unnamed = unnamedByComponent.get(component);
      let inferredName = name;
      if (!inferredName) {
        inferredName = unnamed ? `default (${unnamed})` : 'default';
        unnamedByComponent.set(component, unnamed + 1);
      }

      compFixtures.push({
        filePath: fixturePath,
        name: inferredName,
        source: fixture
      });
    });
  });

  // Add component meta data around fixtures
  const components: Components = [];
  for (let componentType of fixtures.keys()) {
    const compFixtures = fixtures.get(componentType);

    components.push({
      name: inferComponentName(componentType),
      type: componentType,
      fixtures: compFixtures ? sortBy(compFixtures, f => f.name) : []
    });
  }

  return components;
}
