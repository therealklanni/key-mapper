const _ = require('lodash');
const test = require('ava');
const km = require('./');

const source = {
  keeper: {
    another_keeper: 1
  },
  keeper_with_snake_case: [
    {
      i_have_snakes_too: 2
    },
    {
      i_like_turtles: 2.1,
      garbage: 2.2
    },
    'not garbage',
    [
      'also not garbage',
      {
        more_stuff: 2.3,
        garbage: 2.4,
        nil: null
      }
    ]
  ],
  garbage: 3,
  NOTGARBAGE: {
    maybe_garbage: 4,
    garbage: 5
  }
};

const expectedOmit = {
  keeper: {
    another_keeper: 1
  },
  keeper_with_snake_case: [
    {
      i_have_snakes_too: 2
    },
    {
      i_like_turtles: 2.1
    },
    'not garbage',
    [
      'also not garbage',
      {
        more_stuff: 2.3,
        nil: null
      }
    ]
  ],
  NOTGARBAGE: {
    maybe_garbage: 4
  }
};

const expectedCamel = {
  keeper: {
    anotherKeeper: 1
  },
  keeperWithSnakeCase: [
    {
      iHaveSnakesToo: 2
    },
    {
      iLikeTurtles: 2.1,
      garbage: 2.2
    },
    'not garbage',
    [
      'also not garbage',
      {
        moreStuff: 2.3,
        garbage: 2.4,
        nil: null
      }
    ]
  ],
  garbage: 3,
  notgarbage: {
    maybeGarbage: 4,
    garbage: 5
  }
};

const expectedOmitCamel = {
  keeper: {
    anotherKeeper: 1
  },
  keeperWithSnakeCase: [
    {
      iHaveSnakesToo: 2
    },
    {
      iLikeTurtles: 2.1
    },
    'not garbage',
    [
      'also not garbage',
      {
        moreStuff: 2.3,
        nil: null
      }
    ]
  ],
  notgarbage: {
    maybeGarbage: 4
  }
};

const omitGarbage = _.partial(_.omit, _, ['garbage']);

test('identity transform, no prefilter', t => {
  t.deepEqual(km(source, _.identity), source);
});

test('camelCase transform, no prefilter', t => {
  t.deepEqual(km(source, _.camelCase), expectedCamel);
});

test('camelCase transform, no prefilter', t => {
  t.deepEqual(km(source, _.identity, omitGarbage), expectedOmit);
});

test('camelCase transform, omit prefilter', t => {
  t.deepEqual(km(source, _.camelCase, omitGarbage), expectedOmitCamel);
});

test('no transform', t => {
  t.throws(km.bind(null, source), 'transform must be a function');
});
