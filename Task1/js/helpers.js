var helpers = (function () {
  'use strict';
  
  function objectJoin(o, key, sep) {
    return o.map(function(el) {
    return el[key];
    }).join(sep);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return {
    objectJoin: objectJoin,
    getRandomInt: getRandomInt
  };

})();
