var _ = require("underscore");

/* Lookup Object for storing data */

var Lookup = function(){}
Lookup.prototype = {
  get: function(index) {
    return this._innerObject ? this._innerObject[index] : undefined;
  },
  set: function(index, value) {
    if(!this._innerObject){
      this._innerObject = {};
    }
    return this._innerObject[index] = value;
  },
  keys: function() {
    return Object.keys(this._innerObject || {});
  }
  
}

/* Functions for turning sparse hashes into arrays and vice versa */

function buildLookup(hashes) {
  // [{a: 1}, {b: 6, c: 7}] -> {a: 0, b: 1, c: 2}
  var hash = _(hashes).reduce(function(memo, hash) {
    return _(memo).extend(hash);
  }, {});
  return lookupFromHash(hash);
}

function lookupFromHash(hash) {
  // {a: 6, b: 7} -> {a: 0, b: 1}
  var lookup = new Lookup();
  //var lookup = {};
  var index = 0;
  for (var i in hash) {
    lookup.set(i,index++);
    //lookup[i] = index++;
  }
  return lookup;
}

function toArray(lookup, hash) {
  // {a: 0, b: 1}, {a: 6} -> [6, 0]
  var array = [];
  var indices = lookup.keys();
  for (var i in indices) {
    array[lookup.get(i)] = hash[i] || 0;
  }
  return array;
}

function toHash(lookup, array) {
  // {a: 0, b: 1}, [6, 7] -> {a: 6, b: 7}
  var hash = {};
  var indices = lookup.keys();
  for (var i in indices) {
    hash[i] = array[lookup.get(i)];
  }
  return hash;
}

function lookupFromArray(array) {
  var lookup = new Lookup();
  // super fast loop
  var z = 0;
  var i = array.length;
  while (i-- > 0) {
    lookup.set(array[i], z++);
  };
  return lookup;
}

module.exports = {
  buildLookup: buildLookup,
  lookupFromHash: lookupFromHash,
  toArray: toArray,
  toHash: toHash,
  lookupFromArray: lookupFromArray
};
