function paginateImages(images, imagesPerPage) {
    const pages = [];
    for (let i = 0; i < images.length; i += imagesPerPage) {
        pages.push(images.slice(i, i + imagesPerPage));
    }
    return pages;
}

async function getBatmans() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/Edilson591/Landing_Page_Batman/main/api/batman.json")
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const getResponse = await response.json()
        console.log(getResponse)
        const imagesPerPage = 9;
        const pages = paginateImages(getResponse, imagesPerPage);
        
        getImagensBat(pages)
    }catch (error) {
        console.error('Erro ao buscar imagens do Batman:', error);
    }
}



function getImagensBat(pages) {
    const galleryimagens = document.querySelector(".gallery__container");

    galleryimagens.innerHTML = ""

    const nav = document.createElement("nav")
    nav.classList = "gallery__tabs"

    for (let i = 0; i < pages.length; i++) {
        const button = document.createElement('button');
        button.classList = 'gallery__tabs__button'
        button.textContent = `Page ${i+ 1}`;
        button.dataset.page = i + 1;
        button.addEventListener('click', () => showPage(i + 1));
        nav.appendChild(button);
    }

    galleryimagens.appendChild(nav)

    pages.forEach((page, index) => {
        const pageList = document.createElement('ul');
        pageList.className = 'gallery__list';
        pageList.dataset.tabId = `page${index + 1}`;

        page.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'gallery__list__item';

            const img = document.createElement('img');
            img.src = item;
            img.alt = 'foto galeria';

            listItem.appendChild(img);
            pageList.appendChild(listItem);
        });

        galleryimagens.appendChild(pageList);
    });
        showPage(1);
    }

    function showPage(pageNumber) {
        const allPages = document.querySelectorAll('.gallery__list');
        const allButtons = document.querySelectorAll('.gallery__tabs__button');
        allPages.forEach(page => {
            page.style.display = page.dataset.tabId === `page${pageNumber}` ? 'grid' : 'none';
        });
        allButtons.forEach(button => {
            if(parseInt(button.dataset.page) === pageNumber) {
                button.classList.add("gallery__tabs__button--is-active");
            }else {
                button.classList.remove("gallery__tabs__button--is-active");
            }
        })

    }



getBatmans()

