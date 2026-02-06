let player;
let musicStarted = false;

// 1. API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'ID_DE_TU_VIDEO', // Sustituye por el ID de tu video
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'ID_DE_TU_VIDEO'
        },
        events: {
            'onReady': (event) => {
                // El video está listo pero el navegador suele bloquearlo hasta interacción
            }
        }
    });
}

const iniciarMusica = () => {
    if (!musicStarted && player && player.playVideo) {
        player.playVideo();
        musicStarted = true;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainContainer = document.getElementById('main-container');
    const confirmContainer = document.getElementById('confirmation-container');

    // Función para mover el botón NO
    const moveButton = () => {
        iniciarMusica(); // Iniciamos música al intentar dar al NO
        const padding = 20;
        const maxLeft = window.innerWidth - noBtn.offsetWidth - padding;
        const maxTop = window.innerHeight - noBtn.offsetHeight - padding;
        const randomLeft = Math.max(padding, Math.random() * maxLeft);
        const randomTop = Math.max(padding, Math.random() * maxTop);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomLeft}px`;
        noBtn.style.top = `${randomTop}px`;
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });

    // Lógica del botón SI
    yesBtn.addEventListener('click', () => {
        iniciarMusica(); // Aseguramos música al dar al SI
        
        // Efecto visual: Ocultamos uno y mostramos otro
        mainContainer.style.display = 'none';
        confirmContainer.style.display = 'flex';
        
        // Lanzamos la función de lluvia de corazones si quieres incluirla aquí
        lanzarCorazones();
    });
});

// Función opcional para los corazones (puedes reutilizar la que te di antes)
function lanzarCorazones() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-5vh";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        heart.style.transition = "transform 4s linear";
        heart.style.zIndex = "1000";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translateY(110vh)`;
        }, 100);

        setTimeout(() => { heart.remove(); }, 4100);
    }, 300);
}
