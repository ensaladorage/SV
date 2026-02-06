let player;
let musicStarted = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'jkxgmnsqaV8', 
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

function abrirInvitacion() {
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
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    const moveButton = () => {
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Calculamos límites restando el tamaño del botón para que no se salga
        const maxLeft = window.innerWidth - btnWidth - 20;
        const maxTop = window.innerHeight - btnHeight - 20;

        const randomLeft = Math.floor(Math.random() * maxLeft);
        const randomTop = Math.floor(Math.random() * maxTop);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomLeft}px`;
        noBtn.style.top = `${randomTop}px`;
        // Forzamos que esté por encima de todo
        noBtn.style.zIndex = "9999";
    };

    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });

    yesBtn.addEventListener('click', () => {
        document.getElementById('main-container').style.display = 'none';
        const confirmContainer = document.getElementById('confirmation-container');
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
