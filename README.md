# fs-playground
Playground for experimenting with a new fs API

## Input
See [utils/fs.test.js](utils/fs.test.js) and [utils/fs.js](utils/fs.js).

```
'**/__fixture?(s)__/**/*.{js,jsx}', '**/?(*.)fixture?(s).{js,jsx}'
```

## Output
See [utils/types.js](utils/types.js).

```
Array [
  Object {
    "fixtures": Array [
      Object {
        "filePath": "/path/to/components/__fixtures__/abra.js",
        "name": "Abracadabra part I",
        "source": Object {
          "component": [Function Bold],
          "name": "Abracadabra part I",
          "props": Object {
            "name": "Abra",
          },
        },
      },
      Object {
        "filePath": "/path/to/components/__fixtures__/cadabra.jsx",
        "name": "Abracadabra part II",
        "source": Object {
          "component": [Function Bold],
          "name": "Abracadabra part II",
          "props": Object {
            "name": "Cadabra",
          },
        },
      },
      Object {
        "filePath": "/path/to/components/bold.fixture.js",
        "name": "Foo fixture",
        "source": Object {
          "component": [Function Bold],
          "name": "Foo fixture",
          "props": Object {
            "name": "Foo Bar",
          },
        },
      },
      Object {
        "filePath": "/path/to/components/fixtures.js",
        "name": "The cat",
        "source": Object {
          "component": [Function Bold],
          "name": "The cat",
          "props": Object {
            "name": "Tom",
          },
        },
      },
      Object {
        "filePath": "/path/to/components/fixtures.js",
        "name": "The mouse",
        "source": Object {
          "component": [Function Bold],
          "name": "The mouse",
          "props": Object {
            "name": "Jerry",
          },
        },
      },
    ],
    "name": "Bold",
    "type": [Function Bold],
  },
  Object {
    "fixtures": Array [
      Object {
        "filePath": "/path/to/components/dupe.fixture.jsx",
        "name": "default",
        "source": Object {
          "component": [Function Italics],
          "props": Object {
            "name": "Johnny",
          },
        },
      },
      Object {
        "filePath": "/path/to/components/fixture.js",
        "name": "default (1)",
        "source": Object {
          "component": [Function Italics],
          "props": Object {
            "name": "John",
          },
        },
      },
    ],
    "name": "Italics",
    "type": [Function Italics],
  },
]
```
