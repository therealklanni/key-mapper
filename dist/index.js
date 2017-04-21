'use strict';

var _require = require('lodash'),
  isFunction = _require.isFunction,
  isPlainObject = _require.isPlainObject,
  isArray = _require.isArray,
  forOwn = _require.forOwn,
  map = _require.map,
  partial = _require.partial;

/**
 * Deeply transform object keys
 * @param  {Object} source Source object
 * @param  {Object} transform Function used to transform the keys
 * @param  {Object} prefilter (optional) Function to pre-filter the object at each depth
 * @return {Object} Transformed object
 */

function keyMapper(source, transform, prefilter) {
  if (!isFunction(transform)) {
    throw new TypeError('transform must be a function');
  }

  if (isPlainObject(source)) {
    var x = {};

    forOwn(prefilter ? prefilter(source) : source, function(v, k) {
      x[transform(k)] = keyMapper(v, transform, prefilter);
    });

    return x;
  } else if (isArray(source)) {
    return map(
      source,
      partial(keyMapper, partial.placeholder, transform, prefilter)
    );
  }

  return source;
}

module.exports = keyMapper;
