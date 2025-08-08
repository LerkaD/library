console.log('testing-library/jasmine-dom START')

const JasmineDOM = require('@testing-library/jasmine-dom');

beforeAll(() => {
    jasmine.addMatchers(JasmineDOM);
});

console.log('testing-library/jasmine-dom FINISH')