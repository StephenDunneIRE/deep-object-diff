<div align="center">
  <h1>deep-object-diff-mod</h1>

  ❄️

  Deep diff two JavaScript Objects
</div>

<hr />

[![Build Status](https://img.shields.io/travis/StephenDunneIRE/deep-object-diff-mod/master.svg?style=flat-square)](https://travis-ci.org/StephenDunneIRE/deep-object-diff-mod/master)
[![Code Coverage](https://img.shields.io/coveralls/StephenDunneIRE/deep-object-diff-mod.svg?style=flat-square)](https://coveralls.io/github/StephenDunneIRE/deep-object-diff-mod?branch=master)
[![version](https://img.shields.io/npm/v/deep-object-diff-mod.svg?style=flat-square)](https://www.npmjs.com/package/deep-object-diff-mod)
[![downloads](https://img.shields.io/npm/dm/deep-object-diff-mod.svg?style=flat-square)](http://npm-stat.com/charts.html?package=deep-object-diff-mod&from=2016-11-23)
[![MIT License](https://img.shields.io/npm/l/deep-object-diff-mod.svg?style=flat-square)](https://github.com/StephenDunneIRE/deep-object-diff-mod/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A small library that can deep diff two JavaScript Objects, including nested structures of arrays and objects.
This library is a slight mod of Matt Phillips' deep-object-diff package, the only difference being that it will return a 'REMOVED' string instead of undefined in place where objects have been removed from an updated object's array of objects. The use-case for this is for Mongo Database Logging - undefined key-values do not save, meaning logs don't show key-values that have been removed from an object. This solution remedies that issue. 

## Installation
`yarn add deep-object-diff-mod`

`npm i --save deep-object-diff-mod`

## Functions available:
 - [`diff(originalObj, updatedObj)`](#diff)
 returns the difference of the original and updated objects

 - [`addedDiff(original, updatedObj)`](#addeddiff)
 returns only the values added to the updated object

 - [`deletedDiff(original, updatedObj)`](#deleteddiff)
 returns only the values deleted in the updated object

 - [`updatedDiff(original, updatedObj)`](#updateddiff)
 returns only the values that have been changed in the updated object

 - [`detailedDiff(original, updatedObj)`](#detaileddiff)
 returns an object with the added, deleted and updated differences

## Importing

ES6 / Babel:
``` js
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff-mod';
```

ES5:
``` js
const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff-mod");

// OR

const diff = require("deep-object-diff-mod").diff;
const addedDiff = require("deep-object-diff-mod").addedDiff;
const deletedDiff = require("deep-object-diff-mod").deletedDiff;
const detailedDiff = require("deep-object-diff-mod").detailedDiff;
const updatedDiff = require("deep-object-diff-mod").updatedDiff;
```

## Usage:

### `diff`:
```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(diff(lhs, rhs)); // =>
/*
{
  foo: {
    bar: {
      a: {
        '1': 'REMOVED'
      },
      c: {
        '2': 'z'
      },
      d: 'Hello, world!',
      e: 'REMOVED'
    }
  },
  buzz: 'fizz'
}
*/
```

### `addedDiff`:
```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(addedDiff(lhs, rhs));

/*
{
  foo: {
    bar: {
      c: {
        '2': 'z'
      },
      d: 'Hello, world!'
    }
  }
}
*/
```

### `deletedDiff`:
```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(deletedDiff(lhs, rhs));

/*
{
  foo: {
    bar: {
      a: {
        '1': 'REMOVED'
      },
      e: 'REMOVED'
    }
  }
}
*/
```

### `updatedDiff`:
```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(updatedDiff(lhs, rhs));

/*
{
  buzz: 'fizz'
}
*/
```

### `detailedDiff`:
```js
const lhs = {
  foo: {
    bar: {
      a: ['a', 'b'],
      b: 2,
      c: ['x', 'y'],
      e: 100 // deleted
    }
  },
  buzz: 'world'
};

const rhs = {
  foo: {
    bar: {
      a: ['a'], // index 1 ('b')  deleted
      b: 2, // unchanged
      c: ['x', 'y', 'z'], // 'z' added
      d: 'Hello, world!' // added
    }
  },
  buzz: 'fizz' // updated
};

console.log(detailedDiff(lhs, rhs));

/*
{
  added: {
    foo: {
      bar: {
        c: {
          '2': 'z'
        },
        d: 'Hello, world!'
      }
    }
  },
  deleted: {
    foo: {
      bar: {
        a: {
          '1': 'REMOVED'
        },
        e: 'REMOVED'
      }
    }
  },
  updated: {
    buzz: 'fizz'
  }
}
*/
```


## License

MIT
