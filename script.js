function moveSlide(slideNumber) {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slides');
    const buttons = document.querySelectorAll('button'); // Seleccionar todos los botones
    const slideWidth = slides[0].offsetWidth + 5; // Ancho de un slide inactivo más el margen

    let offset;
    if (slideNumber === 1) {
        offset = slideWidth * (slideNumber - 1);
    } else {
        offset = slideWidth * (slideNumber - 1) - (window.innerWidth - slideWidth) / 2;
    }

    slider.style.transform = `translateX(-${offset}px)`;

    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideNumber - 1) {
            slide.classList.add('active');
        }
    });

    // Remover la clase 'active-button' de todos los botones y añadirla solo al botón activo
    buttons.forEach((button, index) => {
        button.classList.remove('active-button');
        if (index === slideNumber - 1) {
            button.classList.add('active-button');
        }
    });
}
