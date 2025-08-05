document.addEventListener('DOMContentLoaded', function() {
    // Lista de imágenes (modifica con tus archivos)
    const images = [
        { name: "Foto 1", path: "assets/foto1.jpg" },
        { name: "Foto 2", path: "assets/foto2.jpg" }
    ];

    // Elementos del DOM
    const dom = {
        viewer: document.getElementById('viewer'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        photoInfo: document.getElementById('photo-info')
    };

    // Variables de estado
    let currentIndex = 0;
    let viewer;

    // Iniciar visor
    function initViewer() {
        if (viewer) viewer.destroy();

        viewer = new PhotoSphereViewer.Viewer({
            container: dom.viewer,
            panorama: images[currentIndex].path,
            loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
            loadingTxt: 'Cargando...',
            navbar: [
                'autorotate',  // Rotación automática
                'zoom',        // Zoom in/out
                'fullscreen'   // Pantalla completa
            ],
            onReady: () => {
                dom.photoInfo.textContent = `${currentIndex + 1}/${images.length}`;
            },
            onError: (err) => {
                console.error("Error al cargar:", err);
                dom.photoInfo.textContent = "Error en la imagen";
            }
        });
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

    // Eventos
    dom.nextBtn.addEventListener('click', showNext);
    dom.prevBtn.addEventListener('click', showPrev);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Iniciar con la primera imagen
    initViewer();
});
