'use strict';

(function () {
  window.address = {
    MAIN_PIN_CENTER: 32,
    MAIN_PIN_ACTIVE: 84,
    mainPin: document.querySelector('.map__pin--main'),
    address: document.querySelector('#address'),
    generateAddress: function (pinHalthWidth, pinHeight) {
      window.address.address.value = (parseInt(window.address.mainPin.style.left, 10) + pinHalthWidth) + ', ' + (parseInt(window.address.mainPin.style.top, 10) + pinHeight);
    },
    setAddress: function () {
      var isFade = window.data.map.classList.contains('map--faded');
      if (isFade) {
        window.address.generateAddress(window.address.MAIN_PIN_CENTER, window.address.MAIN_PIN_CENTER);
      } else {
        window.address.generateAddress(window.address.MAIN_PIN_CENTER, window.address.MAIN_PIN_ACTIVE);
      }
    }
  };

})();
