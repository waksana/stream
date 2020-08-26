var {cons, list, Empty} = require('.');
var assert = require('assert');

cons(n => [1, n.map()]);
(ones) => cons(1, ones);

var N = cons(1, () => N.map(n => n + 1)); //nature number list
var ones = cons(1, () => ones);

//combine header and a list into a list
var Z = cons(0, N); //Integer list

assert.deepEqual(N.drop(5).take(5), [6, 7, 8, 9, 10]);
assert.deepEqual(N.filter(a => a % 2 == 0).take(5), [2, 4, 6, 8, 10]);
assert.deepEqual(N.map(a => a + 1).take(3), [2, 3, 4]);
assert.deepEqual(N.zipWith(Z, (n, z) => n * z).take(3), [0, 2, 6]);

//get a infinite prime list (inefficient)
var sieve = ls =>
cons(ls.head, () => sieve(ls.tail.filter(a => a % ls.head != 0)));
var prime = sieve(N.tail);
assert.deepEqual(prime.take(5), [2, 3, 5, 7, 11]);

//fibonacci
var fibs = cons(0, cons(1, () => fibs.zipWith(fibs.tail, (a, b) => a + b)));

assert.deepEqual(fibs.take(6), [0, 1, 1, 2, 3, 5]);

//flatten
assert.deepEqual(ones.map(o => list(1,2,3)).flatten().take(5), [1, 2, 3, 1, 2]);

//bind
assert.deepEqual(list(1, 2, 3).bind(x => list(9, 8, 7).bind(y => x + y > 9 ? list({x, y}) : Empty)).takeAll(), [
  { x: 1, y: 9 },
  { x: 2, y: 9 },
  { x: 2, y: 8 },
  { x: 3, y: 9 },
  { x: 3, y: 8 },
  { x: 3, y: 7 }
]);
