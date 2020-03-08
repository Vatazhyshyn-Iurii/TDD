// day 18 - task 1
// http://tddbin.com/#?kata=es6/language/array-api/from
// 29: array - `Array.from` static method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.from` converts an array-like object or list into an Array', () => {
  const arrayLike = {0: 'one', 1: 'two', length: 2};
  it('call `Array.from` with an array-like object', function() {
    const arr = Array.from(arrayLike);
    assert.deepEqual(arr, ['one', 'two']);
  });
  it('a DOM node`s classList object can be converted', function() {
    const domNode = document.createElement('span');
    domNode.classList.add('some');
    domNode.classList.add('other');
    const classList = Array.from(domNode.classList);
    assert.equal(''+classList, ''+['some', 'other']);
  });
  it('convert a NodeList to an Array and `filter()` works on it', function() {
    const nodeList = document.createElement('span');
    const divs = Array.from(nodeList);
    assert.deepEqual(divs.length, 0);
  });
  describe('custom conversion using a map function as second param', () => {
    it('we can modify the value before putting it in the array', function() {
      const arr = Array.from(arrayLike, (value) => value.toUpperCase());
      assert.deepEqual(arr, ['ONE', 'TWO']);
    });
    it('and we also get the object`s key as second parameter', function() {
      const arr = Array.from(arrayLike, (value, key) => `${key}=${value}`);
      assert.deepEqual(arr, ['0=one', '1=two']);
    });
  });
});



// day 18 - task 2
// http://tddbin.com/#?kata=es6/language/array-api/of
// 30: array - `Array.of` static method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.of` creates an array with the given arguments as elements', () => {
  it('dont mix it up with `Array(10)`, where the argument is the array length', () => {
    const arr = Array.of(10);
    assert.deepEqual(arr, [10]);
  });
  it('puts all arguments into array elements', () => {
    const arr = Array.of(1, 2);
    assert.deepEqual(arr, [1, 2]);
  });
  it('takes any kind and number of arguments', () => {
    const starter = [1, 2];
    const end = [3, '4'];
    const arr = Array.of(starter, ...end);
    assert.deepEqual(arr, [[1, 2], 3, '4']);
  });
});



// day 18 - task 3
// http://tddbin.com/#?kata=es6/language/array-api/fill
// 31: array - `Array.prototype.fill` method
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.fill` can fill up an array with one value', () => {
  it('`fill(0)` will populate `0` into each array element', function() {
    const arr = new Array(3).fill(0);
    assert.deepEqual(arr, [0, 0, 0]);
  });
  it('fill only changes content, adds no new elements', function() {
    const arr = [].fill();
    assert.deepEqual(arr, []);
  });
  it('second parameter to `fill()` is the position where to start filling', function() {
    const fillPosition = 2;
    const arr = [1,2,3].fill(42, fillPosition);
    assert.deepEqual(arr, [1, 2, 42]);
  });
  it('third parameter is the position where filling stops', function() {
    const fillStartAt = 1;
    const fillEndAt = 2;
    const arr = [1,2,3].fill(42, fillStartAt, fillEndAt);
    assert.deepEqual(arr, [1, 42, 3]);
  });
});



// day 18 - task 4
// http://tddbin.com/#?kata=es6/language/array-api/find
// 32: array - `Array.prototype.find` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.find` makes finding items in arrays easier', () => {
  it('takes a compare function', function() {
    const found = [true].find(item => item === true);
    assert.equal(found, true);
  });
  it('returns the first value found', function() {
    const found = [2, 1].find(item => item === 2);
    assert.equal(found, 2);
  });
  it('returns `undefined` when nothing was found', function() {
    const found = [1, 2, 3].find(item => item === 0);
    assert.equal(found, void 0);
  });
  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
    const found = [alice].find(({name}) => name);
    assert.equal(found, alice);
  });
});




// day 18 - task 5
// http://tddbin.com/#?kata=es6/language/array-api/findIndex
// 33: array - `Array.prototype.findIndex` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.findIndex` makes finding items in arrays easier', () => {
  it('takes a compare function, returns the index where it returned true', function() {
    const foundAt = [false, true].findIndex(item => item === true);
    assert.equal(foundAt, 1);
  });
  it('returns the first position it was found at', function() {
    const foundAt = [0, 1, 2, 3].findIndex(item => item === 1);
    assert.equal(foundAt, 1);
  });
  it('returns `-1` when nothing was found', function() {
    const foundAt = [1, 2, 3].findIndex(item => item < 1);
    assert.equal(foundAt, -1);
  });
  it('the findIndex callback gets the item, index and array as arguments', function() {
    const three = 3;
    const containsThree = arr => arr.indexOf(three) > -1;
    function theSecondThree(item, index, arr) {
      const preceedingItems = arr.slice(0, index);
      return containsThree(preceedingItems);
    }
    const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree);
    assert.equal(foundAt, 4);
  });
  it('combined with destructuring complex compares become short', function() {
    const bob = {name: 'Bob'};
    const alice = {name: 'Alice'};
    const foundAt = [bob, alice].findIndex(({name:{length:l}}) => length > 3);
    assert.equal(foundAt, 1);
  });
});




// day 18 - task 6
// http://tddbin.com/#?kata=es6/language/array-api/entries
// 41: array - entries
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`[].entries()` returns an iterator object with all entries', function() {
  it('returns key+value for each element', function() {
    const arr = ['a', 'b', 'c'];
    const entriesAsArray = Array.from(arr.entries());
    assert.deepEqual(entriesAsArray, [[0,"a"], [1,"b"], [2,"c"]]);
  });
  it('empty elements contain the value `undefined`', function() {
    const arr = ['one'];
    arr[2] = 'three';
    const secondValue = arr.entries();
    assert.deepEqual(secondValue, [1, void 0]);
  });
  describe('returns an iterable', function() {
    it('has `next()` to iterate', function() {
      const arr = ['one'];
      const value = arr;
      assert.deepEqual(value, [0, 'one']);
    });
  });
});





// day 18 - task 7
// https://docs.google.com/spreadsheets/d/1uQsJLhSSHtiHxgGj6cmPH6GtN1pPIeB24cHeK4tWlaU/edit#gid=0
// 42: array - `Array.prototype.keys`
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.keys` returns an iterator for all keys in the array', () => {
  it('`keys()` returns an iterator', function() {
    const arr = [0, ];
    const iterator = arr.keys();
    assert.deepEqual(iterator.next(), {value: 0, done: false});
    assert.deepEqual(iterator.next(), {value: void 0, done: true});
  });
  it('gets all keys', function() {
    const arr = ['a', 'b', 'c'];
    const keys = Array.from(arr.keys());
    assert.deepEqual(keys, [0, 1, 2]);
  });
  it('empty array contains no keys', function() {
    const arr = [];
    const keys = [...arr.keys()];
    assert.equal(keys.length, 0);
  });
  it('a sparse array without real values has keys though', function() {
    const arr = [,,];
    const keys = [...arr.keys()];
    assert.deepEqual(keys, [0, 1]);
  });
  it('also includes holes in sparse arrays', function() {
    const arr = ['a', , 'c'];
    const keys = [...arr.keys()];
    assert.deepEqual(keys, [0, 1, 2]);
  });
});



// day 18 - task 8
// https://docs.google.com/spreadsheets/d/1uQsJLhSSHtiHxgGj6cmPH6GtN1pPIeB24cHeK4tWlaU/edit#gid=0
// 43: array - `Array.prototype.values` 
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Array.prototype.values` returns an iterator for all values in the array', () => {
  it('`values()` returns an iterator', function() {
    const arr = [];
    const iterator = arr.values();
    assert.deepEqual(iterator.next(), {value: void 0, done: true});
  });
  it('use `iterator.next()` to drop first value', function() {
    const arr = ['keys', 'values', 'entries'];
    const iterator = arr.values();
    iterator.next();
    assert.deepEqual([...iterator], ['values', 'entries']);
  });
  it('empty array contains no values', function() {
    const arr = [...[...[...[]]]];
    const values = [...arr.values()];
    assert.equal(values.length, 0);
  });
  it('a sparse array without real values has values though', function() {
    const arr = [ ,, ];
    const keys = [...arr.values()];
    assert.deepEqual(keys, [void 0, void 0]);
  });
  it('also includes holes in sparse arrays', function() {
    const arr = ['a',,'c'];
    assert.deepEqual([...arr.values()], ['a', void 0, 'c']);
  });
});
