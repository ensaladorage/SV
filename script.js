let player;
let musicStarted = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'jkxgmnsqaV8', // <--- CAMBIA TU ID
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'jkxgmnsqaV8',
            'start': 10 
        },
        events: {
            'onReady': (event) => { event.target.setVolume(50); }
        }
    });
}

// ESTA FUNCIÓN ES LA CLAVE: Se activa al hacer clic en el sobre
function abrirInvitacion() {
    // 1. Iniciar música
    if (player && player.playVideo) {
        player.playVideo();
        musicStarted = true;
    }

    // 2. Transición de pantallas
    document.getElementById('envelope-container').style.display = 'none';
    const mainContainer = document.getElementById('main-container');
    mainContainer.style.display = 'flex';
    mainContainer.classList.add('fade-in');
}

document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainContainer = document.getElementById('main-container');
    const confirmContainer = document.getElementById('confirmation-container');

    const moveButton = () => {
        const padding = 20;
        const maxLeft = window.innerWidth - noBtn.offsetWidth - padding;
        const maxTop = window.innerHeight - noBtn.offsetHeight - padding;
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.max(padding, Math.random() * maxLeft)}px`;
        noBtn.style.top = `${Math.max(padding, Math.random() * maxTop)}px`;
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });

    yesBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        confirmContainer.style.display = 'flex';
        confirmContainer.classList.add('fade-in');
        lanzarCorazones();
    });
});

function lanzarCorazones() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed; top: -10vh; z-index: 1; pointer-events: none;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 20}px;
            transition: transform ${Math.random() * 2 + 3}s linear;
        `;
        document.body.appendChild(heart);
        setTimeout(() => { heart.style.transform = `translateY(115vh)`; }, 100);
        setTimeout(() => { heart.remove(); }, 5000);
    }, 300);
}
