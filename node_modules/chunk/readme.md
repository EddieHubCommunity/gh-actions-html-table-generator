Chunk converts arrays like `[1,2,3,4,5]` into arrays of arrays like `[[1,2], [3,4], [5]]`.

![Chunk, from The Goonies](http://i.imgur.com/T3WCUmu.jpg "Chunk, from The Goonies")

You can install chunk using npm.

```
npm install chunk
```

## Examples

To chunk an array into an array of smaller arrays, simply call chunk:

```javascript
> var chunk = require('chunk')
> chunk([1,2,3])
[ [ 1, 2 ], [ 3 ] ]

```

To chunk an array into an array of N-sized arrays, call chunk with N:

```javascript
> chunk([1,2,3], 1)
[ [ 1 ], [ 2 ], [ 3 ] ]
> chunk([1,2,3], 3)
[ [ 1, 2, 3 ] ]
``` 

The default chunk size is 2.