document.addEventListener('DOMContentLoaded', function() {

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