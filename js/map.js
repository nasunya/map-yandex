let myMap;
let coords;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
  myMap = new ymaps.Map('map', {
    center: [55.76, 37.64], // Москва
    zoom: 10,
    controls: []
  }, {
    searchControlProvider: 'yandex#search'
  });




//   var clusterer = new ymaps.Clusterer({
//     clusterDisableClickZoom: true,
//     clusterOpenBalloonOnClick: true,
//     // Устанавливаем стандартный макет балуна кластера "Карусель".
//     clusterBalloonContentLayout: 'cluster#balloonCarousel',
//     // Устанавливаем собственный макет.
//     clusterBalloonItemContentLayout: customItemContentLayout,
//     // Устанавливаем режим открытия балуна.
//     // В данном примере балун никогда не будет открываться в режиме панели.
//     clusterBalloonPanelMaxMapArea: 0,
//     // Устанавливаем размеры макета контента балуна (в пикселях).
//     clusterBalloonContentLayoutWidth: 200,
//     clusterBalloonContentLayoutHeight: 130,
//     // Устанавливаем максимальное количество элементов в нижней панели на одной странице
//     clusterBalloonPagerSize: 5
//     // Настройка внешнего вида нижней панели.
//     // Режим marker рекомендуется использовать с небольшим количеством элементов.
//     // clusterBalloonPagerType: 'marker',
//     // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
//     // clusterBalloonCycling: false,
//     // Можно отключить отображение меню навигации.
//     // clusterBalloonPagerVisible: false
// });

// map.geoObjects.add(clusterer);


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
      iconImageHref: 'img/pin.jpg',
      // Размеры метки.
      iconImageSize: [30, 42],
    });
    myMap.geoObjects.add(myPlacemark);

//нужно вставить массив отзывов
    myPlacemark.properties.set('my-id', Date.now());
    myPlacemark.events.add('click', e => {
      console.log('marker');
  
      const idMark =  myPlacemark.properties.get('my-id');
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
