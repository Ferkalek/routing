var fullLink,
    carentLink = location.pathname,
    carentTitle = document.querySelector('title'),
    contentElem = document.querySelector('.content'),
    menuItem = document.querySelectorAll('.nav a'),
    config = [
        [
            '/',
            {
                urlTemplate : '/view/home.html',
                title : 'Home'
            }
        ],
        [
            '/about',
            {
                urlTemplate : '/view/about.html',
                title : 'About'
            }
        ],
        [
            '/blog',
            {
                urlTemplate : '/view/blog.html',
                title : 'Blog'
            }
        ],
        [
            '/contacts',
            {
                urlTemplate : '/view/contacts.html',
                title : 'Contacts'
            }
        ],
        [
            '/404',
            {
                urlTemplate : '/view/404.html',
                title : 'Error 404'
            }
        ]
    ];

/*формирование полной ссылки при обнавлении страницы или
 * переходу по кнопкам взад вперед из той хрени, что написана
 * в адресной строке
 * */
function getLink(){
    for (var i = 0; i < config.length; i++) {
        if (config[i][0] == carentLink) {
            return config[i];
        }
    }
    return config[4];
};

var getLinkLoad = getLink();
refreshLoadContent(getLinkLoad);

//вешаю события на пункты меню
for(var i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener('click',
        function (e) {
            var getLinkClick = clickLinkMenu(e);
            refreshLoadContent(getLinkClick);
        }
    );
}

function refreshLoadContent(getObj) {
    var link = getObj[1].urlTemplate,
        title = getObj[1].title;

    carentTitle.text = title;
    loadContent(link);
}

function clickLinkMenu(e) {
    e.preventDefault();
    fullLink = e.target.attributes.href.value;

    window.history.replaceState( {}, '', fullLink);

    for (var i = 0; i < config.length; i++) {
        if (config[i][0] == fullLink) {
            return config[i];
        }
    }
    return config[4];
};

//ajax загрузка страницы
function loadContent(link) {
    var http = createRequestObject();					// создаем ajax-объект
    if( http ) {
        http.open('get', link);							// инициируем загрузку страницы
        http.onreadystatechange = function () {			// назначаем асинхронный обработчик события
            if(http.readyState == 4) {
                contentElem.innerHTML = http.responseText;		// присваиваем содержимое
            }
        }
        http.send(null);
    } else {
        document.location = link;	// если ajax-объект не удается создать, просто перенаправляем на адрес
    }
}

// создание ajax объекта
function createRequestObject() {
    try { return new XMLHttpRequest() }
    catch(e) {
        try { return new ActiveXObject('Msxml2.XMLHTTP') }
        catch(e) {
            try { return new ActiveXObject('Microsoft.XMLHTTP') }
            catch(e) { return null; }
        }
    }
}