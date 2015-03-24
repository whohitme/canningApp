angular.module('starter.services', [])

.factory('Selection', function() {

  // Array to store/retrieve canning choices
  // type, food, jar size, pack, elevation, and canning type
  var choose = [];

  return {
    add: function(item,i) {
      //alert(item);
      choose[i] = item;
    },
    get: function(itemId) {
      //alert(choose[itemId]);
      return choose[itemId];
    }
  }
});
/*
.filter('myFilter', function() {
  // take the chosen items and get the correct pressure and time values
  return function(items) {

    var filtered = [];

    angular.forEach(items, function() {

    })
  }
})*/