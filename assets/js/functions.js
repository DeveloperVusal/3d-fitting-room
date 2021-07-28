var ROOM_NAME = ''
var ROOM_ID = 0


var WALLPAPER_STEP_NUM = 0
var WALLPAPER_STEP_SECTION = 'brands'
var WALLPAPER_STEP_NAME = 'Бренды'

var WALLPAPER_STEP_BRAND_ID = 0
var WALLPAPER_STEP_COLLECTION_ID = 0

// var WALLPAPER_STEP = 0;
// var WALLPAPER_STEP_BRAND = ''
// var WALLPAPER_STEP_BRAND_ID = 0
// var WALLPAPER_STEP_COLLECTION = ''
var WALLPAPER_STEP_SAVENUM = 0
var WALLPAPER_STEP_SAVE_NAME = ''
var WALLPAPER_STEP_SAVE_NAME_2 = ''
var WALLPAPER_STEP_SAVE_ID = 0
var WALLPAPER_STEP_SAVE_ID_2 = 0

function select_tab(room, obj) {
    const room_list = document.querySelectorAll('.room-gallery__list div')

    for (let i = 0; i < room_list.length; i++) {
        room_list[i].children[1].src = obj[i]
        room_list[i].id = room + ':' + i
    }
}

function room_back() {
    let screen_1 = document.querySelector('.room_screen-1')
    let screen_2 = document.querySelector('.room_screen-2')

    screen_1.style.display = 'block'
    screen_2.style.display = 'none'

    wallpaper_clear()
}

function room_open(img, _data) {
    let screen_1 = document.querySelector('.room_screen-1')
    let screen_2 = document.querySelector('.room_screen-2')

    screen_1.style.display = 'none'
    screen_2.style.display = 'flex'

    document.querySelector('.w-preview-image__image').src = img

    ROOM_NAME = _data[0]
    ROOM_ID = _data[1]

    let wallpaperslist = document.querySelectorAll('.w-list div.w-list__item')

    if (!wallpaperslist.length) bitrix_load_brands()
    
    for (let i = 0; i < wallpaperslist.length; i++) {
        let wallpaper = wallpaperslist[i]

        removeClass(wallpaper, 'w-catalog-image--is-active')
    }

    setTimeout(function() {
        document.querySelector('.progress-screen').style.display = 'none'
    }, 700)
}

function get_brand(_id, _value) {
    for (let [key, value] of Object.entries(bitrix_brands)) {
        if (Number(value.id) === Number(_id)) return value[_value]
    }

    return false;
}

function get_collection(_id, _value) {
    for (let [key, value] of Object.entries(bitrix_collections)) {
        if (Number(value.id) === Number(_id)) return value[_value]
    }

    return false;
}

function get_good(_id) {
    for (let [key, value] of Object.entries(bitrix_goods)) {
        if (Number(value.id) === Number(_id)) return value
    }

    return false;
}

function wallpaper_open(object) {
    if (object.hasOwnProperty('collection_id')) {
        let collection_name = get_collection(object.collection_id, 'name')

        document.querySelector('.w-article-navigation__title').innerText = collection_name
        document.querySelector('.w-article-navigation__back').style.display = 'flex'
        document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'

        WALLPAPER_STEP_NUM = 2;
        WALLPAPER_STEP_SECTION = 'wallpapers'
        WALLPAPER_STEP_COLLECTION_ID = object.collection_id
        WALLPAPER_STEP_NAME = collection_name

        bitrix_load_goods(object.collection_id)
    } else if (object.hasOwnProperty('brand_id')) {
        let brand_name = get_brand(object.brand_id, 'name')

        document.querySelector('.w-article-navigation__title').innerText = brand_name
        document.querySelector('.w-article-navigation__back').style.display = 'flex'
        document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'

        bitrix_load_collections(object.brand_id)

        WALLPAPER_STEP_NUM = 1;
        WALLPAPER_STEP_SECTION = 'collections'
        WALLPAPER_STEP_BRAND_ID = object.brand_id
        WALLPAPER_STEP_NAME = brand_name
    }
}

function wallpaper_back() {
    if (WALLPAPER_STEP_NUM === 1) {
        document.querySelector('.w-article-navigation__title').innerText = 'Бренды'
        document.querySelector('.w-article-navigation__back').style.display = 'none'
        document.querySelector('.w-article-navigation__home-wrapper').style.display = 'none'

        bitrix_load_brands()

        WALLPAPER_STEP_NUM = 0
        WALLPAPER_STEP_NAME = ''
        WALLPAPER_STEP_SECTION = 'brands'

    } else if (WALLPAPER_STEP_NUM === 2) {
        document.querySelector('.w-article-navigation__title').innerText = get_brand(WALLPAPER_STEP_BRAND_ID, 'name')

        console.log('WALLPAPER_STEP_BRAND_ID', WALLPAPER_STEP_BRAND_ID)
        // print_collections_brands(WALLPAPER_STEP_BRAND)
        bitrix_load_collections(WALLPAPER_STEP_BRAND_ID)

        WALLPAPER_STEP_NUM = 1
        WALLPAPER_STEP_NAME = ''
        WALLPAPER_STEP_SECTION = 'collections'
    } else if (WALLPAPER_STEP_NUM === 5) {
        document.querySelector('.w-article-list').style.display = 'block'
        document.querySelector('.w-favorites__stub').style.display = 'none'
        document.querySelector('.w-searchs__stub').style.display = 'none'
        document.querySelector('.w-article-filters__input-field').style.display = 'block'

        if (WALLPAPER_STEP_SAVENUM === 0) {
            document.querySelector('.w-article-navigation__title').innerText = WALLPAPER_STEP_SAVE_NAME

            removeClass(document.querySelector('.w-articles-controls__favorites'), 'w-articles-controls__favorites--active')
            bitrix_load_brands()

            WALLPAPER_STEP_NUM = 0;
        } else if (WALLPAPER_STEP_SAVENUM === 1) {
            document.querySelector('.w-article-navigation__title').innerText = WALLPAPER_STEP_SAVE_NAME
            document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'

            removeClass(document.querySelector('.w-articles-controls__favorites'), 'w-articles-controls__favorites--active')
            bitrix_load_collections(WALLPAPER_STEP_SAVE_ID)

            WALLPAPER_STEP_NUM = 1;
        } else if (WALLPAPER_STEP_SAVENUM === 2) {
            document.querySelector('.w-article-navigation__title').innerText = WALLPAPER_STEP_SAVE_NAME_2
            document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'
            
            removeClass(document.querySelector('.w-articles-controls__favorites'), 'w-articles-controls__favorites--active')
            // wallpaper_open(WALLPAPER_STEP_SAVE_NAME, WALLPAPER_STEP_SAVE_NAME_2)
            bitrix_load_goods(WALLPAPER_STEP_SAVE_ID_2)

            WALLPAPER_STEP_NUM = 2
        }
    }
}

function favorites_open() {
    let wallpapers = bitrix_favorite_load()

    document.querySelector('.w-article-navigation__title').innerText = 'Избранное'
    document.querySelector('.w-article-navigation__back').style.display = 'flex'
    document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'

    addClass(document.querySelector('.w-articles-controls__favorites'), 'w-articles-controls__favorites--active')

    if (WALLPAPER_STEP_NUM === 0) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = 'Бренды'
        WALLPAPER_STEP_SAVENUM = 0
    } else if (WALLPAPER_STEP_NUM === 1) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = get_brand(WALLPAPER_STEP_BRAND_ID, 'name')
        WALLPAPER_STEP_SAVE_ID = WALLPAPER_STEP_BRAND_ID
        WALLPAPER_STEP_SAVENUM = 1
    } else if (WALLPAPER_STEP_NUM === 2) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = get_brand(WALLPAPER_STEP_BRAND_ID, 'name')
        WALLPAPER_STEP_SAVE_NAME_2 = get_collection(WALLPAPER_STEP_COLLECTION_ID, 'name')
        WALLPAPER_STEP_SAVE_ID = WALLPAPER_STEP_BRAND_ID
        WALLPAPER_STEP_SAVE_ID_2 = WALLPAPER_STEP_COLLECTION_ID
        WALLPAPER_STEP_SAVENUM = 2
    }

    document.querySelector('.w-article-filters__input-field').style.display = 'none'
    document.querySelector('.w-article-navigation__home-wrapper').style.display = 'none'

    if (wallpapers.length) {
        print_wallpapers(wallpapers, true)
    } else {
        document.querySelector('.w-article-list').style.display = 'none'
        document.querySelector('.w-favorites__stub').style.display = 'flex'
    }
}

function print_wallpapers(datawallpaper, favoriteis) {
    let wallpaperlist = document.querySelector('.w-list')
    wallpaperhtml = ''
    
    for (let i = 0; i < datawallpaper.length; i++) {
        let show = true

        if (favoriteis === true) {
            show = (datawallpaper[i].favorite === true) ? true : false
        }

        if (show === true) {
            wallpaperhtml += `
                <div class="w-list__item" id="good_id:${datawallpaper[i].id}">
                    <div class="w-image">
                        <span class="MuiSkeleton-root jss18 MuiSkeleton-rect w-catalog-image-stub yesysss"></span>
                        <div class="w-catalog-image">
                            <div class="w-catalog-image__wrapper">
                                <img class="w-catalog-image__preview" src="${datawallpaper[i].img}">
                                <div class="w-catalog-image__favorite ${(datawallpaper[i].favorite === true) ? 'w-catalog-image__favorite--is-active' : ''}">
                                    <div title="Добавить в избранное" class="w-catalog-image__favorite-tooltip">
                                        <div class="w-catalog-image__favorite-inner flex-center">
                                            <svg class="js_favorite_svg_btn" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="js_favorite_svg_btn" d="M22.39 11.862c-.426-2.13-1.954-3.503-3.921-3.503-1.1 0-2.291.449-3.456 1.296-1.178-.873-2.369-1.322-3.482-1.322-1.968 0-3.508 1.386-3.922 3.542-.622 3.195 1.372 7.443 7.21 9.753a.522.522 0 00.388 0c5.825-2.361 7.805-6.596 7.184-9.766z" fill="currentColor"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-list__item-description">
                        <span class="w-list__item-name">
                            <div title="${datawallpaper[i].articul}" class="">
                                <span class="w-list__item-name-inner">${datawallpaper[i].articul}</span>
                            </div>
                        </span>
                        <div title="Перейти на страницу продукта" class="">
                            <span class="w-secondary-button w-list__item-info flex-center">
                                <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 12A6 6 0 106 0a6 6 0 000 12zm-.715-6.25a.75.75 0 111.5 0v2.625a.75.75 0 01-1.5 0V5.75zm1.5-2.357a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" fill="currentColor"></path></svg>
                            </span>
                        </div>
                    </div>
                    <div class="w-list__item-price-wrapper w-list__item-price-wrapper--space-between">
                        <span class="w-list__item-price">${datawallpaper[i].price} РУБ.</span>
                        <div title="${(datawallpaper[i].cart === true) ? 'Удалить из корзины' : 'Добавить в корзину'}" class="">
                            <button class="MuiButtonBase-root MuiIconButton-root artciles__shopping-cart-btn artciles__shopping-cart-btn--desktop w-list__item-shopping-cart-control flex-center w-list__item-shopping-cart-control ${(datawallpaper[i].cart === true) ? 'w-list__item-shopping-cart-control--active' : ''}" tabindex="0" type="button">
                                <span class="MuiIconButton-label">
                                    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.315 11.833c0-2.393 1.785-4.333 3.988-4.333 2.203 0 3.989 1.94 3.989 4.333h.307c1.016 0 1.84.896 1.84 2L20.212 20.5c0 1.105-.824 2-1.84 2h-6.137c-1.017 0-1.841-.895-1.841-2l-1.227-6.667c0-1.104.824-2 1.84-2h.308zm6.136 0c0-1.288-.962-2.333-2.148-2.333-1.186 0-2.148 1.045-2.148 2.333h4.296z" fill="currentColor"></path></svg>
                                </span>
                                <span class="MuiTouchRipple-root"></span>
                            </button>
                        </div>
                    </div>
                </div>
            `
        }
    }

    wallpaperlist.innerHTML = wallpaperhtml

    let wallpaperslist = document.querySelectorAll('.w-list div.w-list__item')

    for (let i = 0; i < wallpaperslist.length; i++) {
        let wallpaper = wallpaperslist[i]

        let good_id = wallpaper.id.split(':')[1];
        let obj_good = get_good(good_id)

        // console.log('obj_good', obj_good)

        let _imgurl = obj_good.img
        let imagebtn = wallpaper.children[0]

        imagebtn.addEventListener('click', function(event) {
            let _className = event.target.className
            let _tagName = event.target.tagName

            _tagName.toLowerCase()

            if (_tagName === 'path' || _tagName === 'svg') {
                _className = _className.baseVal
            }

            if (
                _className === 'w-catalog-image__favorite-inner flex-center' ||
                _className === 'js_favorite_svg_btn' || 
                _className === 'w-catalog-image__favorite-tooltip' ||
                _className === 'w-catalog-image__favorite'
            ) {
                // None event
            } else {
                console.log('id', good_id)
                console.log('_imgurl', _imgurl)
                console.log('')

                wallpaper_actived({
                    el: wallpaper,
                    imgurl: _imgurl
                })
            }
        })

        let favoritebtn = wallpaper.children[0].children[1].children[0].children[1]

        favoritebtn.addEventListener('click', function() {
            if (hasClass(this, 'w-catalog-image__favorite--is-active')) {
                removeClass(this, 'w-catalog-image__favorite--is-active')

                favorite_remove(good_id)
            } else {
                addClass(this, 'w-catalog-image__favorite--is-active')

                favorite_add(good_id)
            }
        })

        let cartbtn = wallpaper.children[2].children[1].children[0]
        
        cartbtn.addEventListener('click', function() {
            if (hasClass(this, 'w-list__item-shopping-cart-control--active')) {
                bitrix_cart_remove(this, good_id)
            } else {
                bitrix_cart_add(this, good_id)
            }
        })

        // console.log(`wallpaper[${i}]`, wallpaper.children[2].children[1])
    }
    
}

function favorite_add(good_id) {
    favorites_data.push(good_id)

    for (let i = 0; i < bitrix_goods.length; i++) {
        if (Number(bitrix_goods[i].id) === Number(good_id)) {
            bitrix_goods[i].favorite = true

            break
        }
    }

    let el_fv = document.querySelector('.w-articles-controls__favorites-bage')

    el_fv.innerText = favorites_data.length
    el_fv.style.display = 'flex'
}

function favorite_remove(good_id) {
    let new_favorites = [];
    let el_fv = document.querySelector('.w-articles-controls__favorites-bage')

    for (let i = 0; i < favorites_data.length; i++) {
        if (favorites_data[i] !== good_id) {
            new_favorites.push(favorites_data[i])
        }
    }

    for (let i = 0; i < bitrix_goods.length; i++) {
        if (Number(bitrix_goods[i].id) === Number(good_id)) {
            bitrix_goods[i].favorite = false

            break
        }
    }

    favorites_data = new_favorites

    el_fv.innerText = favorites_data.length

    if (!favorites_data.length) el_fv.style.display = 'none'
}

function wallpaper_actived(object) {
    document.querySelector('.progress-screen').style.display = 'block'

    let el_clear = document.querySelector('.room_wallpaper_view_clear')
    let wallpaperslist = document.querySelectorAll('.w-list div.w-list__item')

    el_clear.style.display = 'flex'

    for (let i = 0; i < wallpaperslist.length; i++) {
        let wallpaper = wallpaperslist[i]

        removeClass(wallpaper, 'w-catalog-image--is-active')
    }

    addClass(object.el, 'w-catalog-image--is-active')
    
    document.querySelector('.w-preview-image__image').src = room_parts[ROOM_NAME][ROOM_ID]

    print_texture({
        img: object.imgurl
    })

    // console.log('parts', room_parts[ROOM_NAME][ROOM_ID])

    setTimeout(function() {
        document.querySelector('.progress-screen').style.display = 'none'
    }, 700)
}

function print_texture(object) {
    document.querySelector('.w-preview-image__image').src = room_parts[ROOM_NAME][ROOM_ID]
    let sum_width = 1200
    let sum_height = 800

    let print_left = 0
    let print_top = 0

    var img = new Image();
    
    img.onload = function() {
        const texture_width = 120
        const texture_height = Math.floor(this.height / (this.width / texture_width))

        // alert(this.width + 'x' + this.height);
        // alert(this.height / (this.width / texture_width))

        const texture_top = texture_height - 10
        const texture_left = texture_height - 26

        let htmlprint = ''

        for (print_left = 0; print_left <= sum_width; print_left += texture_left) {

            for (print_top = 0; print_top <= sum_height; print_top += texture_top) {
                htmlprint += `
                    <div
                        class="w-preview-image__texture_line"
                        style="
                            width: ${texture_width}px;
                            height: ${texture_height}px;
                            background: url('${object.img}') 0% 0% / ${texture_width}px no-repeat;
                            left: ${print_left}px;
                            top: ${print_top}px;
                        "
                    ></div>
                `
            }
            
        }

        document.querySelector('.w-preview-image__texture_child').innerHTML = htmlprint
    }

    img.src = object.img;
    // document.querySelector('.w-preview-image__inner').style.background = `url('${object.img}')`
    // document.querySelector('.w-preview-image__inner').style.backgroundSize = '80px'
    // document.querySelector('.w-preview-image__inner').style.backgroundRepeat = 'repeat'
}

function print_collections_brands(object) {
    let brandlist = document.querySelector('.w-list')
    let brandhtml = ''

    if (object.hasOwnProperty('brands')) {
        if (object.brands !== undefined && object.brands !== null) {
            const brands = object.brands

            for (let i = 0; i < brands.length; i++) {
                brandhtml += `
                    <div class="w-list__item" id="brand:${brands[i].id}">
                        <div class="w-image">
                            <span class="MuiSkeleton-root jss10 MuiSkeleton-rect w-catalog-image-stub yesysss"></span>
                            <div class="w-catalog-image">
                                <div class="w-catalog-image__wrapper">
                                    <img class="w-catalog-image__preview" src="${brands[i].logo}">
                                </div>
                            </div>
                        </div>
                        <div class="w-list__item-description w-list__item-description--without-link">
                            <span class="w-list__item-name">
                                <div title="${brands[i].name}">
                                    <span class="w-list__item-name-inner">${brands[i].name}</span>
                                </div>
                            </span>
                        </div>
                    </div>
                `
            }

            brandlist.innerHTML = brandhtml

            let brandslist = document.querySelectorAll('.w-list div.w-list__item')

            for (let i = 0; i < brandslist.length; i++) {
                let brand = brandslist[i]

                brand.addEventListener('click', function(event) {
                    let parent = event.target
                    parent = parent.closest('.w-list__item')

                    let _brand_id = parent.id.split(':')[1]
                    
                    console.log('_brand_id', _brand_id)

                    wallpaper_open({
                        brand_id: _brand_id
                    })
                })
            }
        }
    } else if (object.hasOwnProperty('collections')) {
        const collections = object.collections

        for (let i = 0; i < collections.length; i++) {
            
            brandhtml += `
                <div class="w-list__item" id="collection:${collections[i].id}">
                    <div class="w-image">
                        <span class="MuiSkeleton-root jss10 MuiSkeleton-rect w-catalog-image-stub yesysss"></span>
                        <div class="w-catalog-image">
                            <div class="w-catalog-image__wrapper">
                                <img class="w-catalog-image__preview" src="${collections[i].logo}">
                            </div>
                        </div>
                    </div>
                    <div class="w-list__item-description w-list__item-description--without-link">
                        <span class="w-list__item-name">
                            <div title="${collections[i].name}">
                                <span class="w-list__item-name-inner">${collections[i].name}</span>
                            </div>
                        </span>
                    </div>
                </div>
            `
        }

        brandlist.innerHTML = brandhtml

        let collectlist = document.querySelectorAll('.w-list div.w-list__item')

        for (let i = 0; i < collectlist.length; i++) {
            let collect = collectlist[i]

            collect.addEventListener('click', function(event) {
                let parent = event.target
                parent = parent.closest('.w-list__item')

                let _collection_id = parent.id.split(':')[1]

                console.log('_collection_id', _collection_id)

                wallpaper_open({
                    collection_id: _collection_id
                })
            })
        }
    }
}

function wallpaper_clear() {
    let el_clear = document.querySelector('.room_wallpaper_view_clear')
    let wallpaperslist = document.querySelectorAll('.w-list div.w-list__item')

    el_clear.style.display = 'none'

    for (let i = 0; i < wallpaperslist.length; i++) {
        let wallpaper = wallpaperslist[i]

        removeClass(wallpaper, 'w-catalog-image--is-active')
    }

    document.querySelector('.w-preview-image__inner').style.background = ''
    document.querySelector('.w-preview-image__inner').style.backgroundSize = ''
    document.querySelector('.w-preview-image__inner').style.backgroundRepeat = ''

    document.querySelector('.w-preview-image__image').src = rooms[ROOM_NAME][ROOM_ID]
    
}

function wallpaper_favorite(data) {

}

function search_handler (el) {
    document.querySelector('.w-article-navigation__title').innerText = '"'+ el.value +'"'
    document.querySelector('.w-article-navigation__back').style.display = 'flex'
    document.querySelector('.w-article-navigation__home-wrapper').style.display = 'block'

    if (WALLPAPER_STEP_NUM === 0) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = 'Бренды'
        WALLPAPER_STEP_SAVENUM = 0
    } else if (WALLPAPER_STEP_NUM === 1) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = get_brand(WALLPAPER_STEP_BRAND_ID, 'name')
        WALLPAPER_STEP_SAVE_ID = WALLPAPER_STEP_BRAND_ID
        WALLPAPER_STEP_SAVENUM = 1
    } else if (WALLPAPER_STEP_NUM === 2) {
        WALLPAPER_STEP_NUM = 5
        WALLPAPER_STEP_SAVE_NAME = get_brand(WALLPAPER_STEP_BRAND_ID, 'name')
        WALLPAPER_STEP_SAVE_NAME_2 = get_collection(WALLPAPER_STEP_COLLECTION_ID, 'name')
        WALLPAPER_STEP_SAVE_ID = WALLPAPER_STEP_BRAND_ID
        WALLPAPER_STEP_SAVE_ID_2 = WALLPAPER_STEP_COLLECTION_ID
        WALLPAPER_STEP_SAVENUM = 2
    }

    let wallpapers = bitrix_search_goods(el.value)

    if (wallpapers.length) {
        print_wallpapers(wallpapers)
    } else {
        document.querySelector('.w-article-list').style.display = 'none'
        document.querySelector('.w-searchs__stub').style.display = 'block'
    }

    console.log('el', el)
}

/* =========================== */

function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ')
}

function addClass(elem, className) {
    if (!hasClass(elem, className)) {
        elem.className += ' ' + className
    }
}

function removeClass(elem, className) {
    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' '

    if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
            newClass = newClass.replace(' ' + className + ' ', ' ')
        }

        elem.className = newClass.replace(/^\s+|\s+$/g, '')
    }
}