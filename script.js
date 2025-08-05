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
            loadingImg: 'https://i.imgur.com/WWX2T1m.gif',
            loadingTxt: 'Cargando imagen 360°...',
            defaultLat: 0,
            defaultLong: 0,
            navbar: [
                'autorotate',
                'zoom',
                'download',
                'fullscreen',
                {
                    title: 'Ver en VR',
                    content: '👓 VR',
                    onClick: () => viewer.toggleVR()
                }
            ],
            plugins: [
                [PhotoSphereViewer.SettingsPlugin, {
                    lang: {
                        autorotate: 'Rotación automática',
                        zoom: 'Zoom',
                        download: 'Descargar',
                        fullscreen: 'Pantalla completa'
                    }
                }]
            ]
        });
    }
});
