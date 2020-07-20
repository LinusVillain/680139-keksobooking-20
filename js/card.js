'use strict';

(function () {
  var cardTemplateContent = document.querySelector('#card').content.querySelector('.map__card');
  var imageTemplateContent = cardTemplateContent.querySelector('.popup__photo');


  window.card = {
    renderCard: function (cardElement, mainBlock, beforeBlock) {
      var cardFragment = document.createDocumentFragment();

      cardFragment.appendChild(cardElement);

      mainBlock.insertBefore(cardFragment, beforeBlock);

      // destinationBlock.appendChild(cardFragment);
    },
    createCards: function (element) {

      var cardElement = cardTemplateContent.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = element.offer.title;

      cardElement.querySelector('.popup__text--address').textContent = element.offer.address;

      cardElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';

      cardElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';

      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

      cardElement.querySelector('.popup__description').textContent = element.offer.description;

      cardElement.querySelector('.popup__avatar').src = element.author.avatar;

      cardElement.querySelector('.popup__type').textContent = window.data.typeHousing[element.offer.type];

      var photosContainer = cardElement.querySelector('.popup__photos');

      photosContainer.innerHTML = '';

      var photosFragment = document.createDocumentFragment();

      for (var i = 0; i < element.offer.photos.length; i++) {
        var imageThumbnail = imageTemplateContent.cloneNode(true);
        imageThumbnail.src = element.offer.photos[i];
        photosFragment.appendChild(imageThumbnail);
      }
      photosContainer.appendChild(photosFragment);

      var featureList = cardElement.querySelector('.popup__features');
      var featuresFragment = document.createDocumentFragment();
      for (var j = 0; j < element.offer.features.length; j++) {
        var currentFeature = featureList.querySelector('.popup__feature--' + element.offer.features[j]).cloneNode();
        featuresFragment.appendChild(currentFeature);
      }
      featureList.innerHTML = '';
      featureList.appendChild(featuresFragment);

      return cardElement;
    }
  };
})();
