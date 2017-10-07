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

  it('infers component names', () => {
    expect(components[0].name).toBe('Italics');
    expect(components[1].name).toBe('Bold');
  });

  it('references component types', () => {
    expect(components[0].type).toBe(Italics);
    expect(components[1].type).toBe(Bold);
  });

  describe('Italics fixture', () => {
    let fixtures;

    beforeEach(() => {
      fixtures = components[0].fixtures;
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

  describe('Bold fixture', () => {
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
        component: Bold,
        props: {
          name: 'Sarah'
        }
      });
    });
  });
});
