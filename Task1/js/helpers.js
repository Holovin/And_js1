var helpers = (function () {
    function _objectJoin(o, key, sep) {
        return o.map(function(el) {
            return el[key];
        }).join(sep);
    }

    return {
        objectJoin: _objectJoin
    }

})();