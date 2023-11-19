// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); //добавление мин значения по весу
const maxWeight = document.querySelector('.maxweight__input');//добавление мак значения по весу

// список фруктов в JSON формате. это массив с объектами
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек

const display = () => {
  
  // TODO: очищаем fruitlist от вложенных элементов,
 // чтобы заполнить актуальными данными из fruits
 fruitsList.replaceChildren();

 fruits.map(function (item, index) {
   return item.index = index;
 });
   for (let i = 0; i < fruits.length; i++) {
   // TODO: формируем новый элемент <li> при помощи document.createElement,
   // и добавляем в конец списка fruitsList при помощи document.appendChild
   const li = document.createElement('li');

   const divWrapper = document.createElement('div');
   divWrapper.className = "fruit__info";
   li.appendChild(divWrapper);

   const divIndex = document.createElement('div');
   const divKind = document.createElement('div');
   const divColor = document.createElement('div');
   const divWeight = document.createElement('div');

   divIndex.innerText = `index: ${fruits[i].index}`;
   divWrapper.appendChild(divIndex);

   divKind.innerText = `kind: ${fruits[i].kind}`;
   divWrapper.appendChild(divKind);

   divColor.innerText = `color: ${fruits[i].color}`;
   divWrapper.appendChild(divColor);

   divWeight.innerText = `weight: ${fruits[i].weight}`;
   divWrapper.appendChild(divWeight);

   switch (fruits[i].color) {
     case 'фиолетовый':
       li.className = `fruit__item fruit_violet`;
       break;

     case 'зеленый':
       li.className = `fruit__item fruit_green`;
       break;

     case 'розово-красный':
       li.className = `fruit__item fruit_carmazin`;
       break;

     case 'желтый':
       li.className = `fruit__item fruit_yellow`;
       break;

     case 'светло-коричневый':
       li.className = `fruit__item fruit_lightbrown`;
       break;
   }

   fruitsList.appendChild(li);
 }
};

  display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  // прописываем newFruits и присваиваем объект [...fruits]
   let newFruits = [...fruits]
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
     let randItem = getRandomInt(0, fruits.length - 1)
     result.push(fruits[randItem])
     fruits.splice(randItem, 1)
  } 
  fruits = result;
   let notShuffled = fruits.every((el, index) => el === newFruits[index])
	if (notShuffled) {
		alert('Не перемещен! Попробуйте ещё раз.')
	}
};
// Эта кнопка перемешивания массива и отображения нового
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {

   if (isNaN(maxWeight.value) || isNaN(minWeight.value)) {
     alert('Укажите значение в числовой форме')
     maxWeight.value = '';
     minWeight.value = '';
    return fruits;
  }
   // TODO: допишите функцию 
    return fruits.filter ((item) => {
     if (parseInt(minWeight.value) > parseInt(maxWeight.value)){
        [minWeight.value, maxWeight.value] = [maxWeight.value, minWeight.value];
      }
      return (item.weight >= parseInt(minWeight.value)) && (item.weight <= parseInt(maxWeight.value))
   })
 
};
// кнопка фильтровать
filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету

   const priorityColor = ['фиолетовый','светло-коричневый', 'зеленый','желтый', 'розово-красный'];
   const color1 = priorityColor.indexOf(a.color);
   const color2 = priorityColor.indexOf(b.color); 
   return color1 > color2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
    // Вызов метода сортировки пузырьком
     bubbleMethod(arr, comparation) 
  },
  quickSort(arr, comparation) {
    quickSortMethod(arr, comparation)
    // TODO: допишите функцию быстрой сортировки
  },
  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

 /*Пузырьковая сортировка */ 
   
  function bubbleMethod(arr, comparation) { // arr - массив, который нужно отсортировать по возрастанию.
  const n = arr.length // внешняя итерация по элементам
      for (let i = 0; i < n - 1; i++) {
      // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n - 1 - i; j++) {
             // сравниваем элементы
           if (comparation(arr[j], arr[j + 1])) {
             // делаем обмен элементов
              let temp = arr[j + 1]
              arr[j + 1] = arr[j]
              arr[j] = temp
            }
        }
    }
}

  function quickSortMethod(arr, comparation) {
    if (arr.length < 2){
      return arr;
      }
      let left = []
      let right = []
      let currentItem= Math.floor(arr.length / 2)
      let pivot = arr[currentItem]


      for (let i = 0; i < arr.length; i++) {
      if (i ===currentItem){
      continue
      }
      if (comparation(arr[i], pivot)){
      right.push(arr[i])
      } else {
      left.push(arr[i])
      }   
      }
      return fruits = [...quickSortMethod(left, comparation), pivot, ...quickSortMethod(right, comparation)]
      }

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});