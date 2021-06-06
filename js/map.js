let myMap;
let coords;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
  myMap = new ymaps.Map('map', {
    center: [55.76, 37.64], // Москва
    zoom: 12,
    controls: []
  }, {
    searchControlProvider: 'yandex#search'
  });

  let clusterer = new ymaps.Clusterer({
    gridSize: 64,
    groupByCoordinates: false,
    hasBalloon: true,
    hasHint: true,
    margin: 10,
    maxZoom: 14,
    minClusterSize: 3,
    showInAlphabeticalOrder: false,
    viewportMargin: 128,
    zoomMargin: 0,
    clusterDisableClickZoom: true
  });
  
  clusterer.add(myPlacemark);
  myMap.geoObjects.add(clusterer);

  addListeneres();
}


function validateForm() {
  return true;
}

function addListeneres() {

  myMap.events.add('click', function (event) {
    openModal(event);
  });


  const form = document.getElementById('sendForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateForm()) { //проверяет перед проверкой, заполнены ли поля 
      return;
    }

    myPlacemark = new ymaps.Placemark(coords, {
      hintContent: 'Собственный значок метки',
      balloonContent: 'Это красивая метка'
    }, {
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      preset: 'islands#darkOrangeDotIcon',
      // Размеры метки.
      iconImageSize: [30, 42],
    });

  myMap.geoObjects.add(myPlacemark);



    //нужно вставить массив отзывов
    myPlacemark.properties.set('my-id', Date.now());
    myPlacemark.events.add('click', e => {
      console.log('marker');

      const idMark = myPlacemark.properties.get('my-id');
      console.log(idMark);
    });


    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  });


}


function openModal(event) {

  let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;
  let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;
  coords = event.get('coords'); //координаты пинов
  // getClickCoords(coords);

  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  modal.style.left = `${posX}px`;
  modal.style.top = `${posY}px`;

}

let closeModal = document.querySelector(".modal__close");
let modal = document.querySelector("#modal");
closeModal.onclick = function () {
  modal.style.display = "none";
};


// зная координаты кликак можем получить адрес


// function getClickCoords(coords) {
//   return new Promise((resolve, reject) => {
//       ymaps.geocode(coords)
//           .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
//           .catch(e => reject(e))
//   })
// }