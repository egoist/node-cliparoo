
# Clipboard



## Installation

```
$ npm install node-clipboard
```

## Example

```js
var clip = require('node-clipboard');

clip('Hello "World"', function(err) {
  if (err) throw err;
  console.log('copied!');
});
```