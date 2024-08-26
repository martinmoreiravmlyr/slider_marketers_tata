const slideMappings = {
    'Awareness': 'awareness-slider',
    'Engagement': 'engagement-slider',
    'Conversión': 'conversion-slider'
};

function moveSlide(sliderId, slideNumber) {
    const slider = document.getElementById(sliderId);
    const slides = slider.querySelectorAll('.slide');
    const slideWidth = slides[0].offsetWidth;
    const totalSlides = slides.length;

    // Calcular el desplazamiento para centrar la diapositiva seleccionada
    const offset = (window.innerWidth - slideWidth) / 2 - (slideNumber - 1) * slideWidth;

    // Mover el contenedor .slides
    slider.querySelector('.slides').style.transform = `translateX(${offset}px)`;

    // Ajustar escala y opacidad de las diapositivas
    slides.forEach((slide, index) => {
        if (index === slideNumber - 1) {
            slide.classList.add('active');
            slide.style.transform = 'scale(1)';
            slide.style.opacity = '1';
        } else {
            slide.classList.remove('active');
            slide.style.transform = 'scale(0.8)';
            slide.style.opacity = '0.5';
        }
    });

    // Actualizar estado de los botones
    const buttons = document.querySelectorAll('#slideButtons button');
    buttons.forEach((button, index) => {
        button.classList.remove('active-button');
        if (index === slideNumber - 1) {
            button.classList.add('active-button');
        }
    });
    
}

function filterSlides(category) {
    Object.keys(slideMappings).forEach(key => {
        const slider = document.getElementById(slideMappings[key]);
        if (key === category) {
            slider.style.display = 'block';
            moveSlide(slideMappings[key], 1); // Mover a la primera diapositiva
        } else {
            slider.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const selectedProduct = localStorage.getItem('selectedProduct') || 'Awareness';
    filterSlides(selectedProduct);
    populateButtons(selectedProduct);
});

function populateButtons(category) {
    const slideButtonsDiv = document.getElementById('slideButtons');
    slideButtonsDiv.innerHTML = '';

    const currentSliderId = slideMappings[category];
    const slides = document.getElementById(currentSliderId).querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        const button = document.createElement('button');
        button.innerText = slide.querySelector('h1').innerText;
        button.onclick = function() {
            moveSlide(currentSliderId, index + 1);
        };
        slideButtonsDiv.appendChild(button);
    });


    // Activar el primer botón por defecto
    const buttons = document.querySelectorAll('#slideButtons button');
    if (buttons.length > 0) {
        buttons[0].classList.add('active-button');
    }
    
}