'use strict';

(function () {

  window.map.disablePage();

  window.address.mainPin.addEventListener('mousedown', function (evt) {

    if (evt.button === 0) {
      window.map.enablePage();
    }

  }, {once: true});

  window.address.mainPin.addEventListener('keydown', function (evt) {

    if (evt.key === 'Enter') {
      window.map.enablePage();
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
})();
