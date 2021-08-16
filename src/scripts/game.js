import Player from "../scripts/player.js";
import Level from "../scripts/level.js";
import Demon from "../scripts/demon.js";
// import Utility from "../scripts/utility.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.demon = new Demon();
        this.fpsInterval = 0;
        this.then = 0;
        this.startTime = 0;
        this.now = 0;
        this.then = 0;
        this.elapsed = 0;
        this.startAnimation(15);
        this.eventListener();

        this.timeID = 0;

        this.numOfAttacks = [0];
    }

    restart() {
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.startAnimation(10);
    }

    eventListener() {
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
            if (this.demon.alive) {
                console.log(this.demon.alive)
                this.demon.animate(this.ctx, this.player.coordinates());
            }
            this.registerAttacks();
        }
    }

    startAnimation(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.animate();
    }

    collision(player, demon, x1, x2) {
        if (player.x + x1 > demon.x + demon.width ||
            player.x + player.width - x2 < demon.x ||
            player.y > demon.y + demon.height ||
            player.y + player.height < demon.y) {
            return false;
        } else {
            return true;
        }
    }

    registerAttacks() {
        if (this.collision(this.player, this.demon, 30, 60)) {
            // demon spamming attack all the time, wtf how to make it stop
            if (this.numOfAttacks.length > 0) { // bro how is this even working lmao
                this.numOfAttacks.shift();
                this.demon.attack();
            } else {
                const that = this;
                setTimeout(function() {
                    that.numOfAttacks.push(0);
                }, 4000);
            }
            // player attacking demon
            if ((this.player.attacking && this.player.direction === "right" && this.demon.x > this.player.x) || (this.player.attacking && this.player.direction === "left" && this.demon.x < this.player.x)) {
                this.demon.beingAttacked(5);
                if (this.demon.healthPoints < 0) {
                    this.demon.dead();
                }
            }
        }
    }
}