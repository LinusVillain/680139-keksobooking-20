'use strict';

var COUNT = 8;
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 25;
var MAIN_PIN_CENTER = 33;
var MAIN_PIN_ACTIVE = 87;

var adverts = [];
var type = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var adForm = document.querySelector('.ad-form');
var mapPinList = document.querySelector('.map__pins');
var pinTemplateContent = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');

var getRandomInt = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var generateAdverts = function (count) {
  var array = [];
  for (var i = 0; i < count; i++) {
    array.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (i + 1) + '.png'
          },
          offer: {
            title: 'Сдам квартиру',
            address: getRandomInt(1, 600) + ', ' + getRandomInt(1, 350),
            price: getRandomInt(1, 5000),
            type: type[getRandomInt(0, type.length - 1)],
            rooms: getRandomInt(1, 100),
            guests: getRandomInt(1, 100),
            checkin: time[getRandomInt(0, time.length - 1)],
            checkout: time[getRandomInt(0, time.length - 1)],
            features: shuffleArray(features).slice(0, getRandomInt(0, features.length)),
            description: 'Сдается квартира на краткосрочный и длительный период',
            photos: shuffleArray(photos).slice(0, getRandomInt(0, photos.length))
          },
          location: {
            x: getRandomInt(1, map.offsetWidth),
            y: getRandomInt(130, 630)
          }
        }
    );
  }
  return array;
};

var renderPins = function (pinList, destinationBlock) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pinList.length; i++) {
    pinFragment.appendChild(pinList[i]);
  }

  destinationBlock.appendChild(pinFragment);
};

var createPins = function (array) {
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
};

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

var setAddress = function () {
  var isFade = map.classList.contains('map--faded');
  if (isFade) {
    address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_CENTER) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_CENTER);
  } else {
    address.value = (parseInt(mainPin.style.left, 10) + MAIN_PIN_CENTER) + ', ' + (parseInt(mainPin.style.top, 10) + MAIN_PIN_ACTIVE);
  }
};

var disablePage = function () {
  disableAdvertInputs(true);

  setAddress();
};

var enablePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  disableAdvertInputs(false);

  adverts = generateAdverts(COUNT);

  renderPins(createPins(adverts), mapPinList);

  setAddress();

};

disablePage();

mainPin.addEventListener('mousedown', function (evt) {

  if (evt.button === 0) {
    enablePage();
  }

}, {once: true});

mainPin.addEventListener('keydown', function (evt) {

  if (evt.key === 'Enter') {
    enablePage();
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
