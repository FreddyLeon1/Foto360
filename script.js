// Configuración de imágenes (¡Asegúrate de que las rutas sean correctas!)
const images = [
    './assets/foto1.jpg',  // Ruta relativa desde index.html
    './assets/foto2.jpg'
];

let currentIndex = 0;
let viewer = null;

// Función para cargar la imagen 360°
function loadImage(index) {
    if (viewer) {
        viewer.destroy(); // Limpiar visor anterior
    }

    viewer = new PhotoSphereViewer.Viewer({
        container: document.getElementById('viewer'),
        panorama: images[index],
        loadingImg: 'https://i.imgur.com/WWX2T1m.gif', // GIF de carga
        loadingTxt: 'Cargando experiencia 360°...',
        navbar: [
            'autorotate', // Rotación automática
            'zoom',       // Zoom manual
            'fullscreen'  // Pantalla completa
        ],
        defaultYaw: '0deg', // Ángulo inicial
        autorotateDelay: 3000, // Tiempo antes de auto-rotar (ms)
        moveSpeed: 1.5, // Velocidad de movimiento
        onReady: () => {
            // Actualizar interfaz cuando la imagen esté lista
            document.getElementById('photo-info').textContent = 
                `${index + 1}/${images.length}`;
            console.log('Imagen cargada:', images[index]);
        },
        onError: (err) => {
            console.error('Error al cargar:', err);
            document.getElementById('photo-info').textContent = 'Error al cargar imagen';
        }
    });
}

// Navegación
function showNext() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        loadImage(currentIndex);
    }
}

function showPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        loadImage(currentIndex);
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay imágenes
    if (images.length === 0) {
        console.error('No hay imágenes configuradas');
        document.getElementById('photo-info').textContent = 'No hay imágenes';
        return;
    }

    // Cargar primera imagen
    loadImage(0);

    // Eventos de botones
    document.getElementById('prev-btn').addEventListener('click', showPrev);
    document.getElementById('next-btn').addEventListener('click', showNext);

    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
