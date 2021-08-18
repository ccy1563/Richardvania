import playerRight from "../assets/hero/HeroRight.png"
import playerLeft from "../assets/hero/HeroLeft.png"
import HealthBar from "../scripts/bar.js"

export default class Player {
    constructor() {
        this.x = 0;
        this.y = 348;
        this.width = 130;
        this.height = 72,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 8;
        this.direction = "right";

        this.playerSprite = new Image();
        this.playerSprite.src = playerRight;
        
        // this.jumping = false;
        this.dodging = false;
        this.attacking = false;
        this.moving = false;
        this.idle = true;
        
        this.canDodge = true;
        this.invincible = false;

        this.healthBar = new HealthBar(20,20,500,10,100,"green");
        this.healthPoints = 500;

        // need this so that one action animation doesn't interfere with other action animations
        this.actionIndices = {
            movementIdx: 0,
            idleIdx: 0,
            dyingIdx: 0,
            attackingIdx: 0,
            dodgingIdx: 0
        }

        this.idleFramesL = [
            [5, 0], [4, 0], [3, 0], 
            [2, 0], [1, 0], [0, 0]];
        this.idleFramesR = [
            [0, 0], [1, 0], [2, 0], 
            [3, 0], [4, 0], [5, 0]];
        this.movementFramesL = [
            [5, 1], [4, 1], [3, 1], [2, 1], [1, 1],
            [0, 1], [5, 2], [4, 2], [3, 2], [2, 2]];
        this.movementFramesR = [
            [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], 
            [5, 1], [0, 2], [1, 2], [2, 2], [3, 2]];
        this.dyingFramesL = [
            [5, 7], [4, 7], [3, 7], [2, 7], [1, 7], 
            [0, 7], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8]];
        this.dyingFramesR = [
            [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], 
            [5, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8]];
        this.attackFramesL = [
            [1, 2], [0, 2], [5, 3], [4, 3], [3, 3], [2, 3], [1, 3], 
            [0, 3], [5, 4], [4, 4], [3, 4], [2, 4], [1, 4], [0, 4], 
            [5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [0, 5]];
        this.attackFramesR = [
            [4, 2], [5, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], 
            [5, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], 
            [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]];

        // this.dodgeIdx = 0;
        this.dodgeFramesL = [
            [0, 9], [5, 10], [4, 10], [3, 10], [2, 10],
            [1, 10], [0, 10], [5, 11], [4, 11], [3, 11]];
        this.dodgeFramesR = [
            [5, 9], [0, 10], [1, 10], [2, 10], [3, 10], 
            [4, 10], [5, 10], [0, 11], [1, 11], [2, 11]];
            
        this.keys = [];
    }

    animate(ctx) {
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

        this.healthBar.animate(ctx);
        
        if (this.dying === true) {
            // when player character dies, execute death animations
            // disables all other actions and ends the game once animation ends
            this.handleDyingFrames();
        } else {
            this.move();
            this.handleFrames(this.moving, this.movementFramesL, this.movementFramesR, "movementIdx");
            this.handleFrames(this.idle, this.idleFramesL, this.idleFramesR, "idleIdx");
            this.handleFrames(this.attacking, this.attackFramesL, this.attackFramesR, "attackingIdx");
            this.handleFrames(this.dodging, this.dodgeFramesL, this.dodgeFramesR, "dodgingIdx");
            // condition is met within dodge roll keypress handler
            if (this.dodging) {
                this.invincible = true;
            } else {
                this.invincible = false;
            }
        }
    }

    keyDown(e) {
        this.idle = false;
        this.keys[e.code] = true;
        // console.log(this.frameIdx)
    }

    keyUp(e) {
        delete this.keys[e.code];
        this.attacking = false;
        this.moving = false;
        // this.jumping = false;
        this.dodging = false;
        this.idle = true;
        this.actionIndices["movementIdx"] = 0;
        this.actionIndices["idleIdx"] = 0;
        this.actionIndices["attackingIdx"] = 0;
        this.actionIndices["dodgingIdx"] = 0;
        this.actionIndices["dyingIdx"] = 0;
    }

    move() {
        if (this.keys["KeyD"] && this.x < 670) { // right
            this.playerSprite.src = playerRight;
            this.direction = "right";
            this.moving = true;
            this.idle = false;
            this.dodging = false;
            this.attacking = false;
            this.x += this.speed;
        }
        if (this.keys["KeyA"] && this.x > -70) { // left
            this.playerSprite.src = playerLeft;
            this.direction = "left";
            this.moving = true;
            this.idle = false;
            this.dodging = false;
            this.attacking = false;
            this.x -= this.speed
        }
        if (this.keys["ArrowLeft"]) {
            this.moving = false;
            this.idle = false;
            this.dodging = false;
            this.attacking = true;
        }

        // can only dodgeroll when player presses (direction key + dodgeroll key)
        // this prevents rolling in place for infinite dodgerolls
        if ((this.keys["ArrowRight"] && this.keys["KeyD"] || (this.keys["ArrowRight"] && this.keys["KeyA"]) ) &&
         (this.x < 670) && (this.x > -70) && this.canDodge) {
            // console.log(this.frameIdx)
            setTimeout(() => {
                // invincibility from dodging enabled for 1 second
                this.canDodge = false;
                setTimeout(() => {
                    // cannot dodge again for 0.1 seconds after
                    this.canDodge = true;
                }, 1100);
            }, 1000);

            this.moving = false;
            this.idle = false;
            this.dodging = true;
            this.attacking = false;
        }
    }

    handleFrames(action, framesL, framesR, idxType) {
        if (action) {
            let framesArr = framesL;
            if (this.direction === "right") framesArr = framesR;
            if (this.actionIndices[idxType] < framesArr.length) {
                this.frameX = framesArr[this.actionIndices[idxType]][0];
                this.frameY = framesArr[this.actionIndices[idxType]][1];
                this.actionIndices[idxType]++;
            } else {
                this.actionIndices[idxType] = 0;
            }
        }
    }
    
    coordinates() {
        return [this.x, this.y];
    }
    
    beingAttacked(dmg) {
        this.healthPoints -= dmg;
        this.healthBar.takeDamage(dmg)
    }

    handleDyingFrames() {
        let framesArr = this.dyingFramesL;
        if (this.direction === "right") framesArr = this.dyingFramesR;
        if (this.actionIndices["dyingIdx"] < framesArr.length) {
            this.frameX = framesArr[this.actionIndices["dyingIdx"]][0];
            this.frameY = framesArr[this.actionIndices["dyingIdx"]][1];
            this.actionIndices["dyingIdx"]++;
        } else {
            const that = this;
            // dead body remains displayed for brief moment after death
            this.frameX = framesArr[framesArr.length - 1][0];
            this.frameY = framesArr[framesArr.length - 1][1];
            setTimeout(function () {
                that.frameX = framesArr[framesArr.length - 1];
                that.alive = false;
            }, 3000);
        }
    }

    beingAttacked(dmg) {
        // console.log(`inv: ${this.invincible}`)
        if (!this.invincible) {
            // console.log("player being hit")
            this.healthPoints -= dmg;
            this.healthBar.takeDamage(dmg);
        }
        if (this.healthPoints < 0) this.dying = true;
    }
}
