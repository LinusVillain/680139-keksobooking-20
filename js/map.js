'use strict';

(function () {

  var COUNT = 8;
  var adverts = [];
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var mapPinList = document.querySelector('.map__pins');

  var disableAdvertInputs = function (isDisable) {
    var formInputs = [
      mapFilters.querySelectorAll('select'),
      adForm.querySelectorAll('fieldset')
    ];

    for (var input = 0; input < formInputs.length; input++) {
      for (var i = 0; i < formInputs[input].length; i++) {
        formInputs[input][i].disabled = isDisable;
      }
    }
  };

  window.map = {
    filtersContainer: document.querySelector('.map__filters-container'),
    disablePage: function () {

      disableAdvertInputs(true);

      window.address.setAddress();
    },

    enablePage: function () {

      window.data.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      disableAdvertInputs(false);

      adverts = window.data.generateAdverts(COUNT);

      var pinArray = window.pin.createPins(adverts);

      window.pin.renderPins(pinArray, mapPinList);

      for (var pinIndex = 0; pinIndex < pinArray.length; pinIndex++) {
        (function () {

          var cardEvent = function () {
            window.card.renderCard(window.card.createCards(advert), window.data.map, window.map.filtersContainer);

            var mapCard = document.querySelector('.map__card');
            var buttonClose = mapCard.querySelector('.popup__close');

            buttonClose.addEventListener('mousedown', function (evt2) {
              if (evt2.button === 0) {
                mapCard.remove();
              }
            });

            document.addEventListener('keydown', function (evt2) {
              if (evt2.key === 'Escape') {
                mapCard.remove();
              }
            });
          };

          var advert = adverts[pinIndex];
          pinArray[pinIndex].addEventListener('mousedown', function (evt) {
            if (evt.button === 0) {
              cardEvent();
            }
          });
          pinArray[pinIndex].addEventListener('keydown', function (evt) {
            if (evt.key === 'Enter') {
              cardEvent();
            }
          });
        }());
      }
      window.address.setAddress();
    }
  };
})();
