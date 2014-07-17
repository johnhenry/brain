/* Lookup Object for storing data */
/* Uses JavaScript objects for storage -- can later be extended to other objects such as databases*/

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
module.exports = Lookup;
