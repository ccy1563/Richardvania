import Game from './scripts/game.js';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    canvas.width = 800;
    canvas.height = 500;

    // canvas.style.marginTop = window.innerHeight / 2 - canvas.height / 2 + "px";

    new Game(canvas);
})