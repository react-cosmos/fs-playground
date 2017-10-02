// @flow

import { getComponents } from './fs';
import Italics from '../components/Italics';

const res = p => require.resolve(p);

const findByComponentType = (components, type) =>
  components.find(c => c.type === type);

const components = getComponents([
  '**/fixture.js'
]);

test('reads **/fixture.js', () => {
  const component = findByComponentType(components, Italics);
  expect(component).toEqual({
    name: 'Italics',
    type: Italics,
    fixtures: [
      {
        name: 'default',
        filePath: res('../components/fixture'),
        source: {
          component: Italics,
          props: {
            name: 'John'
          }
        }
      }
    ]
  });
});
