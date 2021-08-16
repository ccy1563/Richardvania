import Game from './scripts/game.js';
import "./styles/index.css"

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas1');
    canvas.width = 800;
    canvas.height = 500;
    new Game(canvas);
})