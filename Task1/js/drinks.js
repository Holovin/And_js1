function Drink(name, alcohol, color) {
    this.name = name;
    this.alcohol = alcohol;
    this.color = color;
}

function Cocktail(name, ingrs) {
    this.name = name;
    this.ingrs = ingrs;
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
    Storage.call(this);
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
    var _currentPosition;
    var _currentDrink;
    var _selectedBlock;

    function _setPosition(pos) {
        var total = drinks.getLength();
        _currentPosition += pos;

        if (_currentPosition < 0) {
            _currentPosition = total - 1;

        } else if (_currentPosition > total - 1) {
            _currentPosition = 0;
        }

        _refreshDrink();
        _refreshText();
    }

    function _refreshDrink() {
        _currentDrink = drinks.get(_currentPosition);
    }

    function _refreshText() {
        _selectedBlock.innerHTML = _currentDrink.name;
    }

    function setDisplayBlock(block) {
        _selectedBlock = block;
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
        _refreshText();
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
        setDisplayBlock: setDisplayBlock,
        setPrev: setPrev,
        setNext: setNext
    };

})();

var drinkOutput = (function() {
    var _currentMix = [];
    var _canBeMix = false;

    function _refreshText() {
        var str = helpers.objectJoin(_currentMix, 'name', ', ');

        if (!str) {
            str = 'Empty';
        } 

        document.getElementById('drink_mixed').innerHTML = str;
    }

    function _checkMix() {
        var result = cocktails.find(_currentMix);
        var mix = document.getElementById('mix');

        _canBeMix = result.length > 0;

        mix.disabled = !_canBeMix;
        mix.innerHTML = 'Mix it (' + result.length + ')';
    }


    function addToMix(o) {
        for (var drink of _currentMix) {
            if (drink.name === o.name) {
                return;
            }
        }

        _currentMix.push(o);

        _refreshText();
        _checkMix();
    }

    function getCurrent() {
        return _currentMix;
    }

    function dropCurrentMix() {
        _currentMix = [];

        _refreshText();
        _checkMix();
    }

    function getAviableMixes() {
        var result = cocktails.find(_currentMix);
        var str = helpers.objectJoin(result, 'name', '<br/>');

        document.getElementById('result_content').innerHTML = 'Can be mixed to: <br/>' + str;
        document.getElementById('result').style.display = 'block';
    }

    return {
        addToMix: addToMix,
        dropCurrentMix: dropCurrentMix,
        getCurrent: getCurrent,
        getAviableMixes: getAviableMixes
    };
})();