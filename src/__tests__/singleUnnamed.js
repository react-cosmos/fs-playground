// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/singleUnnamed/Italics';

describe('Single unnamed', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/singleUnnamed')
    });
  });

  it('finds one component', () => {
    expect(components).toHaveLength(1);
  });

  it('finds one fixture', () => {
    expect(components[0].fixtures).toHaveLength(1);
  });

  it('has default fixture name', () => {
    expect(components[0].fixtures[0].name).toBe('default');
  });

  it('has fixture path', () => {
    expect(components[0].fixtures[0].filePath).toBe(
      require.resolve('./fileMocks/singleUnnamed/fixture')
    );
  });

  it('has fixture source', () => {
    expect(components[0].fixtures[0].source).toEqual({
      component: Italics,
      props: {
        name: 'John'
      }
    });
  });
});
