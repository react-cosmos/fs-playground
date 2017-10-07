// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/components/Italics';

describe('Single unnamed duplicates', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/singleUnnamedDuplicates')
    });
  });

  it('finds one component', () => {
    expect(components).toHaveLength(1);
  });

  it('infers component name', () => {
    expect(components[0].name).toBe('Italics');
  });

  it('references component type', () => {
    expect(components[0].type).toBe(Italics);
  });

  it('finds two fixtures', () => {
    expect(components[0].fixtures).toHaveLength(2);
  });

  it('have default fixture names', () => {
    expect(components[0].fixtures[0].name).toBe('default');
    expect(components[0].fixtures[1].name).toBe('default (1)');
  });

  it('have fixture paths', () => {
    // Warning: Order is not controlled and subject to change
    expect(components[0].fixtures[0].filePath).toBe(
      require.resolve('./fileMocks/singleUnnamedDuplicates/clone.fixture')
    );
    expect(components[0].fixtures[1].filePath).toBe(
      require.resolve('./fileMocks/singleUnnamedDuplicates/fixture')
    );
  });

  it('have fixture sources', () => {
    // Warning: Order is not controlled and subject to change
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
