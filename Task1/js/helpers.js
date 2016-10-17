var helpers = (function () {
  'use strict';
  
  function objectJoin(o, key, sep) {
    return o.map(function(el) {
    return el[key];
    }).join(sep);
  }

   return {
    objectJoin: objectJoin
  }

})();
