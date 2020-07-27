'use strict';

(function () {
  window.address.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    var pinDrag = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var height = window.address.mainPin.offsetTop - shift.y;
      var width = window.address.mainPin.offsetLeft - shift.x;

      if (height < 130) {
        height = 130 - window.address.MAIN_PIN_ACTIVE;
      } else if (height > 630) {
        height = 630;
      }

      if (width < 1) {
        width = 1 - window.address.MAIN_PIN_CENTER;
      } else if (width > window.data.map.offsetWidth) {
        width = window.data.map.offsetWidth + window.address.MAIN_PIN_CENTER;
      }

      window.address.mainPin.style.top = height + 'px';
      window.address.mainPin.style.left = width + 'px';

      window.address.generateAddress(window.address.MAIN_PIN_CENTER, window.address.MAIN_PIN_ACTIVE);
    };

    var mouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.data.map.removeEventListener('mousemove', pinDrag);
      document.removeEventListener('mouseup', mouseUp);
    };

    window.data.map.addEventListener('mousemove', pinDrag);
    document.addEventListener('mouseup', mouseUp);
  });
})();
