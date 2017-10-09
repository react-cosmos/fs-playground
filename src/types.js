// @flow

import type { ComponentType } from 'react';

export type Fixture = {
  name: string,
  namespace: string,
  filePath: string,
  source: Object
};

export type Fixtures = Array<Fixture>;

export type FixturesByComponent = Map<ComponentType<*>, Fixtures>;

export type Component = {
  name: string,
  namespace: string,
  filePath: string | null,
  type: ComponentType<*>,
  fixtures: Fixtures
};

export type Components = Array<Component>;
