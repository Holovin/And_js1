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

var drinks = new Storage();

function Cocktails() {
    Storage.call(this);
}

Cocktails.prototype = Object.create(Storage.prototype);
Cocktails.prototype.constructor = Storage;
Cocktails.prototype.find = function(ingrs) {
    var result = [];
    var count;

    if (ingrs.length === 0) {
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

var cocktails = new Cocktails();

var drink_input = (function() {
    var _current_position;
    var _current_drink;

    function publicGet() {
        return _current_drink;
    }

    function publicGetPos() {
        return _current_position;
    }

    function publicSet(index) {
        _current_position = index;

        refreshDrink();
        refreshText();
    }

    function publicNext() {
        setPosition(1);
    }

    function publicPrev() {
        setPosition(-1);
    }

    function setPosition(pos) {
        var total = drinks.getLength();
        _current_position += pos;

        if (_current_position < 0) {
            _current_position = total - 1;
        } else if (_current_position > total - 1) {
            _current_position = 0;
        }

        refreshDrink();
        refreshText();
    }

    function refreshDrink() {
        _current_drink = drinks.get(_current_position);
    }

    function refreshText() {
        document.getElementById('drink_selected').innerHTML = _current_drink.name;
    }

    return {
        get: publicGet,
        getPos: publicGetPos,
        set: publicSet,
        prev: publicPrev,
        next: publicNext
    };

})();

var drink_output = (function() {
    var _current_mix = [];
    var _can_mixed = false;

    function publicAdd(o) {
        for (var drink of _current_mix) {
            if (drink.name === o.name) {
                return;
            }
        }

        _current_mix.push(o);

        refreshText();
        checkMix();
    }

    function publicGet() {
        return _current_mix;
    }

    function publicDrop() {
        _current_mix = [];

        refreshText();
        checkMix();
    }

    function refreshText() {
        var str = helpers.objectJoin(_current_mix, 'name', ', ');

        if (!str) {
            str = "Empty";
        } 

        document.getElementById('drink_mixed').innerHTML = str;
    }

    function checkMix() {
        var result = cocktails.find(_current_mix);

        _can_mixed = result.length > 0;

        var mix = document.getElementById('mix');
        mix.disabled = !_can_mixed;
        mix.innerHTML = 'Mix it (' + result.length + ')';
    }

    function publicMix() {
        var result = cocktails.find(_current_mix);
        var str = helpers.objectJoin(result, 'name', '<br/>');

        document.getElementById('result_content').innerHTML = 'Can be mixed to: <br/>' + str;
        document.getElementById('result').style.display = 'block';
    }

    return {
        add: publicAdd,
        drop: publicDrop,
        get: publicGet,
        mix: publicMix
    };
})();