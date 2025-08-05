document.addEventListener('DOMContentLoaded', function() {
    // Lista de tus imágenes 360° en la carpeta assets
    const images = [
        'assets/foto1.jpg',
        'assets/foto2.jpg',
        'assets/foto3.jpg',
        'assets/foto4.jpg'
        // Añade más imágenes según necesites
     ].filter(img => {
        // Verificación automática de relación 2:1
        return new Promise(resolve => {
            const tester = new Image();
            tester.src = img;
            tester.onload = () => {
                const isValid = Math.abs(tester.width / tester.height - 2) < 0.1;
                if (!isValid) console.error(`Imagen ${img} no es 2:1 (${tester.width}x${tester.height})`);
                resolve(isValid);
            };
            tester.onerror = () => resolve(false);
        });
    });

    let currentIndex = 0;
    let viewer;

    // Elementos UI
    const ui = {
        viewer: document.getElementById('viewer'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        counter: document.getElementById('photo-counter'),
        thumbnails: document.getElementById('thumbnails'),
        errorBox: document.getElementById('error-box')
    };
    // Inicialización
    initViewer();
    // Eventos
    ui.prevBtn.addEventListener('click', showPrevious);
    ui.nextBtn.addEventListener('click', showNext);
    document.addEventListener('keydown', handleKeys);
    // Funciones principales
    async function initViewer() {
        if (images.length === 0) {
            showError('No hay imágenes válidas (requieren relación 2:1)');
            return;
        }
        loadCurrentImage();
        createThumbnails();
    }
    function loadCurrentImage() {
        if (viewer) viewer.destroy();
        viewer = new PhotoSphereViewer.Viewer({
            container: ui.viewer,
            panorama: images[currentIndex],
            loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
            loadingTxt: 'Cargando...',
            navbar: getNavbar(),
            touchmoveTwoFingers: true,
            mousewheel: false
        });

        updateCounter();
    }
    function getNavbar() {
        return [
            'autorotate',
            'zoom',
            'download',
            'fullscreen',
            {
                title: 'VR Mode',
                content: '👓 VR',
                onClick: () => viewer.toggleVR()
            }
        ];
    }
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        loadCurrentImage();
    }
    function showPrevious() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        loadCurrentImage();
    }
    function handleKeys(e) {
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
    }
    function updateCounter() {
        ui.counter.textContent = `${currentIndex + 1}/${images.length}`;
    }
    function createThumbnails() {
        ui.thumbnails.innerHTML = '';
        images.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = `thumbnail ${index === currentIndex ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${img}" alt="Miniatura ${index + 1}">`;
            thumb.addEventListener('click', () => {
                currentIndex = index;
                loadCurrentImage();
            });
            ui.thumbnails.appendChild(thumb);
        });
    }

    function showError(message) {
        ui.errorBox.textContent = message;
        ui.errorBox.style.display = 'block';
    }
});
