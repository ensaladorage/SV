let player;
let musicStarted = false;

// Configuración de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'jkxgmnsqaV8',
        playerVars: {
            'autoplay': 0,     // <--- CAMBIO IMPORTANTE: 0 para que no arranque solo
            'controls': 0,     // Ocultamos controles por si acaso
            'loop': 1,
            'playlist': 'jkxgmnsqaV8',
            'start': 10
        },
        events: {
            'onReady': (event) => {
                event.target.setVolume(40);
            }
        }
    });
}

// Función para abrir el sobre e iniciar todo
function abrirInvitacion() {
    // Aquí es donde forzamos el Play
    if (player && player.playVideo) {
        player.playVideo();
        musicStarted = true;
    }
    
    document.getElementById('envelope-container').style.display = 'none';
    const mainContainer = document.getElementById('main-container');
    mainContainer.style.display = 'flex';
    mainContainer.classList.add('fade-in');
}

document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // Mover botón No
    const moveButton = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
        
        // Solo cambiamos a fixed cuando se intenta tocar
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton();
    });

    // Acción al pulsar Si
    yesBtn.addEventListener('click', () => {
        document.getElementById('main-container').style.display = 'none';
        const confirmContainer = document.getElementById('confirmation-container');
        confirmContainer.style.display = 'flex';
        confirmContainer.classList.add('fade-in');
        
        // Iniciar lluvia de corazones
        setInterval(crearCorazon, 300);
    });
});

function crearCorazon() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        top: -10vh;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 20 + 20}px;
        transition: 4s linear;
        z-index: 1000;
        pointer-events: none;
    `;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = 'translateY(110vh)';
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 4500);
}
