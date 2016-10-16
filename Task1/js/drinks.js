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

var drink_input = (function() {
    var _current_position;
    var _current_drink;

    function _setPosition(pos) {
        var total = drinks.getLength();
        _current_position += pos;

        if (_current_position < 0) {
            _current_position = total - 1;
        } else if (_current_position > total - 1) {
            _current_position = 0;
        }

        _refreshDrink();
        _refreshText();
    }

    function _refreshDrink() {
        _current_drink = drinks.get(_current_position);
    }

    function _refreshText() {
        document.getElementById('drink_selected').innerHTML = _current_drink.name;
    }

    function get() {
        return _current_drink;
    }

    function getPos() {
        return _current_position;
    }

    function set(index) {
        _current_position = index;

        _refreshDrink();
        _refreshText();
    }

    function next() {
        _setPosition(1);
    }

    function prev() {
        _setPosition(-1);
    }

    return {
        get: get,
        getPos: getPos,
        set: set,
        prev: prev,
        next: next
    };

})();

var drink_output = (function() {
    var _current_mix = [];
    var _can_mixed = false;

    function _refreshText() {
        var str = helpers.objectJoin(_current_mix, 'name', ', ');

        if (!str) {
            str = "Empty";
        } 

        document.getElementById('drink_mixed').innerHTML = str;
    }

    function _checkMix() {
        var result = cocktails.find(_current_mix);
        var mix = document.getElementById('mix');

        _can_mixed = result.length > 0;

        mix.disabled = !_can_mixed;
        mix.innerHTML = 'Mix it (' + result.length + ')';
    }


    function add(o) {
        for (var drink of _current_mix) {
            if (drink.name === o.name) {
                return;
            }
        }

        _current_mix.push(o);

        _refreshText();
        _checkMix();
    }

    function get() {
        return _current_mix;
    }

    function drop() {
        _current_mix = [];

        _refreshText();
        _checkMix();
    }

    function mix() {
        var result = cocktails.find(_current_mix);
        var str = helpers.objectJoin(result, 'name', '<br/>');

        document.getElementById('result_content').innerHTML = 'Can be mixed to: <br/>' + str;
        document.getElementById('result').style.display = 'block';
    }

    return {
        add: add,
        drop: drop,
        get: get,
        mix: mix
    };
})();