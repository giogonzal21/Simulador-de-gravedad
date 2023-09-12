// Objeto con rutas de las imágenes de los planetas
const planetImages = {
    'Mercurio': 'mercurio.jpg',
    'Venus': 'venus.jpg',
    'Tierra': 'tierra.jpg',
    'Marte': 'marte.jpg',
    'Jupiter': 'jupiter.jpg',
    'Saturno': 'saturno.jpg',
    'Urano': 'urano.jpg',
    'Neptuno': 'neptuno.jpg'
};

// Función para cambiar la imagen del planeta seleccionado
function changePlanetImage() {
    const planetSelect = document.getElementById('planetSelect');
    const planetImage = document.getElementById('planetImage');
    const selectedPlanet = planetSelect.value;
    const planetImagePath = planetImages[selectedPlanet];
    planetImage.src = planetImagePath;
}

// Asocia la función al evento "change" del menú desplegable
document.getElementById('planetSelect').addEventListener('change', changePlanetImage);

// Ejecuta la función inicialmente para mostrar la imagen del planeta predeterminado
changePlanetImage();

// Función para simular la caída libre
function simulateFreeFall() {
    const planetSelect = document.getElementById('planetSelect');
    const selectedPlanet = planetSelect.value;
    const gravity = getGravity(selectedPlanet); // Obtener la gravedad del planeta
    const freeFallImage = document.getElementById('freeFallImage');
    const planetImage = document.getElementById('planetImage');

    // Obtener la posición inicial del planeta
    const planetPosition = planetImage.getBoundingClientRect();
    const planetTop = planetPosition.top + window.scrollY + planetPosition.height;

    // Posición inicial del meteorito más arriba del planeta
    freeFallImage.style.top = (planetTop - 190) + 'px'; //Altura deseada

    // Tamaño de la imagen del meteorito
    freeFallImage.style.width = '100px'; // Establece el ancho deseado en píxeles
    freeFallImage.style.height = '100px'; // Establece el alto deseado en píxeles

    // Agrega la imagen del meteorito
    freeFallImage.src = 'meteorito.jpg'; 

    // Mostrar la imagen de caída libre
    freeFallImage.style.display = 'block';

    // Posición inicial del meteorito
    let position = planetTop - 190; //Altura deseada

    // Retraso antes de que comience la caída libre
    setTimeout(() => {
        // Simular la caída libre
        const animationInterval = setInterval(() => {
            // Calcula la nueva posición del meteorito
            position += 5; // Ajusta la velocidad de caída (entre mayor valor cae mas rapido)
            freeFallImage.style.top = position + 'px';

            // Verifica que el meteorito ha llegado al suelo
            if (position >= window.innerHeight - 100) {
                clearInterval(animationInterval); // Detener la simulación al llegar al suelo
                freeFallImage.style.top = (window.innerHeight - 100) + 'px'; // Fijar la posición en el suelo

                // Efecto sacudida al impactar el meteorito
                shakePage();
            }
        }, 20); // Intervalo deseado en milisegundos
    }, 1000); // Tiempo de retraso deseado en milisegundos
}

// Función de sacudida al sitio web
function shakePage() {
    const originalMarginLeft = document.body.style.marginLeft;
    const originalMarginTop = document.body.style.marginTop;

    const shakeInterval = setInterval(() => {
        const randomX = Math.random() * 10 - 5;
        const randomY = Math.random() * 10 - 5;
        document.body.style.marginLeft = `${randomX}px`;
        document.body.style.marginTop = `${randomY}px`;
    }, 50);

    setTimeout(() => {
        clearInterval(shakeInterval);
        document.body.style.marginLeft = originalMarginLeft;
        document.body.style.marginTop = originalMarginTop;
    }, 1000); // Duración del efecto de sacudida en milisegundos
}

// Se asocia la función de simulación al clic en la imagen del planeta
document.getElementById('planetImage').addEventListener('click', simulateFreeFall);

// Función para obtener la gravedad de un planeta
function getGravity(planet) {
    // Se definen las gravedades de los planetas en m/s² (aproximadamente)
    const gravityValues = {
        'Mercurio': 3.7,
        'Venus': 8.87,
        'Tierra': 9.81,
        'Marte': 3.711,
        'Jupiter': 24.79,
        'Saturno': 10.44,
        'Urano': 8.69,
        'Neptuno': 11.15
    };

    return gravityValues[planet];
}
