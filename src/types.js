// @flow

import type { ComponentType } from 'react';

export type Fixture = {
  filePath: string,
  fixtureIndex: number | null,
  name: string,
  namespace: string
};

export type Fixtures = Array<Fixture>;

export type FixturesByComponent = Map<ComponentType<*>, Fixtures>;

export type Component = {
  filePath: string | null,
  name: string,
  namespace: string,
  type: ComponentType<*>,
  fixtures: Fixtures
};

export type Components = Array<Component>;
