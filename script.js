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

    console.log("Portfolio cargado correctamente. Listo para añadir imágenes cuando dispongas de ellas.");
});