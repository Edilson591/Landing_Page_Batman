document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("btn-mobile")
    const header = document.querySelector(".header")
    const headerContainer = document.querySelector(".header__container")
    const nav = document.querySelector(".header__nav");
    const links = document.querySelector(".header__links");


    function handleMenu(e) {
        if (e.type === "touchstart") e.preventDefault();
        nav.classList.toggle("header__nav--is-active")
        header.classList.toggle("header--is-active")
        headerContainer.classList.toggle("header__container--is-active")
        links.classList.toggle("header__links--is-active")

        //verifica se tem a classe header__nav--is-active
        const active = nav.classList.contains("header__nav--is-active");
        button.setAttribute("aria-expanded", active);
        button.setAttribute("aria-label", active ? "Fecha Menu" : "Abrir Menu");



    }

    const selectLinks = nav.querySelectorAll("a")

    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && event.target !== button) {
            closeMenu();
        }
    });

    selectLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        })
    });

    function closeMenu() {
        nav.classList.remove("header__nav--is-active")
        header.classList.remove("header--is-active")
        headerContainer.classList.remove("header__container--is-active")
        links.classList.remove("header__links--is-active")


        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir Menu');
    }


    button.addEventListener('click', handleMenu)


})