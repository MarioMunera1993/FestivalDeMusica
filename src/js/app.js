document.addEventListener("DOMContentLoaded", function (params) {
    navegacionFija();
    crearGaleria();
    resaltarEnLace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");

    document.addEventListener("scroll", function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 16; i++) {
        const imagen = document.createElement("PICTURE");
        imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

        //Even Handler
        imagen.onclick = function () {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement("PICTURE");
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;


    //Generar modal
    const modal = document.createElement("DIV");
    modal.classList.add("modal");
    modal.onclick = cerrarModal;

    modal.appendChild(imagen);

    //Agregar al HTML
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector(".modal");
    modal.classList.add("fade-out");

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector("body");
        body.classList.remove("overflow-hidden");
    }, 500);
}

function resaltarEnLace() {
    document.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".navegacion-principal a");

        let actual = "";
        sections.forEach((section) => {
            //obtenemos la distancia del seccion con relacion al padre
            const sectionTop = section.offsetTop;

            //obtenemos cuanto mide el section
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                actual = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${actual}`) {
                link.classList.add("active");
            }
        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(e.target.getAttribute("href"));

            const sectionScroll = e.target.getAttribute("href");
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: "smooth" });
        });
    });
}
