// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/singleNamed/Italics';

describe('Named single fixture file', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/singleNamed')
    });
  });

  it('has custom fixture name', () => {
    expect(components[0].fixtures[0].name).toBe('foo fixture');
  });

  it('has fixture path', () => {
    expect(components[0].fixtures[0].filePath).toBe(
      require.resolve('./fileMocks/singleNamed/fixture')
    );
  });

  it('has fixture source', () => {
    expect(components[0].fixtures[0].source).toEqual({
      component: Italics,
      name: 'foo fixture',
      props: {
        name: 'John'
      }
    });
  });
});
