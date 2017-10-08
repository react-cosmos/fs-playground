// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import UnnamedClass from './fileMocks/components/UnnamedClass';
import UnnamedFunction from './fileMocks/components/UnnamedFunction';

describe('Components unnamed', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/componentsUnnamed')
    });
  });

  it('finds both component', () => {
    expect(components).toHaveLength(2);
  });

  it('has default component names', () => {
    expect(components[0].name).toBe('Component');
    expect(components[1].name).toBe('Component (1)');
  });

  it('references component types', () => {
    expect(components[0].type).toBe(UnnamedClass);
    expect(components[1].type).toBe(UnnamedFunction);
  });
});
