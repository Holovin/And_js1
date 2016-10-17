'use strict';

var drinks = new Storage();
var cocktails = new Cocktails();

(function() {
  // hide from window scope
  var drinkWater = new Drink('Water', true, 'blue');
  var drinkJuice = new Drink('Juice', false, 'orange');
  var drinkSugar = new Drink('Sugar', false, '#999');

  var cocktailOne = new Cocktail('Juice water', [drinkWater, drinkJuice]);
  var cocktailSecond = new Cocktail('Sugar water', [drinkWater, drinkSugar]);

  drinks.add(drinkWater);
  drinks.add(drinkJuice);
  drinks.add(drinkSugar);

  cocktails.add(cocktailOne);
  cocktails.add(cocktailSecond);
})();
