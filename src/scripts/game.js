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

    collision(player, demon) {
        if (player.x > demon.x + demon.width ||
            player.x + player.width < demon.x ||
            player.y > demon.y + demon.height ||
            player.y + player.height < demon.y) {
            // no collision
            console.log("no collision");
            return false;
        } else {
            console.log("collision");
            // enemy character should attack player character 
            // make sure to (throttle?) so that it isnt spamming the shit out of attack
            // maybe setInverval? fk me idk
            return true;
        }
    }

    registerAttacks() {
        if (this.collision(this.player, this.demon)) {
            // demon attacking player all the time, wtf how to make it stop
            
            this.demon.attack();
            // player attacking demon
            if ((this.player.attacking && this.player.direction === "right" && this.demon.x > this.player.x) || (this.player.attacking && this.player.direction === "left" && this.demon.x < this.player.x)) {
                this.demon.healthBar.takeDamage(75);
                this.demon.beingAttacked();
                if (this.demon.healthPoints < 0) {
                    console.log("dead");
                    this.demon.dead();
                }
            }
        }
    }
}