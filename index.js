function makeKey(min, max) {
    return min + ':' + max;
}

module.exports = {
    random : random,
    nativeRandom : nativeRandom,
    store : saveToStore
}

// Number -> Number -> IO { value :: Maybe Number, remaining :: Int | Infinity }
function nativeRandom(min, max) {
    return {
        value : Math.floor(Math.random()*(max-min+1)+min),
        remaining : Infinity
    }
}

// Number -> Number -> IO { value :: Maybe Number, remaining :: Int | Infinity }
// Given a min and max value, attempt to return a random number from the
// value store, and the number of remaining unseen random numbers that this
// service can draw from. 
function random(min, max) {
    const key = makeKey(min, max);
    const maybeStore = window.localStorage.getItem(key);
    const defaultValue = {
        value : null,
        remaining : 0
    };

    if (maybeStore) {
        // { values : Array Number, index : Int }
        const store = JSON.parse(maybeStore);

        if (store.index === null) return defaultValue;

        const currentPointer = store.index;
        const nextPointer = store.index - 1;

        if (nextPointer === -1) {
            saveToStore(min, max, store.values, null);
        } else {
            saveToStore(min, max, store.values, nextPointer);
        }

        return {
            value : store.values[currentPointer],
            remaining : currentPointer
        }
    }

    return defaultValue;    
    
}

// Int -> Int -> Array Int -> Optional (Maybe Int) -> IO
// Given a min an max value, and a set of random values,
// store the values so they can be later pulled from. Store
// the values and the point with type:
//
// type RandomStore = {
//    index :: Maybe Int,
//    values :: Array Number
// } 
function saveToStore(min, max, values, pointer) {
    window.localStorage.setItem(
        makeKey(min, max),
        JSON.stringify({
            index : pointer !== undefined ? pointer : values.length - 1,
            values : values
        })
    );
}