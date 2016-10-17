'use strict';

var drinks = new Storage();
var cocktails = new Cocktails();

(function() {
  // hide from window scope
  var drinkWater = new Drink('Water', 10, 'test');
  var drinkJuice = new Drink('Juice', 20, 'test');
  var drinkSugar = new Drink('Sugar', 20, 'test');

  var cocktailOne = new Cocktail('Juice water', [drinkWater, drinkJuice]);
  var cocktailSecond = new Cocktail('Sugar water', [drinkWater, drinkSugar]);

  drinks.add(drinkWater);
  drinks.add(drinkJuice);
  drinks.add(drinkSugar);

  cocktails.add(cocktailOne);
  cocktails.add(cocktailSecond);
})();
