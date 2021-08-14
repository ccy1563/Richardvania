import Player from "../scripts/player.js";
import Level from "../scripts/level.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.fpsInterval = 0;
        this.then = 0;
        this.startTime = 0;
        this.now = 0;
        this.then = 0;
        this.elapsed = 0;
        this.startAnimation(15);
        this.listener();
    }

    restart() {
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.startAnimation(10);
    }

    listener() {
        const that = this;
        window.addEventListener("keyup", function(e) {
            that.player.keyUp(e);
        });
        window.addEventListener("keydown", function(e) {
            that.player.keyDown(e);
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.level.animate(this.ctx, this.canvas);
            this.player.animate(this.ctx);
        }
    }

    startAnimation(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.animate();
    }
}