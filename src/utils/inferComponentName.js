// @flow

import type { ComponentType } from 'react';

/**
 * Infer name from Component type (Class or function)
 */
export function inferComponentName(componentType: ComponentType<*>): ?string {
  // TODO: Are there cases when .name is missing?
  return (
    // .displayName property can be added on all types of components.
    // Warnings: displayName needs to be a static property on ES classes (not
    // an instance property!)
    componentType.displayName ||
    // .name works automatically for:
    // - Named ES classes
    // - Named arrow functions
    componentType.name
  );
}
