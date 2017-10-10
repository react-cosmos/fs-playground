# fs-playground
Playground for experimenting with a new fs API

See [src/__tests__](src/__tests__) for use cases and [utils/getComponents.js](utils/getComponents.js) for implementation.

## Input

These are the default file patterns
```
'**/__fixture?(s)__/**/*.{js,jsx}', '**/?(*.)fixture?(s).{js,jsx}'
```

Any variation of `foo.fixture.js`, `fixtures.js`, `__fixtures__/default.js` works be default.

## Output

See [src/types.js](src/types.js).
