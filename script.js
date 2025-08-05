// Configuración - CAMBIA ESTO CON TUS IMÁGENES
const images = [
    'assets/foto1.jpg',
    'assets/foto2.jpg'
];

// Variables globales
let currentIndex = 0;
let viewer;

// Función para inicializar el visor
function initViewer() {
    if (viewer) {
        viewer.destroy();
    }

    viewer = new PhotoSphereViewer.Viewer({
        container: document.getElementById('viewer'),
        panorama: images[currentIndex],
        loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
        loadingTxt: 'Cargando imagen 360°...',
        navbar: [
            'autorotate', // Rotación automática
            'zoom',       // Control de zoom
            'fullscreen'  // Pantalla completa
        ],
        size: {
            width: '100%',
            height: '100%'
        },
        onReady: () => {
            updateUI();
            console.log('Imagen cargada correctamente:', images[currentIndex]);
        },
        onError: (err) => {
            console.error('Error al cargar la imagen:', err);
            document.getElementById('photo-info').textContent = 'Error al cargar imagen';
        }
    });
}

// Actualizar la interfaz
function updateUI() {
    document.getElementById('photo-info').textContent = `${currentIndex + 1}/${images.length}`;
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === images.length - 1;
}

// Navegación entre imágenes
function showNext() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        initViewer();
    }
}

function showPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        initViewer();
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay imágenes
    if (images.length === 0) {
        console.error('No hay imágenes configuradas');
        document.getElementById('photo-info').textContent = 'No hay imágenes';
        return;
    }

    // Iniciar el visor con la primera imagen
    initViewer();

    // Configurar eventos de los botones
    document.getElementById('prev-btn').addEventListener('click', showPrev);
    document.getElementById('next-btn').addEventListener('click', showNext);

    // Configurar eventos del teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
