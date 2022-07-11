# Пример React приложения

## Были выполнены следующие требования по верстке:


1. Не использовать плагины галереи или подобные, которые сделают за вас основную задачу.
2. Использовать Flexbox модель и Grid для вёрстки.
3. Мобильная верстка должна отображаться при ширине менее 540 px.
4. Десктопный вариант тянется по ширине максимум для отображения 4 колонок, после этого контент не тянется, увеличиваются только отступы по краям.
5. При выборе категории отображаются только картинки этой категории, при выборе "Show all" отобразить все картинки.

## Возможности приложения:

1. При старте приложения происходит Fetch запрос в базу данных Firebase и загрузка первых 9 элементов.
2. Исходя из категорий загруженных элементов формируется фильтр по категориям - в виде кнопок для десктопа и select dropdown для мобильного. Для опции select был сделан кастомный стиль dropdown.
3. При выборе фильтра отображаются только элементы выбранной категории, при выборе Show All - все.
4. Нажатие на метку категории внутри картинки также переключает отображения категории.
5. Нажатие кнопки "Load more" подгружает еще 9 картинок (картинки загружаются те же самые, просто изменяются имена проектов).
6. Для десктопа сделана возможность выбрать картинку нажав на нее, добавляется подсветка зеленым цветом для выделенных картинок, исходя из макета. Повторное нажатие убирает подсветку.
7. На десктопе, если есть выбранная картинка, при нажатии кнопки "Del" картинка удаляется. После чего она отображается в том числе при переключении категорий.

## Комментарии реализации

* Создавал приложение с помощью Create React App.
* Испольховал Fetch API для работы с базой данных Firebase.
* Использовал Redux, Redux-thunk для глобального состояния. В данной задаче можно было бы обойтись и Context API, но решил попрактиковать redux.

## TODO

* Использовать Redux для глобального состояния
***
* Исправить недочеты верстки, использовать SСSS.


## Демо

Я настроил деплой на Firebase, демо можно посмотреть здесь — [React Test App](https://jupiter-test-a0449.web.app/).

### Локальный запуск


npm start


Открыть http://localhost:3000/


