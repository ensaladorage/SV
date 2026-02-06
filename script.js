let player;
let musicStarted = false;

// 1. Configuración de la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'jkxgmnsqaV8', 
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'jkxgmnsqaV8',
            'start': 10  // <--- AÑADE ESTA LÍNEA (el número son los segundos)
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // El reproductor está cargado
    event.target.setVolume(50);
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

    // Lógica para que el botón NO escape
    const moveButton = () => {
        iniciarMusica(); // La música empieza al intentar darle al NO
        
        const padding = 20;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const maxLeft = window.innerWidth - btnWidth - padding;
        const maxTop = window.innerHeight - btnHeight - padding;

        const randomLeft = Math.max(padding, Math.random() * maxLeft);
        const randomTop = Math.max(padding, Math.random() * maxTop);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomLeft}px`;
        noBtn.style.top = `${randomTop}px`;
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Lógica para el botón SÍ
    yesBtn.addEventListener('click', () => {
        iniciarMusica(); // La música empieza (si no lo hizo ya)
        
        // Cambiar de pantalla sin recargar
        mainContainer.style.display = 'none';
        confirmContainer.style.display = 'flex';
        
        lanzarCorazones();
    });
});

// Función para la lluvia de corazones
function lanzarCorazones() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        heart.style.duration = Math.random() * 2 + 3 + "s";
        
        // Animación simple de caída
        const animationDuration = Math.random() * 2 + 3;
        heart.style.transition = `transform ${animationDuration}s linear`;
        
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translateY(115vh)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000 + 100);
    }, 300);
}
