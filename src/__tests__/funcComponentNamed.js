// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/funcComponentNamed/Italics';

describe('Functional named component', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/funcComponentNamed')
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
});
