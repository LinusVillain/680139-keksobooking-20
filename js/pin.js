'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_HALF_WIDTH = 25;
  var pinTemplateContent = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    renderPins: function (pinList, destinationBlock) {
      var pinFragment = document.createDocumentFragment();

      for (var i = 0; i < pinList.length; i++) {
        pinFragment.appendChild(pinList[i]);
      }

      destinationBlock.appendChild(pinFragment);
    },

    createPins: function (array) {
      var pinList = [];

      for (var i = 0; i < array.length; i++) {
        var pinElement = pinTemplateContent.cloneNode(true);

        pinElement.style.left = array[i].location.x - PIN_HALF_WIDTH + 'px';
        pinElement.style.top = array[i].location.y - PIN_HEIGHT + 'px';

        var pinImage = pinElement.firstChild;

        pinImage.src = array[i].author.avatar;
        pinImage.alt = array[i].offer.title;

        pinList.push(pinElement);
      }

      return pinList;
    }
  };
})();
