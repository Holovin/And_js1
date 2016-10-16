document.addEventListener('DOMContentLoaded', function() {
    var ui = {
        btnPrev: document.getElementById('drink_prev'),
        btnNext: document.getElementById('drink_next'),
        btnAdd: document.getElementById('add'),
        btnDrop: document.getElementById('drop'),
        btnMix: document.getElementById('mix'),
        btnResult: document.getElementById('result'),

        imgCup: document.getElementById('cup'),
        divHint: document.getElementById('hint'),

        spanSelected: document.getElementById('drink_selected'),
        spanMixed: document.getElementById('drink_mixed'),

        divResult: document.getElementById('result'),
        divResultContent: document.getElementById('result_content')
    };

    function resetUI() {
        drinkInput.setCurrent(0);
        drinkOutput.dropCurrentMix();

        refreshDrinkInputText();
    }

    function refreshDrinkInputText() {
        ui.spanSelected.innerHTML = drinkInput.getCurrent().name;
    }

    function refreshDrinkOutputText() {
        var str = helpers.objectJoin(drinkOutput.getCurrent(), 'name', ', ');

        if (!str) {
            str = 'Empty';
        }

        ui.spanMixed.innerHTML = str;
    }

    function showAviableMixes() {
        var result = cocktails.find(drinkOutput.getCurrent());
        var str = helpers.objectJoin(result, 'name', '<br/>');

        ui.divResultContent.innerHTML = 'Can be mixed to: <br/>' + str;
        ui.divResult.style.display = 'block';
    }

    resetUI();

    ui.btnPrev.addEventListener('click', function() {
        drinkInput.setPrev();
        refreshDrinkInputText();
    });

    ui.btnNext.addEventListener('click', function() {
        drinkInput.setNext();
        refreshDrinkInputText();
    });
 
    ui.btnAdd.addEventListener('click', function() {
        drinkOutput.addToMix(drinkInput.getCurrent());
        refreshDrinkOutputText();
    });

    ui.btnDrop.addEventListener('click', function() {
        drinkOutput.dropCurrentMix();
        refreshDrinkOutputText();
    }); 

    ui.btnMix.addEventListener('click', function() {
        showAviableMixes();
    });

    ui.btnResult.addEventListener('click', function() {
        this.style.display = 'none';
    });

    ui.imgCup.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('drink', drinkInput.getCurrentPos());

        ui.divHint.style.display = 'block';
        ui.divHint.className += ' show';
    });

    ui.imgCup.addEventListener('dragend', function() {
        ui.divHint.className = ui.divHint.className.replace('show', '');
        ui.divHint.style.display = 'none';
    });

    ui.divHint.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    ui.divHint.addEventListener('drop', function(e) {
        e.preventDefault();

        // cheat :p
        drinkOutput.addToMix(drinkInput.getCurrent())
        refreshDrinkOutputText();
    });
});