// @flow

import { getComponents } from './fs';
import Italics from '../components/Italics';

const res = p => require.resolve(p);

const findByComponentType = (components, type) =>
  components.find(c => c.type === type);

const components = getComponents([
  '**/?(dupe.)fixture.js'
]);

test('finds fixtures', () => {
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
