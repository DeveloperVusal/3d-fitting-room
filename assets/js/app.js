// alert('Hello world!');

const tabs = document.querySelectorAll('.room-gallery__navigation div')

for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function(event) {
        addClass(event.target, 'room-gallery__navigation-title--active')

        select_tab(event.target.id, rooms[event.target.id])

        for (let j = 0; j < tabs.length; j++) {
            if (event.target.id !== tabs[j].id) removeClass(tabs[j], 'room-gallery__navigation-title--active')
        }
    })
}

select_tab('livingroom', rooms.livingroom)

const roomlist = document.querySelectorAll('.room-gallery__list div')

for (let i = 0; i < roomlist.length; i++) {
    roomlist[i].addEventListener('click', function(event) {
        let _id = event.target.parentNode.id.split(':')
        let _room = _id[0]
        _id = _id[1]

        document.querySelector('.progress-screen').style.display = 'block'
        
        room_open(rooms[_room][_id], [_room, _id])
    })
}

document.querySelector('.room_view_home_back').addEventListener('click', function() {
    window.location.href = web_url
})

document.querySelector('.w-article-navigation__back').addEventListener('click', function() {
    wallpaper_back()
    document.querySelector('.w-input').value = ''
})

document.querySelector('.room_wallpaper_view_clear').addEventListener('click', function() {
    wallpaper_clear()
})

document.querySelector('.w-article-navigation__home-wrapper').addEventListener('click', function() {
    document.querySelector('.w-article-navigation__title').innerText = 'Бренды'
    document.querySelector('.w-article-navigation__back').style.display = 'none'
    this.style.display = 'none'
    document.querySelector('.w-input').value = ''

    bitrix_load_brands()
})

document.querySelector('.w-articles-controls__favorites').addEventListener('click', function() {
    favorites_open()
})

document.querySelector('.w-input__button').addEventListener('click', function() {
    search_handler(document.querySelector('.w-input'))
})

document.querySelector('.w-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        search_handler(document.querySelector('.w-input'))
    }
})