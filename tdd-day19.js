// day 19 - task 1
// http://tddbin.com/#?kata=es6/language/template-strings/basics
// 1: template strings - basics
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('A template string, is wrapped in ` (backticks) instead of \' or "', function() {
  describe('by default, behaves like a normal string', function() {
    it('just surrounded by backticks', function() {
      var str = `like a string`;
      assert.equal(str, 'like a string');
    });
  });

  var x = 42;
  var y = 23;
  
  describe('can evaluate variables, which are wrapped in "${" and "}"', function() {
    it('e.g. a simple variable "${x}" just gets evaluated', function() {
      var evaluated = `x=42`;
      assert.equal(evaluated, 'x=' + x);
    });
    it('multiple variables get evaluated too', function() {
      var evaluated = `${ '42' }+${ '23' }`;
      assert.equal(evaluated, x + '+' + y);
    });
  });

  describe('can evaluate any expression, wrapped inside "${...}"', function() {
    it('all inside "${...}" gets evaluated', function() {
      var evaluated = `${ x + y }`;
      assert.equal(evaluated, x+y);
    });
    it('inside "${...}" can also be a function call', function() {
      function getDomain(){ 
        return document.domain; 
      }
      var evaluated = `${ getDomain() }`;
      assert.equal(evaluated, 'tddbin.com');
    });
  });
});



// day 19 - task 2
// http://tddbin.com/#?kata=es6/language/template-strings/multiline
// 2: template strings - multiline
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Template string, can contain multiline content', function() {
  it('wrap it in backticks (`) and add a newline, to span across two lines', function() {
    var normalString = `line1\n\nline3`;

    assert.equal(normalString, 'line1\n\nline3');
  });
  it('even over more than two lines', function() {
    var multiline = `\n
    \n`;
    assert.equal(multiline.split('\n').length, 4);
  });
  describe('and expressions inside work too', function() {
    var x = 42;
    it('like simple variables', function() {
      var multiline = `line 1\n\n      ${x}`;

      assert.equal(multiline, 'line 1\n\n      42');
    });
    it('also here spaces matter', function() {
      var multiline = `\n\n42`;

      assert.equal(multiline, '\n\n42');
    });
  });
});




// day 19 - task 3
// http://tddbin.com/#?kata=es6/language/template-strings/tagged
// 3: template strings - tagged
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Tagged template strings, are an advanced form of template strings', function() {
  it('syntax: prefix a template string with a function to call (without "()" around it)', function() {
    function tagFunction(s) {
      return s.toString();
    }
    var evaluated = tagFunction `template string`;
    assert.equal(evaluated, 'template string');
  });
  describe('the tag function can access each part of the template', function() {
    describe('the 1st parameter receives only the pure strings of the template string', function() {
      function tagFunction(strings) {
        return strings;
      }
      it('the strings are an array', function() {
        var result = ['template string'];
        assert.deepEqual(tagFunction`template string`, result);
      });
      it('expressions are NOT passed to it', function() {
        var tagged = tagFunction`one ${23}`;
        assert.deepEqual(tagged, ['one', 'two']);
      });
    });
    describe('the 2nd and following parameters contain the values of the processed substitution', function() {
      var one = 1;
      var two = 2;
      var three = 3;
      it('the 2nd parameter contains the first expression`s value', function() {
        function firstValueOnly(strings, firstValue) {
          return firstValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 1);
      });
      it('the 3rd parameter contains the second expression`s value', function() {
        function firstValueOnly(strings, firstValue, secondValue) {
          return secondValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 2);
      });
      it('using ES6 rest syntax, all values can be accessed via one variable', function() {
        function valuesOnly(stringsArray, ...allValues) { // using the new ES6 rest syntax
          return;
        }
        assert.deepEqual(valuesOnly`uno=${one}, dos=${two}, tres=${three}`, [1, 2, 3]);
      });
    });
  });
});




// day 19 - task 4
// http://tddbin.com/#?kata=es6/language/template-strings/raw
// 4: template strings - String.raw
// To do: make all tests pass, leave the asserts unchanged!
// Follow the hints of the failure messages!

describe('Use the `raw` property of tagged template strings like so `s.raw`', function() {
  it('the `raw` property accesses the string as it was entered', function() {
    function firstChar(strings) {
      return strings.raw;
    }
    assert.equal(firstChar`\n`, '\\n');
  });
  it('`raw` can access the backslash of a line-break', function() {
    function firstCharEntered(strings) {
      var lineBreak = `\\`;
      return lineBreak;
    }
    assert.equal(firstCharEntered`\n`, '\\');
  });
  describe('`String.raw` as a static function', function(){
    it('concats the raw strings', function() {
      var expected = String.raw`\n`;
      assert.equal(String.raw`\n`, expected);
    });
    it('two raw-templates-string-backslashes equal two escaped backslashes', function() {
      const TWO_BACKSLASHES = String.raw`\\`;
      assert.equal(String.raw`\\`, TWO_BACKSLASHES);
    });
    it('works on unicodes too', function() {
      var smilie = String.raw`\u{1F600}`;
      var actual = String.raw`\u{1F600}`;
      assert.equal(actual, smilie);
    });
  });
});




// day 19 - task 5
// http://tddbin.com/#?kata=es6/language/spread/with-arrays
// 20: spread - with-arrays
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Spread syntax with arrays', () => {
  describe('basically', () => {
    it('expands the items of an array by prefixing it with `...`', function() {
      const middle = [1, 2, 3];
      const arr = [0, ...middle, 4];
      assert.deepEqual(arr, [0, 1, 2, 3, 4]);
    });
    it('an empty array expanded is no item', function() {
      const arr = [0, ...[], 1];
      assert.deepEqual(arr, [0, 1]);
    });
  });
  describe('is (in a way) the opposite to the rest syntax', function() {
    it('both use `...` to either expand all items and collect them', function() {
      const [...rest] = [...[1, 2, 3, 4, 5]];
      assert.deepEqual(rest, [1, 2, 3, 4, 5]);
    });
    it('rest syntax must be last in an array, spread can be used in any place', function() {
      const [a, b, ...rest] = [1, 2, ...[3, 4, 5]];
      assert.equal(a, 1);
      assert.equal(b, 2);
      assert.deepEqual(rest, [3, 4, 5]);
    });
  });
  describe('used as function parameter', () => {
    it('prefix with `...` to spread as function params', function() {
      const magicNumbers = [1, 2];
      const fn = (magicA, magicB) => {
        assert.deepEqual(magicNumbers[0], magicA);
        assert.deepEqual(magicNumbers[1], magicB);
      };
      fn(...magicNumbers);
    });
    it('pass an array of numbers to Math.max()', function() {
      const max = Math.max(...[23, 0, 42, 41]);
      assert.equal(max, 42);
    });
  });  
  describe('used as constructor parameter', () => {
    it('just like in a function call (is not possible using `apply`)', () => {
      class X {
        constructor(a, b, c) { return [a, b, c]; }
      }
      const args = [1];
      assert.deepEqual(new X(...args), [1, 2, 3]);
    });
  });
});




// day 19 - task 6
// http://tddbin.com/#?kata=es6/language/spread/with-strings
// 21: spread - with-strings
// To do: make all tests pass, leave the assert lines unchanged!
// Follow the hints of the failure messages!

describe('Spread syntax with strings', () => {
  it('expands each character of a string by prefixing it with `...`', function() {
    const [b, a] = [...'ba'];
    assert.equal(a, 'a');
    assert.equal(b, 'b');
  });
  it('expands any kind of character', function() {
    const arr = [...'1 ☢ 2'];
    assert.deepEqual(arr, ['1', ' ', '☢', ' ', '2']);
  });
  it('works anywhere inside an array (must not be last)', function() {
    const letters = ['a', ...'bcd', 'e', 'f'];
    assert.equal(letters.length, 6);
  });
  it('don`t confuse with the rest operator', function() {
    const [...rest] = [...'1234', '5'];
    assert.deepEqual(rest, [1, 2, 3, 4, 5]);
  });
  it('can also be used as function parameter', function() {
    const max = Math.max(...'12345');
    assert.deepEqual(max, 5);
  });
});
