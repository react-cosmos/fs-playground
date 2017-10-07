// @flow

import type { ComponentType } from 'react';

/**
 * Infer name from Component type (Class or function)
 */
export function inferComponentName(componentType: ComponentType<*>): string {
  // TODO: Are there cases when .name is missing?
  return componentType.name;
}
