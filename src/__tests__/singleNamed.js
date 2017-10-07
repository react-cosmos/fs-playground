// @flow

import path from 'path';
import { getComponents } from '../fs';
import Italics from './fileMocks/components/Italics';

describe('Single named', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/singleNamed')
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

  it('finds one fixture', () => {
    expect(components[0].fixtures).toHaveLength(1);
  });

  it('has default fixture name', () => {
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
