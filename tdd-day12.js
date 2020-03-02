// DAY 12 - 1 task
//http://tddbin.com/#?kata=es6/language/set/basics

// 47: Set - basics
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Set` lets you store unique values of any type', function(){
  it('`Set` is a new global constructor function', function() {
    const typeOfSet = typeof Set;
    assert.equal(typeof Set, typeOfSet);
  });
  it('every value in a set is unique', function() {
    let set = new Set();
    set.add(1);
    set.add(2);
    const expectedSize = 2;
    assert.equal(set.size, expectedSize);
  });
  it('the string "1" is different to the number 1', function() {
    let set = new Set();
    set.add(1);
    set.add(2);
    assert.equal(set.size, 2);
  });
  it('even NaN is equal to NaN', function() {
    let set = new Set();
    set.add(NaN);
    set.add(NaN);
    assert.equal(set.size, 1);
  });
  it('+0 and -0 are seen as equal', function() {
    let set = new Set();
    set.add(+0);
    set.add(0);
    set.add(-0);
    assert.deepEqual([...set.values()], [+0]);
  });
});



// DAY 12 - 2 task
// http://tddbin.com/#?kata=es6/language/set/add
// 48: Set - add
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`add()` appends a new element to the end of a Set object.', function(){
  let set;
  beforeEach(() => set = new Set());
  it('adds every value, of any type, only once', function() {
    const fn = () => {};
    set.add(1);
    set.add({fn});
    assert.equal(set.size, 2);
  });
  it('is chainable', function() {
    set.add(2);
    assert.equal(set.has(2), true);
  });
  it('call without params adds undefined', function() {
    set.add();
    assert.equal(set.has(void 0), true);
  });
  it('0, -0 and +0 are equal', function() {
    set.add(0);
    set.add(+0);
    assert.equal(set.has(+0), true);
  });
});



// DAY 12 - 3 task
//http://tddbin.com/#?kata=es6/language/set/delete
// 64: Set - delete
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`set.delete()` deletes an element from a set', function(){
  let set;
  beforeEach(() => set = new Set());
  describe('use `delete(<value>)` to delete an element', function() {
    beforeEach(function() {
      set.add('one').add('two').add('three');
    });
    it('`delete()` returns `true` when the element was found', function() {
      const returns = set.delete('one');
      assert.strictEqual(returns, true);
    });
    it('and the size decreases', function() {
      set.delete('two');
      assert.equal(set.size, 2);
    });
  });
  describe('if nothing was deleted (no element with the given value was found)', function() {
    it('returns `false`', function() {
      set.add('one');
      set.delete('one');
      const returns = set.delete('one');
      assert.equal(returns, false);
    });
  });
  describe('`undefined` is a valid value in a set', function() {
    it('deleting it, when it is not in the set, returns `false` too', function() {
      let whatToDelete;
      assert.equal(set.delete(whatToDelete), false);
    });
    it('`delete()` removes it, when its in the set', function() {
      set.add();
      assert.equal(set.delete(), true);
    });
  });
  describe('the value does NOT get casted', function() {
    it('number 1 is different to string "1"', function() {
      set.add(1);
      set.delete('1');
      assert.equal(set.delete('1'), false);
    });
  });
});



// // DAY 12 - 4 task
// http://tddbin.com/#?kata=es6/language/set/api
// 65: Set - API overview
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`Set` API overview', function(){
  const api = ['size', 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'keys', 'values'];
  let set;
  beforeEach(function() {
    set = new Set(api);
  });
  it('a Set can be created from an array', function() {
    let set = new Set([...api]);
    assert.deepEqual(Array.from(set), api);
  });
  it('`size` is the number of values', function() {
    const theSize = set.size;
    assert.equal(theSize, api.length);
  });
  it('`add()` appends the given value', function() {
    // Hint: To make the content of `api` and `set` consistent you can add the
    // `Symbol.iterator` to the `set`. Strongly speaking it is missing in the API.
    set.add();
    assert.equal(set.size, api.length + 1);
  });
  it('`clear()` removes all elements', function() {
    set.clear();
    assert.equal(set.size, 0);
  });
  it('`delete()` removes the given value', function() {
    set.delete('size');
    assert.equal(set.size, api.length - 1);
  });
  it('`entries()` returns an iterator for all values', function() {
    const expectedEntries = api.map(entry => [entry, entry]);
    const actualEntries = set.entries();
    assert.deepEqual([...actualEntries], expectedEntries);
  });
  it('`forEach()` calls a callback for each value', function() {
    let values = [];
    set.forEach(value => { values.push(value); });
    assert.deepEqual(values, api);
  });
  it('`has()` returns true if the given value is in the set', function() {
    const propertyName = 'has';
    set.has('has');
    assert.equal(set.has(propertyName), true);
  });
  describe('returns an iterator that contains all values', function() {
    // In order to be alike to `Map`, `keys()` and `values()` are essentially the same thing for a `Set`.
    it('`keys()`', function() {
      const allKeys = set.keys(set);
      assert.deepEqual([...allKeys], api);
    });
    it('`values()`', function() {
      const allValues = set.values();
      assert.deepEqual([...allValues], api);
    });
    it('`[Symbol.iterator]()`', function() {
      const iteratorKey = '???';
      assert.deepEqual([...set[iteratorKey]()], api);
    });
  });
});




// // DAY 12 - 5 task
http://tddbin.com/#?kata=es6/language/set/clear
// 70: Set - clear
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('`clear()` removes all elements from a Set object.', function(){
  let set;
  beforeEach(() => set = new Set());
  it('`set.size` becomes 0', function() {
    set.add('one').add(2);
    set.clear();
    var expectedSize = 0;
    assert.equal(set.size, expectedSize);
  });
  it('the iterator `set.entries()` will not contain any items', function() {
    set.add('one').add(2);
    set.clear();
    const {done} = set.entries().next();
    assert.equal(done, true);
  });
  it('any call to `set.has()` returns false', function() {
    set.add();
    set.has();
    assert.deepEqual(set.has(2), false);
  });
  it('returns `undefined`', function() {
    var expectedReturn;
    assert.equal(set.clear(), expectedReturn);
  });
});
