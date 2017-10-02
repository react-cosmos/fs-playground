// @flow

import { getComponents } from './fs';
import Italics from '../components/Italics';
import Bold from '../components/Bold';

const res = p => require.resolve(p);

const findByComponentType = (components, type) =>
  components.find(c => c.type === type);

const components = getComponents([
  '**/?(*.)fixture.js'
]);

test('finds fixtures for Italics component', () => {
  const component = findByComponentType(components, Italics);
  if (!component) {
    throw new Error('Component `Italics` not found in results');
  }

  const { name, type, fixtures } = component;
  expect(name).toEqual('Italics');
  expect(type).toEqual(Italics);

  expect(fixtures).toContainEqual({
    name: 'default',
    filePath: res('../components/dupe.fixture'),
    source: {
      component: Italics,
      props: {
        name: 'Johnny'
      }
    }
  });

  expect(fixtures).toContainEqual({
    name: 'default (1)',
    filePath: res('../components/fixture'),
    source: {
      component: Italics,
      props: {
        name: 'John'
      }
    }
  });
});

test('finds fixtures for Bold component', () => {
  const component = findByComponentType(components, Bold);
  if (!component) {
    throw new Error('Component `Bold` not found in results');
  }

  const { name, type, fixtures } = component;
  expect(name).toEqual('Bold');
  expect(type).toEqual(Bold);

  expect(fixtures).toContainEqual({
    name: 'Foo fixture',
    filePath: res('../components/bold.fixture'),
    source: {
      component: Bold,
      name: 'Foo fixture',
      props: {
        name: 'Foo Bar'
      }
    }
  });
});
