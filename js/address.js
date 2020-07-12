'use strict';

(function () {

  var MAIN_PIN_CENTER = 33;
  var MAIN_PIN_ACTIVE = 87;
  var address = document.querySelector('#address');

  window.address = {
    mainPin: document.querySelector('.map__pin--main'),
    setAddress: function () {
      var isFade = window.data.map.classList.contains('map--faded');
      if (isFade) {
        address.value = (parseInt(window.address.mainPin.style.left, 10) + MAIN_PIN_CENTER) + ', ' + (parseInt(window.address.mainPin.style.top, 10) + MAIN_PIN_CENTER);
      } else {
        address.value = (parseInt(window.address.mainPin.style.left, 10) + MAIN_PIN_CENTER) + ', ' + (parseInt(window.address.mainPin.style.top, 10) + MAIN_PIN_ACTIVE);
      }
    }
  };

})();
