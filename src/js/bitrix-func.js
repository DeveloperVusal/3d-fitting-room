/*
 *
 * ПРИМЕР ДАННЫХ СМОТРЕТЬ В ФАЙЛЕ ---> data.js
 * 
 */

// Подгрузка списка избранных
function bitrix_favorite_load() {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, который получает товары в избранном
        и добавляет данные в перменную «favorites_data», которая объаявлена в data.js
    */

    /* Начало — Данный код служит для тестовой демонстрации */

    _favorites_test = []

    for (let i = 0; i < favorites_data.length; i++) {
        for (let j = 0; j < bitrix_goods.length; j++) {
            if (Number(bitrix_goods[j].id) === Number(favorites_data[i])) {
                _favorites_test.push(bitrix_goods[j])
            }
            
        }
    }

    /* Конец — Данный код служит для тестовой демонстрации */

    return _favorites_test
}

// Подгрузка Брендов
function bitrix_load_brands() {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, который получает список всех брендов
        и добавляет данные в перменную bitrix_brands, которая объаявлена в data.js
        
    */

    print_collections_brands({
        brands: bitrix_brands
    })
}

// Подгрузка Коллекций бренда
function bitrix_load_collections(_brand_id) {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, который получает список всех коллекций бренда
        и добавляет данные в перменную «bitrix_collections», которая объаявлена в data.js
        
    */

    /* Начало — Данный код служит для тестовой демонстрации */

    let _collections_test = []

    for (let i = 0; i < bitrix_collections.length; i++) {
        if (Number(bitrix_collections[i].brand_id) === Number(_brand_id)) {
            _collections_test.push(bitrix_collections[i])
        }
        
    }

    /* Конец — Данный код служит для тестовой демонстрации */

    print_collections_brands({
        collections: _collections_test // Сюда передаем полученные коллекции
    })
}

// Подгрузка обоев коллекциий
function bitrix_load_goods(_collection_id) {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, который получает список всех обоев (товаров) коллекции
        и добавляет данные в перменную «bitrix_goods», которая объаявлена в data.js
        
    */

    /* Начало — Данный код служит для тестовой демонстрации */

    let _goods_test = []

    for (let i = 0; i < bitrix_goods.length; i++) {
        if (Number(bitrix_goods[i].collection_id) === Number(_collection_id)) {
            _goods_test.push(bitrix_goods[i])
        }
        
    }

    // console.log('_goods_test', _goods_test)

    /* Конец — Данный код служит для тестовой демонстрации */

    print_wallpapers(_goods_test) // Сюда передаем полученные товары
}


// Поиск по обоям
function bitrix_search_goods(_value) {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, который получает список всех обоев (товаров) по заданному запросу
        и формирует заранее подходящий массив данных
    */

    /* Начало — Данный код служит для тестовой демонстрации */

    let _goods_test = []

    for (let i = 0; i < bitrix_goods.length; i++) {
        let str = bitrix_goods[i].articul

        if (str.indexOf(_value) != -1) _goods_test.push(bitrix_goods[i])
        
    }

    console.log('search', '_goods_test', _goods_test)

    /* Конец — Данный код служит для тестовой демонстрации */

    return _goods_test
}

// Добавление в корзину
function bitrix_cart_add(el, good_id) {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, отправить в качестве параметра good_id
    */

    let added_status = true

    if (added_status === true) {
        addClass(el, 'w-list__item-shopping-cart-control--active')
        setTimeout(function() { alert('Товар добавлен в корзину')}, 1000)
    }
}

// Удаление из корзины
function bitrix_cart_remove(el, good_id) {
    /*
        Request Server
        --------------
        Тут написать запрос на сервер, отправить в качестве параметра good_id
    */

    let remove_status = true

    if (remove_status === true) {
        removeClass(el, 'w-list__item-shopping-cart-control--active')
    }
}
