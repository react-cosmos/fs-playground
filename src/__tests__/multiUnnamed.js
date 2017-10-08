// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/components/Italics';
import Bold from './fileMocks/components/Bold';

describe('Multi unnamed', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/multiUnnamed')
    });
  });

  it('finds two component', () => {
    expect(components).toHaveLength(2);
  });

  describe('Bold fixtures', () => {
    let fixtures;

    beforeEach(() => {
      fixtures = components[0].fixtures;
    });

    it('are two', () => {
      expect(fixtures).toHaveLength(2);
    });

    it('have default names', () => {
      expect(fixtures[0].name).toBe('default');
      expect(fixtures[1].name).toBe('default (1)');
    });

    it('have multi file paths', () => {
      expect(fixtures[0].filePath).toBe(
        require.resolve('./fileMocks/multiUnnamed/fixtures')
      );
      expect(fixtures[1].filePath).toBe(
        require.resolve('./fileMocks/multiUnnamed/fixtures')
      );
    });

    it('have sources', () => {
      expect(fixtures[0].source).toEqual({
        component: Bold,
        props: {
          name: 'Alina'
        }
      });
      expect(fixtures[1].source).toEqual({
        component: Bold,
        props: {
          name: 'Sarah'
        }
      });
    });
  });

  describe('Italics fixture', () => {
    let fixtures;

    beforeEach(() => {
      fixtures = components[1].fixtures;
    });

    it('is one', () => {
      expect(fixtures).toHaveLength(1);
    });

    it('has default name', () => {
      expect(fixtures[0].name).toBe('default');
    });

    it('has multi file path', () => {
      expect(fixtures[0].filePath).toBe(
        require.resolve('./fileMocks/multiUnnamed/fixtures')
      );
    });

    it('has source', () => {
      expect(fixtures[0].source).toEqual({
        component: Italics,
        props: {
          name: 'John'
        }
      });
    });
  });
});
