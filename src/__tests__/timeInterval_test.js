/*global describe*/
/*global it*/
// /*global beforeEach*/
// /*global afterEach*/
/*global expect*/

import flyd from 'flyd';
import every from 'flyd-every';
import timeInterval from '../timeInterval.js';

const LIMIT = 5;
const INTERVAL = 200;
const TOLERANCE = 0.05; // 5%

const average = function(array) {
  return array.reduce((prev, val) => {
    return prev + val;
  }) / array.length;
};

const bounds = function(val, tolerance) {
  const d = val * tolerance;
  return [val - d, val + d];
};

describe('timeInterval', function() {

  it('should allow separate use of original stream and timed', function(done) {
    let value = 0;
    const stream = every(INTERVAL).map(() => ++value),
          intervalStream = timeInterval(stream);

    flyd.stream([intervalStream, stream], () => {
      if (value < LIMIT) {
        expect(stream()).to.equal(value);
      } else {
        stream.end(true);
        done();
      }
    });
  });

  it('should time correctly', function(done) {
    const stream = every(INTERVAL),
          intervalStream = timeInterval(stream),
          intervals = [];
    let i = 0;

    flyd.stream([intervalStream], () => {
      i++;
      if (i > 1) { // ignore first interval - it'll be 0
        intervals.push(intervalStream());
      }
      if (i === LIMIT) {
        stream.end(true);
        expect(average(intervals)).to.be.within(...bounds(INTERVAL, TOLERANCE));
        done();
      }
    });
  });
});
