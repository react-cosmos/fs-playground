// @flow

import path from 'path';
import { getComponents } from '../getComponents';

// Checking the order of fixtures if irrelevant in this these tests,
// so we target fixture by name instead
function getFixtureByName(fixtures, fixtureName) {
  const fixture = fixtures.find(f => f.name === fixtureName);
  if (!fixture) {
    throw new Error(`Could not find fixture ${fixtureName}`);
  }

  return fixture;
}

describe('Fixture namespace', () => {
  let components;
  let fixtures;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/fixtureNamespace')
    });
    fixtures = components[0].fixtures;
  });

  it('sets "" namespace', () => {
    const foo = getFixtureByName(fixtures, 'foo');
    expect(foo.namespace).toBe('');
  });

  it('sets "Header" namespace', () => {
    const bar = getFixtureByName(fixtures, 'bar');
    expect(bar.namespace).toBe('nested');
  });

  it('sets "Header/User" namespace', () => {
    const baz = getFixtureByName(fixtures, 'baz');
    expect(baz.namespace).toBe('nested/again');
  });
});
