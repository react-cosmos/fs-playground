// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/components/Italics';

describe('Singles unnamed', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/singlesUnnamed')
    });
  });

  it('finds one component', () => {
    expect(components).toHaveLength(1);
  });

  it('finds two fixtures', () => {
    expect(components[0].fixtures).toHaveLength(2);
  });

  it('have default fixture names', () => {
    expect(components[0].fixtures[0].name).toBe('default');
    expect(components[0].fixtures[1].name).toBe('default (1)');
  });

  it('have fixture paths', () => {
    // Warning: Order depends on node-glob
    expect(components[0].fixtures[0].filePath).toBe(
      require.resolve('./fileMocks/singlesUnnamed/clone.fixture')
    );
    expect(components[0].fixtures[1].filePath).toBe(
      require.resolve('./fileMocks/singlesUnnamed/fixture')
    );
  });

  it('have fixture sources', () => {
    // Warning: Order depends on node-glob
    expect(components[0].fixtures[0].source).toEqual({
      component: Italics,
      props: {
        name: 'Johnny'
      }
    });
    expect(components[0].fixtures[1].source).toEqual({
      component: Italics,
      props: {
        name: 'John'
      }
    });
  });
});
