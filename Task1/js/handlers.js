document.addEventListener('DOMContentLoaded', function() {
  var ui = {
    btnPrev: document.getElementById('drink_prev'),
    btnNext: document.getElementById('drink_next'),
    btnAdd: document.getElementById('add'),
    btnDrop: document.getElementById('drop'),
    btnMix: document.getElementById('mix'),
    btnResult: document.getElementById('result'),

    imgCup: document.getElementById('cup'),
    imgArrow: document.getElementById('arrow'),
    imgIce: document.getElementById('ice'),
    imgCupOut: document.getElementById('cup_out'),
    divHint: document.getElementById('hint'),

    spanSelected: document.getElementById('drink_selected'),
    spanMixed: document.getElementById('drink_mixed'),

    divModal: document.getElementById('modal'),
    divModalHeader: document.getElementById('modal_header'),
    divModalContent: document.getElementById('modal_content')
  };

  function resetUI() {
    drinkInput.setCurrent(helpers.getRandomInt(0, drinks.getLength()));
    drinkOutput.dropCurrentMix();

    refreshDrinkInputBlock();
    refreshDrinkOutputBlock();
    refreshCupOut('passive');

    welcomeScreen();
  }

  function welcomeScreen() {
    var cookieData = "was_here=true";

    if (document.cookie.indexOf(cookieData) > -1) {
      return;
    }

    document.cookie = cookieData;

    showModalWindow('Welcome!', '1. Select some items from "Input drink"<br/>' + 
      '2. Add them with "Add button" or with drag&#39;n&#39;drop <br/>' + 
      '3. Look at "Mix it" button and press it when all necessary ingredients added <br/>' +
      '4. Check cocktails which you can mix <br/>' +
      '5. ??? <br/>' + 
      '6. Mix and drink it!');
  }

  function refreshCupOut(state) {
    switch (state) {
      case 'passive': {
        ui.imgCupOut.style.animation = 'colors_passive 10s infinite';
        return;
      }

      case 'active': {
        ui.imgCupOut.style.animation = 'colors_active 5s infinite';
        return; 
      }
    }
  }

  function refreshTip(state) {
    var showClassName = 'show';

    switch (state) {
      case 'show': {
        ui.divHint.style.display = 'block';
        ui.divHint.className += ' ' + showClassName;

        return;
      }

      case 'hide': {
        ui.divHint.className = ui.divHint.className.replace(showClassName, '');
        ui.divHint.style.display = 'none';

        return;
      }
    }
  }

  function refreshDrinkInputBlock() {
    var current = drinkInput.getCurrent();

    ui.spanSelected.innerHTML = current.name;
    ui.spanSelected.style.animation = 'show 0.4s';

    ui.imgCup.style.backgroundColor = current.color;
    ui.imgIce.style.opacity = current.ice ? 1 : 0;
  }

  function refreshDrinkOutputBlock() {
    var current = drinkOutput.getCurrent();

    var str = helpers.objectJoin(current, 'name', ', ');
    var result = cocktails.find(current);
    var canMix = !result.length;

    if (!str) {
      str = 'Empty';
      refreshCupOut('passive');
    } else {
      refreshCupOut('active');
    }

    ui.spanMixed.innerHTML = str;
    ui.spanMixed.style.animation = 'show 0.4s';

    ui.btnMix.disabled = canMix;
    ui.btnMix.innerHTML = 'Mix it (' + result.length + ')';
  }

  function showAvailableMixes() {
    var result = cocktails.find(drinkOutput.getCurrent());
    var str = helpers.objectJoin(result, 'name', '<br/>');

    showModalWindow('Result mix', 'Can be mixed to: <br/>' + str);
  }

  function showModalWindow(header, inner) {
    ui.divModalHeader.innerHTML = header;
    ui.divModalContent.innerHTML = inner;
    ui.divModal.style.display = 'block';
    ui.divModal.addEventListener('click', closeResultHandler);
  }

  function closeResultHandler(e) {
    if (e.target !== ui.divModal) {
      return;
    }

    ui.divModal.style.display = 'none';
    ui.divModal.removeEventListener('click', closeResultHandler);
  }

  function removeAnimation() {
    this.style.animation = '';
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
    showAvailableMixes();
  });

  ui.imgArrow.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('drink', drinkInput.getCurrentPos());

    refreshTip('show');
  });

  ui.imgArrow.addEventListener('dragend', function () {
    refreshTip('hide');
  });

  ui.divHint.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  ui.divHint.addEventListener('drop', function(e) {
    e.preventDefault();

    // cheat :p
    drinkOutput.addToMix(drinkInput.getCurrent());
    refreshDrinkOutputBlock();
  });

  ui.spanSelected.addEventListener('animationend', removeAnimation);
  ui.spanMixed.addEventListener('animationend', removeAnimation);
});
