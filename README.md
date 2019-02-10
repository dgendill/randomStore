# RandomStore

This JavaScript module lets you save and retrieve random numbers like you might find on [random.org](https://www.random.org/). The idea being that random numbers would not need to be provided by a remote service, but would be preloaded manually by the user. An example use case would be a dice rolling application for a table game. Before starting the game, the user would load several hundered random values into the application, and they could draw upon those values throughout the game.


## Example

```javascript

var randomStore = require('randomStore');

randomStore.store(0, 20, [3, 3, 7, 12, 0, 5, 9, 16]);
var firstValue = randomStore.random(0, 20);
var secondValue = randomStore.random(0, 20);

// firstValue === { value : 16, remaining : 7 }
// secondValue === { value : 9, remaining : 6 }
// ...
// finalValue === { value : 3, remaining : 0 }
// anyMoreQuestionMark === { value : null, remaining : 0 }

```

## Usage

#### store :: Number -> Number -> Array Number -> Optional (Maybe Int) -> IO

Given a min an max value, and a set of random values,
store the values so they can be later retrieved. Optionally
provide a zero-index pointer the next values that should be
returned. The values will stringified and stored in localStorage 
with the type:

```
type RandomStore = {
    index :: Maybe Int,
    values :: Array Number
}
```

Where the Nothing value of Maybe is represented with JavaScript null.

#### random :: Number -> Number -> IO { value :: Maybe Number, remaining :: Int | Infinity }

Given a min and max value, attempt to return a random number from the values stored in localStorage. Also return the number of remaining unseen random numbers that this
service can draw from. Of course this assumes no other code has made modifications to the
localStorage value.


#### nativeRandom :: Int -> Int -> IO { value :: Maybe Int, remaining :: Infinity }

Return a psuedorandom integer between min and max.