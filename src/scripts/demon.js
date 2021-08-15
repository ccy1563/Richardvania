import playerRight from "../assets/AbominationRight.jpg"
import playerLeft from "../assets/AbominationLeft.jpg"
import HealthBar from "../scripts/bar.js"

export default class Demon {
    constructor() {
        this.x = 375;
        this.y = 185;
        this.width = 180;
        this.height = 180,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3;
        this.attacking = false;
        this.moving = true;

        this.alive = true;
        this.healthPoints = 100;
        this.healthBar = new HealthBar(20, 480, 750, 10, 100, "red");

        this.direction = "left";

        this.playerSprite= new Image();
        this.playerSprite.src = playerLeft;

        this.movementFramesL = [[0, 3], [1, 3], [2, 3], [3, 3]];
        this.movementFramesR = [[5, 3], [4, 3], [3, 3], [2, 3]];
        this.movementIdx = 0;

        this.attackFramesL = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]];
        this.attackFramesR = [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]];
        this.attackIdx = 0;
        this.canAttack = true;
        
        this.dyingFramesL = [];
        this.dyingFramesR = [];
        this.dyingIdx = 0;

        this.keys = [];
        
        this.now = 0;
        this.then = 0;
        this.elapsed = 0;
        this.attackAnimationLength = 2200; // Animation length in milliseconds
        this.dyingAnimationLength = 2000;
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        drawSprite(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        
        this.move(coordinates);
        // this.skills();

        this.healthBar.show(ctx);

        this.handleMovementFrame();

        this.handleAttackingAnimation();

        // this.dead();
    }

    move(coordinates) {
        if (this.moving === true) {
            if (this.x > coordinates[0]) { // left
                if (this.direction !== "left") {
                    this.direction = "left";
                    // need this to make frames match when switching directions
                    this.movementIdxL = 0;
                }
                this.playerSprite.src = playerLeft;
                this.moving = true;
                this.x -= this.speed
                // this.frameY = 1
            }
            if (this.x < coordinates[0]) {// right
                if (this.direction !== "right") {
                    this.direction = "right";
                    // need this to make frames match when switching directions
                    this.movementIdxR = 0;
                }
                this.playerSprite.src = playerRight;
                this.moving = true;
                this.x += this.speed;
                // this.frameY = 1;
            }
        }
    }

    attack() {
        // console.log("attacking");
        this.attacking = true;
        this.moving = false;
    }

    handleMovementFrame() {
        if (this.moving === true) {
            if (this.direction === "right") {
                if (this.movementIdx < this.movementFramesR.length) {
                    // console.log(this.movementIdx);
                    this.frameX = this.movementFramesR[this.movementIdx][0];
                    this.frameY = this.movementFramesR[this.movementIdx][1];
                    this.movementIdx++;
                } else {
                    this.movementIdx = 0;
                }
            } else {
                if (this.movementIdx < this.movementFramesL.length) {
                    // console.log(this.movementIdx);
                    this.frameX = this.movementFramesL[this.movementIdx][0];
                    this.frameY = this.movementFramesL[this.movementIdx][1];
                    this.movementIdx++;
                } else {    
                    this.movementIdx = 0;
                }
            }
        }
    }

    handleAttackingAnimation() {
        if (this.attacking === true) {
            this.now = Date.now();
            this.elapsed = this.now - this.then;
            if (this.elapsed < this.now + this.attackAnimationLength) {
                this.handleAttackingFrame();
            }
            //might need to put this in a condition after timeout
            this.attacking = false;
            this.moving = true;
        }
    }

    handleAttackingFrame() {
        // console.log("inside handle attacking frames")
        if (this.attacking === true) {
            if (this.direction === "right") {
                if (this.attackIdx < this.attackFramesR.length) {
                    // console.log(this.attackIdx)
                    this.frameX = this.attackFramesR[this.attackIdx][0];
                    this.frameY = this.attackFramesR[this.attackIdx][1];
                    this.attackIdx++;
                } else {
                    this.attackIdx = 0;
                }
            } else {
                if (this.attackIdx < this.attackFramesL.length) {
                    this.frameX = this.attackFramesL[this.attackIdx][0];
                    this.frameY = this.attackFramesL[this.attackIdx][1];
                    this.attackIdx++;
                } else {
                    this.attackIdx = 0;
                }
            }
        }
    }

    beingAttacked() {
        this.healthPoints -= 5;
        console.log(this.healthPoints);
    }

    dead() {
        this.attacking = false;
        this.moving = false;
        if (this.healthPoints < 0) {
            this.now = Date.now();
            this.elapsed = this.now - this.then;
            if (this.elapsed < this.now + this.dyingAnimationLength) {
                this.handleDyingFrames();
            }
        }
    }

    handleDyingFrames() {
        // console.log("inside handle attacking frames")
        if (this.direction === "right") {
            if (this.attackIdx < this.attackFramesR.length) {
                // console.log(this.attackIdx)
                this.frameX = this.attackFramesR[this.attackIdx][0];
                this.frameY = this.attackFramesR[this.attackIdx][1];
                this.attackIdx++;
            } else {
                this.attackIdx = 0;
            }
        } else {
            if (this.attackIdx < this.attackFramesL.length) {
                this.frameX = this.attackFramesL[this.attackIdx][0];
                this.frameY = this.attackFramesL[this.attackIdx][1];
                this.attackIdx++;
            } else {
                this.attackIdx = 0;
            }
        }
    }
}
