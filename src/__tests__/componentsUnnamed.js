// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import UnnamedClass from './fileMocks/componentsUnnamed/components/UnnamedClass';
import UnnamedFunction from './fileMocks/componentsUnnamed/components/UnnamedFunction';

describe('Components unnamed', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/componentsUnnamed')
    });
  });

  it('finds all component', () => {
    expect(components).toHaveLength(4);
  });

  it('has default component names', () => {
    expect(components[0].name).toBe('Component');
    expect(components[1].name).toBe('Component (1)');
    expect(components[2].name).toBe('UnnamedClass');
    expect(components[3].name).toBe('UnnamedFunction');
  });

  it('references component types', () => {
    // Component 1 & 2 are declared annonymously
    expect(components[2].type).toBe(UnnamedClass);
    expect(components[3].type).toBe(UnnamedFunction);
  });
});
