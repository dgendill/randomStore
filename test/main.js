var assert = require('chai').assert;
var randomStore = require('../index.js');

global.window = {};
require('mock-local-storage');
window.localStorage = global.localStorage;

describe('test random storage', () => {

    afterEach(() => {
        localStorage.clear();
        localStorage.itemInsertionCallback = null;
    });

    it('should store values, retrieve them, and say how many are remaining.', () => {

        const values = [1,2,3,4,5];
        const min = 0, max = 10;
        randomStore.store(min, max, values);

        assert.deepEqual(randomStore.random(min, max), {
            value: 5,
            remaining: 4
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: 4,
            remaining: 3
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: 3,
            remaining: 2
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: 2,
            remaining: 1
        });

         assert.deepEqual(randomStore.random(min, max), {
            value: 1,
            remaining: 0
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: null,
            remaining: 0
        });

        assert.deepEqual(randomStore.random(0, 20), {
            value: null,
            remaining: 0
        });

        randomStore.store(2, 9, [2,3,4]);

        assert.deepEqual(randomStore.random(2, 9), {
            value: 4,
            remaining: 2
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: null,
            remaining: 0
        });

        randomStore.store(min, max, [0]);

        assert.deepEqual(randomStore.random(min, max), {
            value: 0,
            remaining: 0
        });

        assert.deepEqual(randomStore.random(min, max), {
            value: null,
            remaining: 0
        });


    });

    it('should store values, and not return values for a different random range.', () => {
    
        const values = [1,2,3,4,5];
        const min = 0, max = 10;
        randomStore.store(min, max, values);

        assert.deepEqual(randomStore.random(0, 9), {
            value: null,
            remaining: 0
        });

    });

    it('should work using native random.', () => {
    
        const values = [1,2,3,4,5];
        const min = 0, max = 10;
        randomStore.store(min, max, values);

        for(var i = 0; i < 1000; i++) {
            var r = randomStore.nativeRandom(0, 20);
            var isInBounds = r.value >= 0 && r.value <= 20;
            assert.equal(isInBounds, true);
        }
        
    });

});