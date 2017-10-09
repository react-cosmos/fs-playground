// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Bold from './fileMocks/esClassNamed/Bold';

describe('ES class named', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/esClassNamed')
    });
  });

  it('finds one component', () => {
    expect(components).toHaveLength(1);
  });

  it('infers component name', () => {
    expect(components[0].name).toBe('Bold');
  });

  it('references component type', () => {
    expect(components[0].type).toBe(Bold);
  });
});
