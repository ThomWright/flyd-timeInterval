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

const stream = every(INTERVAL),
      intervalStream = timeInterval(stream);

flyd.stream([intervalStream, stream], () => {
  console.log('Interval:', intervalStream().interval, ', Time:', intervalStream().time);
});

// Interval: 0 , Time: 1434814906566
// Interval: 200 , Time: 1434814906767
// Interval: 200 , Time: 1434814906967
// Interval: 200 , Time: 1434814907167
// Interval: 199 , Time: 1434814907366
```
