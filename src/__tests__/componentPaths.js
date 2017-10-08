// @flow

import path from 'path';
import { getComponents } from '../getComponents';

describe('Component paths', () => {
  let components;

  beforeEach(async () => {
    components = await getComponents({
      cwd: path.join(__dirname, 'fileMocks/componentPaths')
    });
  });

  it('detects path for components with own file', () => {
    expect(components[0].filePath).toBe(
      require.resolve('./fileMocks/components/Bold')
    );
    expect(components[2].filePath).toBe(
      require.resolve('./fileMocks/components/Italics')
    );
  });

  it('sets null path for components without own file', () => {
    expect(components[1].filePath).toBe(null);
  });
});
