// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/components/Italics';
import Bold from './fileMocks/components/Bold';

describe('Multi named', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/multiNamed')
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
      // Sorted by name
      expect(fixtures[0].name).toBe('A fix');
      expect(fixtures[1].name).toBe('S fix');
    });

    it('have multi file paths', () => {
      expect(fixtures[0].filePath).toBe(
        require.resolve('./fileMocks/multiNamed/fixtures')
      );
      expect(fixtures[1].filePath).toBe(
        require.resolve('./fileMocks/multiNamed/fixtures')
      );
    });

    it('have sources', () => {
      // Sorted by name
      expect(fixtures[0].source).toEqual({
        name: 'A fix',
        component: Bold,
        props: {
          name: 'Alina'
        }
      });
      expect(fixtures[1].source).toEqual({
        name: 'S fix',
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
      expect(fixtures[0].name).toBe('J fix');
    });

    it('has multi file path', () => {
      expect(fixtures[0].filePath).toBe(
        require.resolve('./fileMocks/multiNamed/fixtures')
      );
    });

    it('has source', () => {
      expect(fixtures[0].source).toEqual({
        name: 'J fix',
        component: Italics,
        props: {
          name: 'John'
        }
      });
    });
  });
});
