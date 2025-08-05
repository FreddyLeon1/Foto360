// Configuración de imágenes - ¡VERIFICA ESTAS RUTAS!
const images = [
    { name: "Foto 1", path: "assets/foto1.jpg" },
    { name: "Foto 2", path: "assets/foto2.jpg" }
];

let currentIndex = 0;
let viewer;

function initViewer() {
    if (viewer) {
        viewer.destroy();
    }

    viewer = new PhotoSphereViewer.Viewer({
        container: document.getElementById('viewer'),
        panorama: images[currentIndex].path,
        loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
        loadingTxt: 'Cargando imagen 360°...',
        navbar: [
            'autorotate',
            'zoom',
            'fullscreen'
        ],
        onReady: () => {
            updateUI();
            console.log('Imagen cargada:', images[currentIndex].path);
        },
        onError: (err) => {
            console.error('Error:', err);
            document.getElementById('photo-info').textContent = 'Error al cargar imagen';
        }
    });
}

function updateUI() {
    const infoElement = document.getElementById('photo-info');
    infoElement.textContent = `${images[currentIndex].name} (${currentIndex + 1}/${images.length})`;
    
    document.getElementById('prev-btn').disabled = currentIndex === 0;
    document.getElementById('next-btn').disabled = currentIndex === images.length - 1;
}

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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay imágenes
    if (images.length === 0) {
        document.getElementById('photo-info').textContent = 'No hay imágenes';
        return;
    }

    // Configurar eventos
    document.getElementById('prev-btn').addEventListener('click', showPrev);
    document.getElementById('next-btn').addEventListener('click', showNext);
    
    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Iniciar con la primera imagen
    initViewer();
});
