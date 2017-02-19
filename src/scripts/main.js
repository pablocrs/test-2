
function Menu(target){

    var Menu = this;

    Menu.data = null;
    Menu.target = document.getElementById(target);

    Menu.buildMenu = function(menu,target){

        var target = document.getElementById(target);
        var documentFragment = document.createDocumentFragment();

        menu.forEach(function(item) {
            var element = document.createElement("li");
            var link = document.createElement("a");

            link.textContent = item.description;
            link.href = item.link;
            element.appendChild(link);

            if(item.menu != null){

                element.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (this.classList.contains('is-active')) {
                        this.classList.remove('is-active');
                    } else {
                        this.classList.add('is-active');
                    }
                });

                var submenu = document.createElement("ul");
                var submenuLinks = Menu.buildMenu(item.menu);
                submenu.appendChild(submenuLinks)
                element.appendChild(submenu);
            }

            documentFragment.appendChild(element);
        });

        return documentFragment;
    };

    Menu.getMenu = function(){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(e) {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                var theMenu = Menu.buildMenu(JSON.parse(e.currentTarget.responseText).menu,target);
                var target = document.getElementById('js-menu');
                target.appendChild(theMenu);
            }
        }
        xmlHttp.open('GET','scripts/menu.json', true);
        xmlHttp.send(null);
    };
}

var Menu = new Menu();
Menu.getMenu();
