let player;
let score = 0;
let heartInterval; 
let currentLevel = 0; // Usaremos niveles en lugar de booleanos

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
        
        heartInterval = setInterval(crearCorazon, 400); 
    });
});

function crearCorazon() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed; top: -10vh; left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 40 + 30}px; 
        transition: top 4s linear, transform 0.2s; 
        z-index: 1000; cursor: crosshair; user-select: none;
    `;
    
    heart.onclick = function() {
        const audio = document.getElementById('pop-sound');
        if (audio) { audio.currentTime = 0; audio.play(); }
        
        score++;
        document.getElementById('score').innerText = score;

        // --- LÓGICA DE NIVELES MEJORADA ---

        // Nivel 1: 20 corazones
        if (score === 20) {
            clearInterval(heartInterval);
            heartInterval = setInterval(crearCorazon, 150); // Lluvia rápida
            document.getElementById('confirmed-gif').src = 'love.gif';
            console.log("Nivel 1: Love!");
        } 
        // Nivel 2: 30 corazones
        else if (score === 30) {
            document.getElementById('confirmed-gif').src = 'pingu.gif';
            console.log("Nivel 2: Pingu!");
        } 
        // Nivel 3: 40 corazones
        else if (score === 40) {
            document.getElementById('confirmed-gif').src = 'cat.gif';
            console.log("Nivel 3: Cat!");
        } 
        // Nivel 4: 50 corazones
        else if (score === 50) {
            clearInterval(heartInterval);
            heartInterval = setInterval(crearCorazon, 80); // ¡Modo Locura!
            document.getElementById('confirmed-gif').src = 'duck.gif';
            console.log("Nivel 4: Duck madness!");
        }
        
        heart.style.transform = "scale(1.5)";
        heart.style.opacity = "0";
        setTimeout(() => heart.remove(), 200);
    };

    document.body.appendChild(heart);
    setTimeout(() => { heart.style.top = '110vh'; }, 100);
    setTimeout(() => { if(heart.parentNode) heart.remove(); }, 4100);
}
