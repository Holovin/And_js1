document.addEventListener('DOMContentLoaded', function() {
    var drinkWater = new Drink('Water', 10, 'test');
    var drinkJuice = new Drink('Juice', 20, 'test');
    var drinkSugar = new Drink('Sugar', 20, 'test');

    var cocktailOne = new Cocktail('Juice water', [drinkWater, drinkJuice]);
    var cocktailSecond = new Cocktail('Sugar water', [drinkWater, drinkSugar]);

    var ui = {
        btnPrev: document.getElementById('drink_prev'),
        btnNext: document.getElementById('drink_next'),
        btnAdd: document.getElementById('add'),
        btnDrop: document.getElementById('drop'),
        btnMix: document.getElementById('mix'),
        btnResult: document.getElementById('result'),

        cup: document.getElementById('cup'),
        divHint: document.getElementById('hint')
    }

    drinks.add(drinkWater);
    drinks.add(drinkJuice);
    drinks.add(drinkSugar);

    cocktails.add(cocktailOne);
    cocktails.add(cocktailSecond);

    drinkInput.setDisplayBlock(document.getElementById('drink_selected'));
    drinkInput.setCurrent(0);

    drinkOutput.dropCurrentMix();

    ui.btnPrev.addEventListener('click', function() {
        drinkInput.setPrev();
    });

    ui.btnNext.addEventListener('click', function() {
        drinkInput.setNext();
    });
 
    ui.btnAdd.addEventListener('click', function() {
        drinkOutput.addToMix(drinkInput.getCurrent());
    });

    ui.btnDrop.addEventListener('click', function() {
        drinkOutput.dropCurrentMix();
    }); 

    ui.btnMix.addEventListener('click', function() {
        drinkOutput.getAviableMixes();
    });

    ui.btnResult.addEventListener('click', function() {
        this.style.display = 'none';
    });

    ui.cup.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('drink', drinkInput.getPos());

        ui.divHint.style.display = 'block';
        ui.divHint.className += ' show';
    });

    ui.cup.addEventListener('dragend', function() {
        ui.divHint.className = ui.divHint.className.replace('show', '' );
        ui.divHint.style.display = 'none';
    });

    ui.divHint.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    ui.divHint.addEventListener('drop', function(e) {
        e.preventDefault();

        // cheat :p
        drinkOutput.addToMix(drinkInput.getCurrent())
    });
});