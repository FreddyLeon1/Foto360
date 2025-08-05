// Lista de imágenes (¡CAMBIAR ESTAS RUTAS POR TUS ARCHIVOS!)
const images = [
    'assets/foto1.jpg',
    'assets/foto2.jpg'
];

// Variables globales
let currentIndex = 0;
let viewer;

// Inicializar el visor
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
            'autorotate',
            'zoom',
            'fullscreen'
        ],
        onReady: updateUI,
        onError: handleError
    });
}

// Actualizar la interfaz
function updateUI() {
    document.getElementById('photo-info').textContent = 
        `${currentIndex + 1}/${images.length}`;
    
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === images.length - 1;
}

// Manejar errores
function handleError(err) {
    console.error('Error:', err);
    alert('Error al cargar la imagen. Verifica la consola (F12)');
}

// Navegación
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

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar visor
    initViewer();
    
    // Botones
    document.getElementById('prev-btn').addEventListener('click', showPrev);
    document.getElementById('next-btn').addEventListener('click', showNext);
    
    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
