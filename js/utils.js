'use strict';

(function () {
  window.utils = {
    getRandomInt: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    }
  };
})();
