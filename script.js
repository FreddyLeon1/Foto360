document.addEventListener('DOMContentLoaded', function() {
    // Lista de tus imágenes 360° en la carpeta assets
    const images = [
        'assets/foto1.jpg',
        'assets/foto2.jpg',
        'assets/foto3.jpg',
        'assets/foto4.jpg'
        // Añade más imágenes según necesites
    ];
    let currentIndex = 0;
    let viewer;
    const viewerContainer = document.getElementById('viewer');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const photoCounter = document.getElementById('photo-counter');
    const thumbnailsContainer = document.getElementById('thumbnails');
    // Cargar el visualizador con la primera imagen
    loadViewer(images[currentIndex]);
    updateCounter();
    createThumbnails();
    // Navegación
    prevBtn.addEventListener('click', showPreviousPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
    // Teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') showPreviousPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
    });
    function loadViewer(imageUrl) {
        if (viewer) {
            viewer.destroy();
        }
        viewer = new PhotoSphereViewer.Viewer({
            container: viewerContainer,
            panorama: imageUrl,
            loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
            loadingTxt: 'Cargando imagen...',
            navbar: [
                'autorotate',
                'zoom',
                'fullscreen',
                {
                    title: 'VR',
                    content: '👓',
                    onClick: () => viewer.toggleVR()
                }
            ],
            autorotateDelay: 3000,
            defaultYaw: '0deg'
        });
    }
    function showNextPhoto() {
        currentIndex = (currentIndex + 1) % images.length;
        loadViewer(images[currentIndex]);
        updateCounter();
        updateActiveThumbnail();
    }
    function showPreviousPhoto() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        loadViewer(images[currentIndex]);
        updateCounter();
        updateActiveThumbnail();
    }
    function updateCounter() {
        photoCounter.textContent = `${currentIndex + 1}/${images.length}`;
    }
    function createThumbnails() {
        thumbnailsContainer.innerHTML = '';
        images.forEach((img, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img;
            thumbnail.className = 'thumbnail' + (index === currentIndex ? ' active' : '');
            thumbnail.alt = `Miniatura ${index + 1}`;
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                loadViewer(images[currentIndex]);
                updateCounter();
                updateActiveThumbnail();
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    function updateActiveThumbnail() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }
});
