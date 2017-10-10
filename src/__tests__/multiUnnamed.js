// @flow

import path from 'path';
import { getComponents } from '../getComponents';
import Italics from './fileMocks/multiUnnamed/Italics';
import Bold from './fileMocks/multiUnnamed/Bold';

describe('Unnamed multi fixture file', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/multiUnnamed')
    });
  });

  describe('Bold fixtures', () => {
    let fixtures;

    beforeEach(() => {
      fixtures = components[0].fixtures;
    });

    it('has "default" name', () => {
      expect(fixtures[0].name).toBe('default');
    });

    it('has "default (1)" name', () => {
      expect(fixtures[1].name).toBe('default (1)');
    });

    it('has multi file path', () => {
      expect(fixtures[0].filePath).toBe(
        require.resolve('./fileMocks/multiUnnamed/fixtures')
      );
    });

    it('has multi file path', () => {
      expect(fixtures[1].filePath).toBe(
        require.resolve('./fileMocks/multiUnnamed/fixtures')
      );
    });

    it('has source', () => {
      expect(fixtures[0].source).toEqual({
        component: Bold,
        props: {
          name: 'Alina'
        }
      });
    });

    it('has source', () => {
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

    it('has "default" name', () => {
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
