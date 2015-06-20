flyd-timeInterval
=================

[![Travis](https://img.shields.io/travis/ThomWright/flyd-timeInterval.svg?style=flat-square)](https://travis-ci.org/ThomWright/flyd-timeInterval)
[![npm](https://img.shields.io/npm/v/flyd-timeinterval.svg?style=flat-square)](https://www.npmjs.com/package/flyd-timeinterval)
[![David](https://img.shields.io/david/ThomWright/flyd-timeInterval.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-timeInterval)
[![David](https://img.shields.io/david/dev/ThomWright/flyd-timeInterval.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-timeInterval#info=devDependencies)

Records the time interval between consecutive values emitted from a stream.

**Signature**

`Stream -> Stream`

**Usage**

```javascript
import every from 'flyd-every';
import timeInterval from 'flyd-timeinterval';

const stream = every(1000);
const deltas = timeInterval(stream);

flyd.map(function(x) {
  console.log('Output', x);
}, deltas);

// Output { interval: 0 }
// Output { interval: 1002 }
// Output { interval: 1005 }
// Output { interval: 991 }
// Output { interval: 1000 }
```
