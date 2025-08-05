document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const imageList = [
        {
            name: "Ejemplo 1",
            path: "assets/foto1.jpg",
        },
        {
            name: "Ejemplo 2", 
            path: "assets/foto2.jpg",
        }
        // Añade más imágenes aquí
    ];

    // Elementos del DOM
    const dom = {
        viewer: document.getElementById('viewer'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        photoInfo: document.getElementById('photo-info'),
        thumbnails: document.getElementById('thumbnails')
    };

    // Variables de estado
    let currentIndex = 0;
    let viewer = null;
    let isLoading = false;

    // Inicialización
    initViewer();
    createThumbnails();

    // Event listeners
    dom.prevBtn.addEventListener('click', showPrevious);
    dom.nextBtn.addEventListener('click', showNext);
    document.addEventListener('keydown', handleKeyDown);

    // Funciones principales
    function initViewer() {
        if (viewer) {
            viewer.destroy();
        }

        isLoading = true;
        updateUI();

        viewer = new PhotoSphereViewer.Viewer({
            container: dom.viewer,
            panorama: imageList[currentIndex].path,
            loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
            loadingTxt: 'Cargando experiencia 360°...',
            navbar: getNavbarItems(),
            defaultYaw: '0deg',
            autorotateDelay: 3000,
            moveSpeed: 1.5,
            mousewheel: false,
            touchmoveTwoFingers: true,
            onReady: () => {
                isLoading = false;
                updateUI();
            },
            onError: (err) => {
                console.error('Error al cargar imagen:', err);
                isLoading = false;
                updateUI();
                dom.photoInfo.textContent = 'Error al cargar imagen';
            }
        });
    }

    function getNavbarItems() {
        return [
            'autorotate',
            'zoom',
            'move',
            'download',
            'fullscreen',
            {
                title: 'Modo VR',
                content: '👓',
                onClick: () => viewer.toggleVR()
            }
        ];
    }

    function showNext() {
        if (isLoading) return;
        
        currentIndex = (currentIndex + 1) % imageList.length;
        initViewer();
        highlightThumbnail();
    }

    function showPrevious() {
        if (isLoading) return;
        
        currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
        initViewer();
        highlightThumbnail();
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrevious();
    }

    function createThumbnails() {
        dom.thumbnails.innerHTML = '';
        
        imageList.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            thumb.innerHTML = `
                <img src="${image.thumbnail || image.path}" alt="${image.name}">
                <div class="loading" style="display: none;">Cargando...</div>
            `;
            
            thumb.addEventListener('click', () => {
                if (isLoading || index === currentIndex) return;
                currentIndex = index;
                initViewer();
                highlightThumbnail();
            });
            
            dom.thumbnails.appendChild(thumb);
        });
        
        highlightThumbnail();
    }

    function highlightThumbnail() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    function updateUI() {
        dom.prevBtn.disabled = isLoading;
        dom.nextBtn.disabled = isLoading;
        
        if (isLoading) {
            dom.photoInfo.textContent = 'Cargando...';
        } else {
            dom.photoInfo.textContent = `${imageList[currentIndex].name} (${currentIndex + 1}/${imageList.length})`;
        }
        
        // Mostrar/ocultar indicadores de carga en miniaturas
        document.querySelectorAll('.thumbnail .loading').forEach((loader, index) => {
            loader.style.display = (isLoading && index === currentIndex) ? 'flex' : 'none';
        });
    }
});
