let player;
let score = 0;
let heartInterval; // Variable para controlar la velocidad de los corazones
let tripleModeActive = false;
let gifChanged = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: 'jkxgmnsqaV8',
        playerVars: { 'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': 'jkxgmnsqaV8', 'start': 10 },
        events: { 'onReady': (e) => e.target.setVolume(40) }
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
        
        document.getElementById('score-container').style.display = 'block';
        
        // Guardamos el intervalo en la variable para poder cambiarlo luego
        heartInterval = setInterval(crearCorazon, 400); 
    });
});

function crearCorazon() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed; top: -10vh; left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 30 + 20}px; 
        transition: top 4s linear, transform 0.2s; 
        z-index: 1000; cursor: crosshair; user-select: none;
    `;
    
    heart.onclick = function() {
        const audio = document.getElementById('pop-sound');
        if (audio) { audio.currentTime = 0; audio.play(); }
        
        score++;
        document.getElementById('score').innerText = score;

        // --- NUEVA LÓGICA DE NIVELES ---

        // NIVEL 1: Superar los 20 corazones (Modo Triple)
        if (score > 20 && !tripleModeActive) {
            tripleModeActive = true;
            clearInterval(heartInterval); // Detenemos el ritmo normal
            heartInterval = setInterval(crearCorazon, 130); // ¡Ritmo triple! (400 / 3 aprox)
            console.log("¡MODO TRIPLE ACTIVADO!");
        }

        // NIVEL 2: Superar los 100 corazones (Cambio de GIF)
        if (score > 100 && !gifChanged) {
            gifChanged = true;
            // Cambiamos la imagen del perro por la nueva
            document.getElementById('confirmed-gif').src = 'perro_final.gif';
            console.log("¡GIF FINAL DESBLOQUEADO!");
        }

        // -------------------------------
        
        heart.style.transform = "scale(1.5)";
        heart.style.opacity = "0";
        setTimeout(() => heart.remove(), 200);
    };

    document.body.appendChild(heart);
    setTimeout(() => { heart.style.top = '110vh'; }, 100);
    setTimeout(() => { if(heart.parentNode) heart.remove(); }, 4100);
}
