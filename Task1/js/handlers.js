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
    drinkInput.setCurrent(helpers.getRandomInt(0, drinks.getLength()));
    drinkOutput.dropCurrentMix();

    refreshDrinkInputBlock();
    refreshDrinkOutputBlock();
  }

  function tipShow() {
    ui.divHint.style.display = 'block';
    ui.divHint.className += ' show';
  }

  function tipHide() {
    ui.divHint.className = ui.divHint.className.replace('show', '');
    ui.divHint.style.display = 'none';
  }

  function refreshDrinkInputText() {
    ui.spanSelected.innerHTML = drinkInput.getCurrent().name;
    var current = drinkInput.getCurrent();

    ui.spanSelected.innerHTML = current.name;
    ui.imgCup.style.backgroundColor = current.color;
  }

  function refreshDrinkOutputBlock() {
    var current = drinkOutput.getCurrent();

    var str = helpers.objectJoin(current, 'name', ', ');
    var result = cocktails.find(current);
    var canMix = !result.length;

    if (!str) {
    str = 'Empty';
    }

    ui.spanMixed.innerHTML = str;
    ui.btnMix.disabled = canMix;
    ui.btnMix.innerHTML = 'Mix it (' + result.length + ')';
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
    refreshDrinkInputBlock();
  });

  ui.btnNext.addEventListener('click', function() {
    drinkInput.setNext();
    refreshDrinkInputBlock();
  });
 
  ui.btnAdd.addEventListener('click', function() {
    drinkOutput.addToMix(drinkInput.getCurrent());
    
    refreshDrinkOutputBlock();
  });

  ui.btnDrop.addEventListener('click', function() {
    drinkOutput.dropCurrentMix();
    
    refreshDrinkOutputBlock();
  }); 

  ui.btnMix.addEventListener('click', function() {
    showAviableMixes();
  });

  ui.btnResult.addEventListener('click', function() {
    this.style.display = 'none';
  });

  ui.imgCup.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('drink', drinkInput.getCurrentPos());

    tipShow();
  });

  ui.imgCup.addEventListener('dragend', tipHide);

  ui.divHint.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  ui.divHint.addEventListener('drop', function(e) {
    e.preventDefault();

    // cheat :p
    drinkOutput.addToMix(drinkInput.getCurrent());
    refreshDrinkOutputBlock();
  });
});
