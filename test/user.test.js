"user strict";

var assert = require('assert');

describe("my first test", () => {

    let test;

    beforeEach(() => {
        test = 1;
    });

    test = 2;
    assert.equal(test, 2, "Expected to be 2");

});
