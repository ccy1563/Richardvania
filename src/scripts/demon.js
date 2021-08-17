import playerRight from "../assets/abomination/AbominationRight.jpg"
import playerLeft from "../assets/abomination/AbominationLeft.jpg"
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
        this.movementFramesL = [
            [3, 3], [2, 3], [1, 3], [0, 3], 
            [5, 4], [4, 4], [3, 4], [2, 4]];
        this.movementFramesR = [
            [2, 3], [3, 3], [4, 3], [5, 3], 
            [0, 4], [1, 4], [2, 4], [3, 4]];
        this.attackFramesL = [
            [1, 1], [0, 1], [5, 2], [4, 2], [3, 2], 
            [2, 2], [1, 2], [0, 2], [5, 3], [4, 3]];
        this.attackFramesR = [
            [4, 1],[4, 2], [0, 2], [1, 2], [2, 2], 
            [3, 2], [4, 2], [5, 2], [0, 3], [1, 3]];
        this.dyingFramesL = [
            [0, 5], [5, 6], [4, 6], 
            [3, 6], [2, 6], [1, 6], [0, 6]];
        this.dyingFramesR = [
            [5, 5], [0, 6], [1, 6], 
            [2, 6], [3, 6], [4, 6], [5, 6]];

        this.numOfAttacks = 1;

        this.keys = [];
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        drawSprite(
            this.playerSprite, 
            this.width * this.frameX, 
            this.height * this.frameY, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width * 1.5, 
            this.height * 1.5);

        this.move(coordinates);
        this.healthBar.animate(ctx);

        if (this.dying === true) {
            // when abomination dies, execute death animations
            // disables all other actions and ends the game once animation ends
            this.moving = false;
            this.attacking = false;
            this.handleDyingFrames();
        } else {
            // one attack per 2 seconds
            if (this.numOfAttacks > 0) {
                this.attacking = true;
                this.moving = false;
                this.numOfAttacks--;
                setTimeout(() => {
                    this.numOfAttacks = 1;
                }, 2000);
            }
            this.handleAttackFrames();
            this.handleMovementFrames();
        }
    }

    handleAttackFrames() {
        if (this.attacking && !this.moving) {
            let framesArr = this.attackFramesL;
            if (this.direction === "right") framesArr = this.attackFramesR;
            if (this.frameIdx < framesArr.length) {
                this.frameX = framesArr[this.frameIdx][0];
                this.frameY = framesArr[this.frameIdx][1];
                this.frameIdx++;
            } else {
                this.attacking = false;
                this.frameIdx = 0;
                this.moving = true;
            }
        }
    }

    handleMovementFrames() {
        if (this.moving && !this.attacking) {
            let framesArr = this.movementFramesL;
            if (this.direction === "right") framesArr = this.movementFramesR;
            if (this.frameIdx < framesArr.length) {
                this.frameX = framesArr[this.frameIdx][0];
                this.frameY = framesArr[this.frameIdx][1];
                this.frameIdx++;
            } else {
                this.frameIdx = 0;
                this.frameX = framesArr[this.frameIdx][0];
                this.frameY = framesArr[this.frameIdx][1];
            }
        }
    }

    move(coordinates) {
        if (this.moving) {
            if (this.x > coordinates[0] ) {
                if (this.direction !== "left") {
                    this.direction = "left";
                    this.movementIdxL = 0;
                }
                this.playerSprite.src = playerLeft;
                this.moving = true;
                this.x -= this.speed
            }
            if (this.x < coordinates[0] - 70) {
                if (this.direction !== "right") {
                    this.direction = "right";
                    this.movementIdxR = 0;
                }
                this.playerSprite.src = playerRight;
                this.moving = true;
                this.x += this.speed;
            }
        }
    }

    handleDyingFrames() {
        let framesArr = this.dyingFramesL;
        if (this.direction === "right") framesArr = this.dyingFramesR;
        if (this.frameIdx < framesArr.length) {
            this.frameX = framesArr[this.frameIdx][0];
            this.frameY = framesArr[this.frameIdx][1];
            this.frameIdx++;
        } else {
            const that = this;
            // dead body remains displayed for brief moment after death
            this.frameX = framesArr[framesArr.length-1][0];
            this.frameY = framesArr[framesArr.length-1][1];
            setTimeout(function () {
                that.frameX = framesArr[framesArr.length-1];
                that.alive = false;
            }, 3000);
        }
    }

    beingAttacked(dmg) {
        this.healthPoints -= dmg;
        this.healthBar.takeDamage(dmg);
        if (this.healthPoints < 0) this.dying = true;
    }
}