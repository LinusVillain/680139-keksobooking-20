'use strict';

var COUNT = 8;
var PIN_HEIGHT = 70;
var PIN_HALF_WIDTH = 25;

var types = {
  palace: {
    ru: 'дворец'
  },
  flat: {
    ru: 'квартира'
  },
  house: {
    ru: 'дом'
  },
  bungalo: {
    ru: 'бунгало'
  }
};

var adverts = [];
var type = ['palace', 'flat', 'house', 'bungalo'];
var time = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');

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

var renderPin = function (array, i) {
  var pinElement = pinTemplateContent.cloneNode(true);

  pinElement.style.left = array[i].location.x - PIN_HALF_WIDTH + 'px';
  pinElement.style.top = array[i].location.y - PIN_HEIGHT + 'px';

  var pinImage = pinElement.firstChild;

  pinImage.src = array[i].author.avatar;
  pinImage.alt = array[i].offer.title;

  return pinElement;
};

var createPin = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {

    var pinElement = renderPin(array, i);
    fragment.appendChild(pinElement);
  }

  return fragment;
};

adverts = generateAdverts(COUNT);

map.classList.remove('map--faded');

var mapPinList = document.querySelector('.map__pins');
var pinTemplateContent = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsFragment = createPin(adverts);
mapPinList.appendChild(pinsFragment);
