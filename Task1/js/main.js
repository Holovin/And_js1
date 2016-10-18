'use strict';

var drinks = new Storage();
var cocktails = new Cocktails();

(function() {
  // hide from window scope
  var drinkWater = new Drink('Water', true, '#03A9F4');
  var drinkJuice = new Drink('Juice', false, '#FF5722');
  var drinkSugar = new Drink('Sugar', false, '#607D8B');

  var cocktailOne = new Cocktail('Juice water', [drinkWater, drinkJuice]);
  var cocktailSecond = new Cocktail('Sugar water', [drinkWater, drinkSugar]);

  drinks.add(drinkWater);
  drinks.add(drinkJuice);
  drinks.add(drinkSugar);

  cocktails.add(cocktailOne);
  cocktails.add(cocktailSecond);
})();
