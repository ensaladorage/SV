let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: 'jkxgmnsqaV8',
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': 'jkxgmnsqaV8', 'start': 10 },
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
    document.getElementById('yes-btn').addEventListener('click', () => {
        document.getElementById('main-container').style.display = 'none';
        const conf = document.getElementById('confirmation-container');
        conf.style.display = 'flex'; conf.classList.add('fade-in');
        setInterval(crearCorazon, 300);
    });
});
function crearCorazon() {
    const h = document.createElement('div'); h.innerHTML = '❤️';
    h.style.cssText = `position:fixed; top:-10vh; left:${Math.random()*100}vw; font-size:${Math.random()*20+20}px; transition:4s linear; z-index:1;`;
    document.body.appendChild(h);
    setTimeout(() => h.style.transform = 'translateY(110vh)', 100);
    setTimeout(() => h.remove(), 4500);
}
