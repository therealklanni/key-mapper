# key-mapper

> Tiny utility for deeply mapping object keys

Map object keys (properties) to transform an object of any shape and depth<sup>*</sup>.

<sub>* Obviously, there's such a thing as a call stack. If you're working with very large
objects, you should consider mapping small subsets of the object instead.</sub>

## Install

```
yarn add key-mapper --save
```

```
npm install key-mapper --save
```

## Usage

Any object supplied will be deeply mapped, including arrays of objects. Any non-object, non-array
contents will be skipped over. This includes any combination (to any depth) of array of objects and objects with arrays, and so on.

```js
km(sourceObject, _.camelCase) // => convert keys to camel case
```

If you want to exclude certain properties from the mapping, add an optional prefilter function.
For example, omit all properties named "options". Note that this means the resulting object will
_not_ have any properties named "options", not that it skips them.

```js
km(sourceObject, _.camelCase, omitOptions)
```

This is useful for working with large objects that could cause key-mapper to hit the call stack
limit. You could create multiple objects, one with the keys mapped, another with just the keys you
wanted to exclude, then merge them back together.

```
const mapped = km(sourceObject, _.camelCase, omitOptions)

// here, pickOptions does the opposite of omitOptions
const filtered = km(sourceObject, _.identity, pickOptions)

const finalForm = _.merge(filtered, mapped)
```

Notice how I used `_.identity` to leave the keys as-is so I could still deeply pick "options". #protip
