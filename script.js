let player;
let musicStarted = false;
let score = 0; // Variable para contar puntos

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: 'jkxgmnsqaV8',
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': 'jkxgmnsqaV8', 'start': 10 },
        events: { 'onReady': (e) => e.target.setVolume(50) }
    });
}

function abrirInvitacion() {
    if (player && player.playVideo) player.playVideo();
    document.getElementById('envelope-container').style.display = 'none';
    const main = document.getElementById('main-container');
    main.style.display = 'flex'; main.classList.add('fade-in');
}

document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const moveButton = () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
        noBtn.style.position = 'fixed'; noBtn.style.left = `${x}px`; noBtn.style.top = `${y}px`;
    };
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });

    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-container').style.display = 'none';
        const conf = document.getElementById('confirmation-container');
        conf.style.display = 'flex'; conf.classList.add('fade-in');
        
        // Mostrar el contador
        document.getElementById('score-container').style.display = 'block';
        
        // Iniciar minijuego
        setInterval(crearCorazon, 400); // Un poco más rápido para jugar
    });
});

function crearCorazon() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    // IMPORTANTE: pointer-events: auto permite hacer clic
    heart.style.cssText = `
        position: fixed; top: -10vh; left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 30 + 20}px; 
        transition: top 4s linear, transform 0.2s; 
        z-index: 1000; cursor: crosshair; user-select: none;
    `;
    
    // Función al hacer clic en el corazón
    heart.onclick = function() {
        // Sonido
        const audio = document.getElementById('pop-sound');
        if (audio) {
            audio.currentTime = 0; // Reinicia el sonido si pulsas muy rápido
            audio.play();
        }
        
        // Sumar puntos
        score++;
        document.getElementById('score').innerText = score;
        
        // Efecto visual de explosión
        heart.style.transform = "scale(1.5)";
        heart.style.opacity = "0";
        
        // Eliminar del DOM un pelín después
        setTimeout(() => heart.remove(), 200);
    };

    document.body.appendChild(heart);

    // Animación de caída
    setTimeout(() => { heart.style.top = '110vh'; }, 100);
    setTimeout(() => { if(heart.parentNode) heart.remove(); }, 4100);
}
