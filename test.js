var List = require('.');
var assert = require('assert');

var N = List.cons(1, () => N.map(n => n + 1)); //nature number list
var ones = List.cons(1, () => ones);

//combine header and a list into a list
var Z = List.cons(0, () => N); //Integer list

assert.deepEqual(N.drop(5).take(5), [6, 7, 8, 9, 10]);
assert.deepEqual(N.filter(a => a % 2 == 0).take(5), [2, 4, 6, 8, 10]);
assert.deepEqual(N.map(a => a + 1).take(3), [2, 3, 4]);
assert.deepEqual(N.zipWith(Z, (n, z) => n * z).take(3), [0, 2, 6]);

//get a infinite prime list (inefficient)
var sieve = ls =>
List.cons(ls.head, () => sieve(ls.tail.filter(a => a % ls.head != 0)));
var prime = sieve(N.tail);
assert.deepEqual(prime.take(5), [2, 3, 5, 7, 11]);

//fibonacci
var fibs = List.cons(0, () => List.cons(1, () => fibs.zipWith(fibs.tail, (a, b) => a + b)));

assert.deepEqual(fibs.take(6), [0, 1, 1, 2, 3, 5]);
