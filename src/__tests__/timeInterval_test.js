/*global describe*/
/*global it*/
/*global beforeEach*/
// /*global afterEach*/
/*global expect*/

import flyd from 'flyd';
import every from 'flyd-every';
import timeInterval from '../timeInterval.js';

const LIMIT = 5;
const INTERVAL = 200;
const TOLERANCE = 0.05; // 5%

const range = function* (low, high) {
  var i = low;
  while(i <= high) {
    yield i++;
  }
};

const average = function(array) {
  return array.reduce((prev, val) => {
    return prev + val;
  }) / array.length;
};

const bounds = function(val, tolerance) {
  const d = val * tolerance;
  return [val - d, val = d];
};

describe('timeInterval', function() {

  let every200;

  beforeEach(() => {
    every200 = every(INTERVAL);
  });

  it('should pass through the wrapped stream\'s output', function(done) {
    const value = 0;
    const deltas = timeInterval(every200);

    flyd.stream([deltas], () => {
      expect(deltas().value).to.equal(value);
      every200.end();
      done();
    });

    every200({value});
  });

  it('should time correctly', function(done) {
    const deltas = timeInterval(every200);
    const intervals = [];
    let i = 0;

    flyd.stream([deltas], () => {
      intervals.push(deltas().interval);
      i++;
      if (i === LIMIT) {
        every200.end();
        expect(average(intervals)).to.be.within(...bounds(INTERVAL, TOLERANCE));
        done();
      }
    });

    [...range(1, LIMIT)]
      .map(n => ({n}))
      .forEach(n => deltas(n));
  });
});
