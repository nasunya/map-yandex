let myMap;
let coords;
let clusterer;

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

  clusterer = new ymaps.Clusterer({
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

  const name = form.querySelector('[name="name"]'), //получаем поле name
      place = form.querySelector('[name="place"]'), //получаем поле age
      review = form.querySelector('[name="review"]'), //получаем поле terms


      myPlacemark = new ymaps.Placemark(coords, {
        // Зададим содержимое заголовка балуна.
        balloonContentHeader: `<span href = "#">${name.value}</span><br> 
          <span class="description">${place.value}</span>`,
        // Зададим содержимое основной части балуна.
        balloonContentBody: `<span>${review.value}</span>`,

      });



    myMap.geoObjects.add(myPlacemark);
    clusterer.add(myPlacemark);

    
    event.target.reset(); //очистка формы

    //нужно вставить массив отзывов
    myPlacemark.properties.set('my-id', Date.now());
    myPlacemark.events.add('click', e => {
      console.log('marker');
      
      // openModal(event);
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