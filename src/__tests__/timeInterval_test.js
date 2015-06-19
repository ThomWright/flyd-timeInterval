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

  it('should pass through the wrapped stream\'s output', function(done) {
    const value = 0,
          stream = flyd.stream(),
          deltas = timeInterval(stream);

    flyd.stream([deltas], () => {
      expect(deltas().value).to.equal(value);
      done();
    });

    stream({value});
  });

  it('should time correctly', function(done) {
    const stream = every(INTERVAL),
          deltas = timeInterval(stream),
          intervals = [];
    let i = 0;

    flyd.stream([deltas], () => {
      i++;
      if (i > 1) { // ignore first interval - it'll be 0
        intervals.push(deltas().interval);
      }
      if (i === LIMIT) {
        stream.end(true);
        expect(average(intervals)).to.be.within(...bounds(INTERVAL, TOLERANCE));
        done();
      }
    });
  });
});
