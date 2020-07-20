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

      window.pin.renderPins(window.pin.createPins(adverts), mapPinList);

      window.address.setAddress();

      window.card.renderCard(window.card.createCards(adverts[0]), window.data.map, window.map.filtersContainer);
    }
  };
})();
