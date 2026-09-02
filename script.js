document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave mejorado para los enlaces de navegación
    document.querySelectorAll('.navbar a, .hero a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const videoGrid = document.getElementById('videoGrid');

    const videoFiles = [
        'video nuevo 1 .mp4',
        'video nuevo 2.mp4',
        'video 2-1.mp4'
    ];

    const createVideoItem = (fileName) => {
        const item = document.createElement('div');
        item.className = 'video-item';
        item.innerHTML = `
            <video controls>
                <source src="images/${encodeURI(fileName)}" type="video/mp4">
                Tu navegador no soporta la reproducción de video.
            </video>
        `;
        return item;
    };

    if (videoGrid) {
        const tasks = videoFiles.map(async (fileName) => {
            try {
                const response = await fetch(`images/${encodeURI(fileName)}`, { method: 'HEAD' });
                return response.ok ? fileName : null;
            } catch (error) {
                return null;
            }
        });

        Promise.all(tasks).then((results) => {
            results.filter(Boolean).forEach((fileName) => {
                videoGrid.appendChild(createVideoItem(fileName));
            });

            if (!videoGrid.children.length) {
                const emptyState = document.createElement('p');
                emptyState.textContent = 'No hay vídeos disponibles.';
                emptyState.style.color = '#666';
                emptyState.style.padding = '10px 0';
                videoGrid.appendChild(emptyState);
            }
        });
    }

    const removeBrokenMedia = (element) => {
        const parent = element?.closest('.video-item');
        if (parent && parent.parentNode) {
            parent.parentNode.removeChild(parent);
        } else if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };

    document.querySelectorAll('.albedria-assets img, .albedria-logo').forEach(img => {
        img.addEventListener('error', () => removeBrokenMedia(img));
    });

    console.log("Portfolio cargado correctamente.");
});