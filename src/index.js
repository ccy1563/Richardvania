import Game from './scripts/game.js';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    canvas.width = 800;
    canvas.height = 500;
    new Game(canvas);
})