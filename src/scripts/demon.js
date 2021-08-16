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
                
        this.dying = false;
        this.alive = true;

        this.healthPoints = 750;
        this.healthBar = new HealthBar(20, 480, 750, 10, 100, "yellow");

        this.playerSprite= new Image();
        this.playerSprite.src = playerLeft;
        
        this.direction = "left";
        this.frameIdx = 0;
        this.movementFramesL = [[0, 3], [1, 3], [2, 3], [3, 3]];
        this.movementFramesR = [[5, 3], [4, 3], [3, 3], [2, 3]];
        this.attackFramesL = [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]];
        this.attackFramesR = [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2]];
        this.dyingFramesL = [[5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6]];
        this.dyingFramesR = [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]];

        this.keys = [];
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
        drawSprite(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        this.move(coordinates);
        this.healthBar.animate(ctx);
        
        if (this.dying === true) {
            this.handleDyingAnimation();
        } else {
            if (this.direction === "right") {
                this.handleFrames(this.moving, this.movementFramesR, this.frameIdx);
            } else {
                this.handleFrames(this.moving, this.movementFramesL, this.frameIdx);
            }
            this.handleAttackingAnimation();
        }
    }

    move(coordinates) {
        if (this.moving === true) {
            if (this.x > coordinates[0] ) { // player is leftside
                if (this.direction !== "left") {
                    this.direction = "left";
                    // need this to make frames match when switching directions
                    this.movementIdxL = 0;
                }
                this.playerSprite.src = playerLeft;
                this.moving = true;
                this.x -= this.speed
            }
            if (this.x < coordinates[0] -70) { // player is rightside
                if (this.direction !== "right") {
                    this.direction = "right";
                    // need this to make frames match when switching directions
                    this.movementIdxR = 0;
                }
                this.playerSprite.src = playerRight;
                this.moving = true;
                this.x += this.speed;
            }
        }
    }

    handleFrames(action, framesArr, frameIdx) {
        if (action === true) {
            if (frameIdx < framesArr.length) {
                this.frameX = framesArr[frameIdx][0];
                this.frameY = framesArr[frameIdx][1];
                this.frameIdx++;
            } else {
                this.frameIdx = 0;
            }
        }
    }

    handleDyingAnimation() {
        this.attacking = false;
        this.moving = false;
        if (this.healthPoints < 0) {
            // this.dying = true;
            if (this.direction === "right") {
                this.handleDyingFrames(this.dying, this.dyingFramesR, this.frameIdx);
            } else {
                this.handleDyingFrames(this.dying, this.dyingFramesL, this.frameIdx);
            }
        }
    }


    handleDyingFrames(action, framesArr, frameIdx) {
        const that = this;
        if (action === true) {
            if (frameIdx < framesArr.length) {
                that.frameX = framesArr[frameIdx][0];
                that.frameY = framesArr[frameIdx][1];
                that.frameIdx++;
            } else {
                that.frameX = framesArr[framesArr.length - 1][0];
                that.frameY = framesArr[framesArr.length - 1][1];
                setTimeout(function () {
                    that.frameX = framesArr[framesArr.length - 1];
                    // that.dying = false;
                    // console.log(that.dying);
                    // that.moving = true;
                    that.alive = false;  
                    // that.dying = false;
                }, 3000);
            }
        }

    }

    handleAttackingAnimation() {
        const that = this;
        if (this.attacking === true) {
            if (this.direction === "right") {
                that.handleAttackingFrames(this.attacking, this.attackFramesR, this.frameIdx);
            } else {
                this.handleAttackingFrames(this.attacking, this.attackFramesL, this.frameIdx);
            }
            // this.attacking = false;
            // this.moving = true;
        }
    }

    handleAttackingFrames(action, framesArr, frameIdx) {
        const that = this;
        if (action === true) {
            if (frameIdx < framesArr.length) {
                that.frameX = framesArr[frameIdx][0];
                that.frameY = framesArr[frameIdx][1];
                that.frameIdx++;
            } else {
                // that.frameX = framesArr[framesArr.length - 1][0];
                // that.frameY = framesArr[framesArr.length - 1][1];
                this.moving = true;
                this.attacking = false;
                if (this.direction === "right") {
                    this.handleFrames(this.moving, this.movementFramesR, this.frameIdx);
                } else {
                    this.handleFrames(this.moving, this.movementFramesL, this.frameIdx);
                }
                // setTimeout(function () {
                //     that.attacking = false;
                //     that.frameX = framesArr[framesArr.length - 1];
                // }, 800);
            }
        }
    }

    attack() {
        // const that = this;
        this.attacking = true;
        this.moving = false;
        // setTimeout(function(){
        //     this.moving = true;
        // }, 1000);
    }

    beingAttacked(dmg) {
        this.healthPoints -= dmg;
        this.healthBar.takeDamage(dmg)
    }

    dead() {
        this.dying = true;
    }
}
