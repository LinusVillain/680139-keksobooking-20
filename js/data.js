'use strict';

(function () {

  var type = ['palace', 'flat', 'house', 'bungalo'];
  var time = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


  window.data = {
    typeHousing: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    map: document.querySelector('.map'),
    generateAdverts: function (count) {
      var array = [];
      for (var i = 0; i < count; i++) {
        array.push(
            {
              author: {
                avatar: 'img/avatars/user0' + (i + 1) + '.png'
              },
              offer: {
                title: 'Сдам квартиру',
                address: window.utils.getRandomInt(1, 600) + ', ' + window.utils.getRandomInt(1, 350),
                price: window.utils.getRandomInt(1, 5000),
                type: type[window.utils.getRandomInt(0, type.length - 1)],
                rooms: window.utils.getRandomInt(1, 100),
                guests: window.utils.getRandomInt(1, 100),
                checkin: time[window.utils.getRandomInt(0, time.length - 1)],
                checkout: time[window.utils.getRandomInt(0, time.length - 1)],
                features: window.utils.shuffleArray(features).slice(0, window.utils.getRandomInt(0, features.length)),
                description: 'Сдается квартира на краткосрочный и длительный период',
                photos: window.utils.shuffleArray(photos).slice(0, window.utils.getRandomInt(0, photos.length))
              },
              location: {
                x: window.utils.getRandomInt(1, window.data.map.offsetWidth),
                y: window.utils.getRandomInt(130, 630)
              }
            }
        );
      }
      return array;
    }
  };
})();
