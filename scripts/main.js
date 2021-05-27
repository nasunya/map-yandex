let myMap;
let coords;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init)

function init() {
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10,
    }, {
        searchControlProvider: 'yandex#search'
    });

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        // Устанавливаем стандартный макет балуна кластера "Карусель".
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        // Устанавливаем собственный макет.
        clusterBalloonItemContentLayout: customItemContentLayout,
        // Устанавливаем режим открытия балуна.
        // В данном примере балун никогда не будет открываться в режиме панели.
        clusterBalloonPanelMaxMapArea: 0,
        // Устанавливаем размеры макета контента балуна (в пикселях).
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        clusterBalloonPagerSize: 5
        // Настройка внешнего вида нижней панели.
        // Режим marker рекомендуется использовать с небольшим количеством элементов.
        // clusterBalloonPagerType: 'marker',
        // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
        // clusterBalloonCycling: false,
        // Можно отключить отображение меню навигации.
        // clusterBalloonPagerVisible: false
    });

    map.geoObjects.add(clusterer);



    addListeners();
}


function validateForm() {
    return true;
}

function addListeners() {
    objectManager.objects.events.add(['mouseenter', 'mouseleave', 'click'], onObjectEvent);
    objectManager.clusters.events.add(['mouseenter', 'mouseleave', 'click'], onClusterEvent);

    myMap.events.add('click', function (event) {
        openModal(event);
    });

    const form = document.getElementById('sendForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validateForm()) {
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
        objectManager.add(myPlacemark);


        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    })


}


function onObjectEvent(){
    console.log('Object');

}

function onClusterEvent(){
    console.log('Cluster');
}


function openModal(event) {
    let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;
    let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;
    coords = event.get('coords');
    getClickCoords(coords);


    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modal.style.left = `${posX}px`;
    modal.style.top = `${posY}px`;
}

function getClickCoords(coords) {
    return new Promise((resolve, reject) => {
        ymaps.geocode(coords)
            .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
            .catch(e => reject(e))
    })
}


function init(){
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 8,
    });




    myMap.geoObjects.add(myPlacemark);
    myMap.geoObjects.add(myPlacemark1);
    myMap.geoObjects.add(objectManager);

    addListeneres()
}


function addListeneres(){

    objectManager.objects.events.add(['mouseenter', 'mouseleave'], onObjectEvent);
    objectManager.clusters.events.add(['mouseenter', 'mouseleave'], onClusterEvent);


    const btn = document.getElementById('send');

    btn.addEventListener('click', function(event){
        event.preventDefault();
        validateForm();
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
        objectManager.add(myPlacemark);

        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    });
}


function validateForm(){
    const comment = document.getElementById('')
}

function openModal(event){

    const adr = getClickCoords(coords);
    console.log(adr);

}



function onObjectEvent(){

}


function onClusterEvent(){

}




// let myMap;


// ymaps.ready(init);


// const init = () => {
//   myMap = new ymaps.Map("map", {
//     center: [59.939097, 30.315868],
//     zoom: 11,
//     controls: []
//   });

//   const coods = [
//     [59.94554327989287, 30.38935262114668],
//     [59.91142323563909, 30.50024587065841],
//     [59.88693161784606, 30.319658102103713]
//   ];

//   const myCollection = new ymaps.GeoObjectCollection({}, {
//     draggable: false,
//     iconLayout: 'default#image',
//     iconImageHref: './img/map.png',
//     iconImageSize: [46, 57],
//     iconImageOffset: [-35, -52]
//   });

//   coods.forEach(coods => {
//     myCollection.add(new ymaps.Placemark(coods));
//   });

//   myMap.geoObjects.add(myCollection);
// }
