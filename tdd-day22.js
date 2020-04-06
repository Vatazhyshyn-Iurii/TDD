// day 22 - task 1
// http://tddbin.com/#?kata=es6/language/arrow-functions/basics
// 5: arrow functions - basics
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Arrow functions', function() {
  it('are shorter to write, instead of `function(){}` write `() => {}`', function() {
    var func = () => {};
    assert.equal('' + func, '() => {}');
  });
  it('instead `{}` use an expression, as return value', function() {
    var func = () => 'I return too';
    assert.equal(func(), 'I return too');
  });
  it('one parameter can be written without parens', () => {
    var func = p => p - 1;
    assert.equal(func(25), 24);
  });
  it('many params require parens', () => {
    var func = (param1, param2) => param1 + param2;
    assert.equal(func(23, 42), 23+42);
  });
  it('the function body needs parens to return an object', () => {
    var func = () => ({iAm: 'an object'});
    assert.deepEqual(func(), {iAm: 'an object'});
  });
});




// day 22 - task 2
// http://tddbin.com/#?kata=es6/language/arrow-functions/binding
// 6: arrow functions - binding
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!
class LexicallyBound {
  getFunction() {
    return () => this
  }
  getArgumentsFunction() {
    return () => arguments
  }
}
describe('arrow functions have lexical `this`, no dynamic `this`', () => {
  it('bound at definition time, use `=>` ', function() {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    assert.strictEqual(fn(), bound);
  });
  it('can NOT bind a different context', function() {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    var anotherObj = {};
    var expected = bound;
    assert.strictEqual(fn.call(anotherObj), expected);
  });
  it('`arguments` doesnt work inside arrow functions', function() {
    var bound = new LexicallyBound();
    var fn = bound.getArgumentsFunction();
    assert.equal(fn(1, 2).length, 0);
  });
});
