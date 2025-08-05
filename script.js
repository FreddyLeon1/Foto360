document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('viewer');
    const imageUpload = document.getElementById('image-upload');
    
    let viewer;
    
    // Cargar imagen por defecto (reemplaza con tu imagen)
    initViewer('assets/ejemplo360.jpg');
    
    // Cargar imagen desde archivo
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Destruir el viewer anterior si existe
                if (viewer) {
                    viewer.destroy();
                }
                initViewer(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    function initViewer(imageSrc) {
        viewer = new PhotoSphereViewer.Viewer({
            container: container,
            panorama: imageSrc,
            caption: 'Imagen 360°',
            loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
            defaultLat: 0,
            defaultLong: 0,
            defaultZoomLvl: 50,
            navbar: [
                'zoom',
                'move',
                'download',
                'fullscreen',
                'caption',
                {
                    title: 'Ver en VR',
                    content: '👓',
                    onClick: () => viewer.toggleVR()
                }
            ],
            plugins: [
                [PhotoSphereViewer.SettingsPlugin, {
                    lang: {
                        zoom: 'Zoom',
                        move: 'Mover',
                        download: 'Descargar',
                        fullscreen: 'Pantalla completa',
                        settings: 'Ajustes',
                        vr: 'Realidad virtual'
                    }
                }]
            ]
        });
    }
});