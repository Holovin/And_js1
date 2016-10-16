document.addEventListener('DOMContentLoaded', function() {
    // init data //
    var d1 = new Drink('Water', 10, 'test');
    var d2 = new Drink('Juice', 20, 'test');
    var d3 = new Drink('Sugar', 20, 'test');

    drinks.add(d1);
    drinks.add(d2);
    drinks.add(d3);

    var c1 = new Cocktail('Juice water', [d1, d2]);
    var c2 = new Cocktail('Sugar water', [d1, d3]);

    cocktails.add(c1);
    cocktails.add(c2);

    drinkInput.set(0);
    drinkOutput.drop();

    // handling //
    document.getElementById('drink_prev').addEventListener('click', function() {
        drinkInput.prev();
    });

    document.getElementById('drink_next').addEventListener('click', function() {
        drinkInput.next();
    });
 
    document.getElementById('add').addEventListener('click', function() {
        drinkOutput.add(drinkInput.get());
    });

    document.getElementById('drop').addEventListener('click', function() {
        drinkOutput.drop();
    }); 

    document.getElementById('mix').addEventListener('click', function() {
        drinkOutput.mix();
    });

    document.getElementById('result').addEventListener('click', function() {
        this.style.display = 'none';
    });

    var cup = document.getElementById('cup');
    var hint = document.getElementById('hint');

    cup.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('drink', drinkInput.getPos());

        hint.style.display = 'block';
        hint.className += ' show';
    });

    cup.addEventListener('dragend', function() {
        hint.className = hint.className.replace('show', '' );
        hint.style.display = 'none';
    });

    hint.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    hint.addEventListener('drop', function(e) {
        e.preventDefault();

        // cheat :p
        drinkOutput.add(drinkInput.get())
    });
});