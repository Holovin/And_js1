function Drink(name, ice, color) {
  this.name = name;
  this.ice = ice;
  this.color = color;
}

function Cocktail(name, ingrs, color) {
  this.name = name;
  this.ingrs = ingrs;
  this.color = color;
}

function Storage() {
  this.list = [];
}

Storage.prototype.add = function(o) {
  this.list.push(o);
};

Storage.prototype.get = function(i) {
  if (this.list.length >= i) {
    return this.list[i];
  }
};

Storage.prototype.getLength = function() {
  return this.list.length;
};

function Cocktails() {
  Storage.apply(this);
}

Cocktails.prototype = Object.create(Storage.prototype);
Cocktails.prototype.constructor = Storage;
Cocktails.prototype.find = function(ingrs) {
  var result = [];
  var count;

  if (!ingrs.length) {
      return [];
  }

  for (var cocktail of this.list) {
    count = 0;

    for (var drink of cocktail.ingrs) {
      for (var drink_in of ingrs) {
        if (drink.name === drink_in.name) {
          count++;
          break;
        }
      }
    }

    if (count === ingrs.length) {
      result.push(cocktail);
    }
  }

  return result;
};

var drinkInput = (function () {
  'use strict';

  var _currentPosition;
  var _currentDrink;

  function _setPosition(pos) {
    var total = drinks.getLength();
    _currentPosition += pos;

    if (_currentPosition < 0) {
      _currentPosition = total - 1;

    } else if (_currentPosition > total - 1) {
      _currentPosition = 0;
    }

    _refreshDrink();
  }

  function _refreshDrink() {
    _currentDrink = drinks.get(_currentPosition);
  }

  function getCurrent() {
    return _currentDrink;
  }

  function getCurrentPos() {
    return _currentPosition;
  }

  function setCurrent(index) {
    _currentPosition = index;

    _refreshDrink();
  }

  function setNext() {
    _setPosition(1);
  }

  function setPrev() {
    _setPosition(-1);
  }

  return {
    getCurrent: getCurrent,
    getCurrentPos: getCurrentPos,
    setCurrent: setCurrent,
    setPrev: setPrev,
    setNext: setNext
  };

})();

var drinkOutput = (function() {
  'use strict';

  var _currentMix = [];
  var _canBeMix = false;

  function addToMix(o) {
    for (var drink of _currentMix) {
      if (drink.name === o.name) {
        return;
      }
    }

    _currentMix.push(o);
  }

  function getCurrent() {
    return _currentMix;
  }

  function dropCurrentMix() {
    _currentMix = [];
  }

  return {
    addToMix: addToMix,
    dropCurrentMix: dropCurrentMix,
    getCurrent: getCurrent
  };

})();
