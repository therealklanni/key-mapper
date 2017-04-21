const {
  isFunction,
  isPlainObject,
  isArray,
  forOwn,
  map,
  partial
} = require('lodash');

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
    const x = {};

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
