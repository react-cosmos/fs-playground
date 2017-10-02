// @flow

import glob from 'glob';
import micromatch from 'micromatch';

import type { ComponentType } from 'react';
import type { Components, FixturesByComponent } from './types';

function inferComponentName(componentType: ComponentType<*>): string {
  return componentType.name;
}

export function getComponents(fileMatch: Array<string>): Components {
  const allPaths = glob.sync('!(node_modules)/**/*', { absolute: true });
  const fixturePaths = micromatch(allPaths, fileMatch);

  // Group all fixtures by component
  const fixtures: FixturesByComponent = new Map();
  fixturePaths.forEach(fixturePath => {
    const source = require(fixturePath).default;
    const { component } = source;

    let compFixtures = fixtures.get(component);
    if (!compFixtures) {
      compFixtures = [];
      fixtures.set(component, compFixtures);
    }

    compFixtures.push({
      filePath: fixturePath,
      // name: fixture.name || 'default'
      name: 'default',
      source
    });
  });

  // Add component meta data around fixtures
  const components: Components = [];
  for (let componentType of fixtures.keys()) {
    const compFixtures = fixtures.get(componentType);

    components.push({
      name: inferComponentName(componentType),
      type: componentType,
      fixtures: compFixtures || []
    });
  }

  return components;
}
