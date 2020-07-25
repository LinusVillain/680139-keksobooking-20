'use strict';

(function () {

  var minPriceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var checkTime = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var inputPrice = document.querySelector('#price');
  var selectType = document.querySelector('#type');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');

  window.map.disablePage();

  window.address.mainPin.addEventListener('mousedown', function (evt) {

    if (evt.button === 0) {
      window.map.enablePage();
    }

  }, {once: true});

  window.address.mainPin.addEventListener('keydown', function (evt) {

    if (evt.key === 'Enter') {
      if (window.data.map.classList.contains('map--faded')) {
        window.map.enablePage();
      }
    }

  }, {once: true});

  var RoomCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var selectRoomNumber = document.querySelector('#room_number');
  var selectCapacity = document.querySelector('#capacity');

  var roomCapacityHandler = function () {
    var isCapacityRight = false;

    for (var i = 0; i < RoomCapacity[selectRoomNumber.value].length; i++) {
      if (selectCapacity.value === RoomCapacity[selectRoomNumber.value][i]) {
        isCapacityRight = true;
      }
    }

    if (isCapacityRight) {
      selectCapacity.setCustomValidity('');
    } else {
      if (selectRoomNumber.value === '100') {
        selectCapacity.setCustomValidity('Здесь не предусмотрено размещение гостей.');
      } else {
        selectCapacity.setCustomValidity('Вы можете разместить не более одного гостя в каждой комнате.');
      }
    }
  };

  selectRoomNumber.addEventListener('change', roomCapacityHandler);
  selectCapacity.addEventListener('change', roomCapacityHandler);

  roomCapacityHandler();

  selectType.addEventListener('change', function () {
    inputPrice.min = minPriceOfType[selectType.value];
    inputPrice.placeholder = minPriceOfType[selectType.value];
  });

  checkIn.addEventListener('change', function () {
    checkOut.value = checkTime[checkIn.value];
  });

  checkOut.addEventListener('change', function () {
    checkIn.value = checkTime[checkOut.value];
  });

})();
