// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Strike from './fileMocks/createClassNamed/Strike';

describe('createReactClass named component', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/createClassNamed')
    });
  });

  it('finds one component', () => {
    expect(components).toHaveLength(1);
  });

  it('infers component name', () => {
    expect(components[0].name).toBe('Del');
  });

  it('references component type', () => {
    expect(components[0].type).toBe(Strike);
  });
});
