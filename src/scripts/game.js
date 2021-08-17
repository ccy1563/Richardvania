import Player from "../scripts/player.js";
import Level from "../scripts/level.js";
import Demon from "../scripts/demon.js";
import Rogue from "../scripts/rogue.js";
import Shuriken from "../scripts/shuriken";
// import Utility from "../scripts/utility.js";

export default class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.demon = new Demon();
        this.rogue = new Rogue();
        // this.shuriken = new Shuriken(100, 100, 20);

        this.fpsInterval = 0;
        this.startTime = 0;
        this.now = 0;
        this.then = 0;
        this.elapsed = 0;
        
        this.paused = 0;
        this.running = 1;
        this.gameState = this.running;
        this.gameOver = 3;
        // this.menu = 2;
        
        this.keys = [];
        this.currentLevel = 0;
        this.start(15);
        this.eventListener();

    }

    restart() {
        this.level = new Level(this.dimensions);
        this.player = new Player();
        this.demon = new Demon();
        this.gameState = this.running;
        this.start(15);
    }

    eventListener() {
        const that = this;
        window.addEventListener("keyup", function(e) {
            that.player.keyUp(e);
            that.keyUp(e);
        });
        window.addEventListener("keydown", function(e) {
            that.player.keyDown(e);
            that.keyDown(e);
        });
    }

    keyDown(e) {
        this.keys[e.code] = true;
        this.setState();
    }

    keyUp(e) {
        delete this.keys[e.code];
    }

    setState() {
        if (this.keys["KeyP"]) { // pausing game
            this.togglePause();
        }
        if (this.keys["KeyR"]) { // restart game
            this.restart();
        }
    }

    togglePause() {
        if (this.gameState === this.paused) {
            this.gameState = this.running;
            if (this.currentLevel === 0) {
                this.animateAbominationLevel();
            } else {
                this.animateRogueLevel();
            }
        } else {
            this.gameState = this.paused;
        }
    }

    pauseScreen() {
        this.ctx.rect(0, 0, this.dimensions.width, this.dimensions.height)
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fill();
        this.ctx.font = "100px Papyrus";
        // this.ctx.fillStyle = "red";
        this.ctx.fillStyle = 'black';
        this.ctx.strokeStyle = 'red';
        this.ctx.textAlign = "center";
        // this.ctx.fillText("Coward.", this.dimensions.width / 2, this.dimensions.height / 2);
        this.ctx.fillText('Coward.', this.dimensions.width / 2, this.dimensions.height / 2);
        this.ctx.strokeText('Coward.', this.dimensions.width / 2, this.dimensions.height / 2);
    }

    gameOverScreen() {
        this.ctx.rect(0, 0, this.dimensions.width, this.dimensions.height)
        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fill();
        this.ctx.font = "100px Papyrus";
        // this.ctx.fillStyle = "red";
        this.ctx.fillStyle = 'black';
        this.ctx.strokeStyle = 'red';
        this.ctx.textAlign = "center";
        this.ctx.fillText('Damned.', this.dimensions.width / 2, this.dimensions.height / 2);
        this.ctx.strokeText('Damned.', this.dimensions.width / 2, this.dimensions.height / 2);

        this.ctx.font = "15px Papyrus";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        // this.ctx.fillText('lol, press R to restart, scrub.', this.dimensions.width / 2, (this.dimensions.height / 2) + 50);
        this.ctx.fillText("Press R to redeem yourself.", this.dimensions.width / 2, (this.dimensions.height / 2) + 50);
    }
    
    animateAbominationLevel() {
        // checking to see if the game is paused
        if (this.gameState === this.paused) {
            this.pauseScreen();
            return;
        }

        // checking to see if the game is over
        if (this.gameState === this.gameOver) {
            this.gameOverScreen();
            return;
        }

        requestAnimationFrame(this.animateAbominationLevel.bind(this));

        this.now = Date.now();
        this.elapsed = this.now - this.then;
        
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.level.animate(this.ctx, this.canvas);
            this.player.animate(this.ctx);
            if (this.demon.alive) {
                this.demon.animate(this.ctx, this.player.coordinates());
            }
            this.registerAttacks1();

            if (this.rogue.alive) {
                this.rogue.animate(this.ctx, this.player.coordinates());
            }
            this.registerAttacks2();
        }
    }

    start(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;

        if (this.currentLevel === 0) {
            this.animateAbominationLevel();
        } else {
            this.animateRogueLevel();
        }
    }

    // x1, x2 uh i dont remember what these values are for, just trial and error
    collision(player, enemy, x1, x2) {
        if (player.x + x1 > enemy.x + enemy.width ||
            player.x + player.width - x2 < enemy.x ||
            player.y > enemy.y + enemy.height ||
            player.y + player.height < enemy.y) {
            return false;
        } else {
            return true;
        }
    }

    // registering attacks between player and demon
    registerAttacks1() {
        if (this.collision(this.player, this.demon, 30, 60)) {
            // player attacking demon
            if ((this.player.attacking && this.player.direction === "right" && this.demon.x + 30 > this.player.x) || (this.player.attacking && this.player.direction === "left" && this.demon.x < this.player.x)) {
                this.demon.beingAttacked(5);
            }
            if ((this.demon.attacking && this.demon.direction === "right" && this.player.x > this.demon.x) || (this.demon.attacking && this.demon.direction === "left" && this.player.x - 30 < this.demon.x)) {
                // lmao being on the right side hurts player even with demon attacking wut
                // yolo bug fix
                if (this.demon.alive && !this.demon.dying) {
                    this.player.beingAttacked(5);
                    if (this.player.dying) {
                        setTimeout(() => {
                            this.gameState = this.gameOver;
                        }, 3000);
                    }
                }
            }
        }
    }

    animateRogueLevel() {
        requestAnimationFrame(this.animateRogueLevel.bind(this));

        this.now = Date.now();
        this.elapsed = this.now - this.then;

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.level.animate(this.ctx, this.canvas);
            this.player.animate(this.ctx);

            if (this.rogue.alive) {
                this.rogue.animate(this.ctx, this.player.coordinates());
            }
            this.registerAttacks2();
        }
    }

    registerAttacks2() {
        if (this.collision(this.player, this.rogue, 0, 0)) {
            // player attacking demon
            if ((this.player.attacking && this.player.direction === "right" && this.rogue.x + 30 > this.player.x) || (this.player.attacking && this.player.direction === "left" && this.rogue.x < this.player.x)) {
                this.rogue.beingAttacked(5);
            }
            if ((this.rogue.attacking && this.rogue.direction === "right" && this.player.x > this.rogue.x) || (this.rogue.attacking && this.rogue.direction === "left" && this.player.x - 30 < this.rogue.x)) {
                // lmao being on the right side hurts player even with rogue attacking wut
                // yolo bug fix
                if (this.rogue.alive && !this.rogue.dying) {
                    // this.player.beingAttacked(5);
                    if (this.player.dying) {
                        setTimeout(() => {
                            this.gameState = this.gameOver;
                        }, 3000);
                    }
                }
            }
        }
    }
}