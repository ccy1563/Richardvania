import playerRight from "../assets/rogue/RogueRight.png"
import playerLeft from "../assets/rogue/RogueLeft.png"
import HealthBar from "../scripts/bar.js"
import Shuriken from "../scripts/shuriken.js";


export default class Rogue {
    constructor() {
        this.x = 690;
        this.y = 290;
        this.width = 100;
        this.height = 100,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3;

        this.attacking = false;
        this.idle = true;

        this.dying = false;
        this.alive = true;

        this.healthBar = new HealthBar(20, 470, 750, 10, 100, "purple");
        this.healthPoints = 750;

        this.playerSprite = new Image();
        this.playerSprite.src = playerLeft;

        // this.shuriken = new Shuriken(580, 370, 20);

        this.thrown = false;

        this.teleport1 = false;
        this.teleport2 = false;
        this.invincible = false;

        this.direction = "left"; 

        this.actionIndices = {
            idleIdx: 0,
            dyingIdx: 0,
            attackingIdx: 0,
            teleportIdx: 0,
        }
        this.idleFramesL = [
            [7, 0], [6, 0], [5, 0], [4, 0], 
            [3, 0], [2, 0], [1, 0], [0, 0]];
        this.idleFramesR = [
            [0, 0], [1, 0], [2, 0], [3, 0], 
            [4, 0], [5, 0], [6, 0], [7, 0]];
        this.attackFramesL = [
            [7, 7], [6, 7], [5, 7], [4, 7], 
            [3, 7], [2, 7], [1, 7], [0, 7]];
        this.attackFramesR = [
            [0, 7], [1, 7], [2, 7], [3, 7], 
            [4, 7], [5, 7], [6, 7], [7, 7]];
        this.dyingFramesL = [
            [7, 3], [6, 3], [5, 3], [4, 3], 
            [3, 3], [2, 3], [1, 3], [0, 3]];
        this.dyingFramesR = [
            [0, 3], [1, 3], [2, 3], [3, 3], 
            [4, 3], [5, 3], [6, 3], [7, 3]];
        this.teleportFramesLPhase1 = [
            [7, 10], [6, 10], [5, 10], [4, 10],
             [3, 10], [2, 10], [1, 10], [1, 10], [1, 10], [0, 10]];
        this.teleportFramesLPhase2 = [
            [7, 11], [6, 11], [5, 11], [4, 11], 
            [3, 11], [3, 11], [3, 11], [2, 11], [1, 11], [0, 11],
            [7, 10]];
        this.teleportFramesRPhase1 = [
            [0, 10], [1, 10], [2, 10], [3, 10], 
            [4, 10], [5, 10], [6, 10], [6, 10], [6, 10], [7, 10]];
        this.teleportFramesRPhase2 = [
            [0, 11], [1, 11], [2, 11], [3, 11],     
            [4, 11], [4, 11], [4, 11], [5, 11], [6, 11], [7, 11],
            [0, 10]];

        this.numOfAttacks = 1;
        // this.currentShuriken = new Shuriken(580, 370, 20, this.direction);
        this.shurikenArr = [];

        this.keys = [];
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        drawSprite(this.playerSprite, 
            this.width * this.frameX, 
            this.height * this.frameY, 
            this.width, this.height, 
            this.x, 
            this.y, 
            this.width * 1.5, 
            this.height * 1.5);
        this.move(coordinates);
        this.healthBar.animate(ctx);

        if (this.dying === true) {
            // when rogue dies, execute death animations
            // disables all other actions and ends the game once animation ends
            this.idle = false;
            this.attacking = false;
            this.handleDyingFrames();
        }
        setTimeout(() => { // delay before rogue starts attacking
            if (this.shurikenArr.length > 0) {
                this.attacking = true; // set attacking to true
                this.idle = false;
            } else {
                if (this.direction === "left") {
                    // console.log(this.direction)
                    this.shurikenArr.push(new Shuriken(580, 350, 20, this.direction)); // in 7 seconds load shuriken to use
                } else {
                    this.shurikenArr.push(new Shuriken(70, 350, 20, this.direction)); // in 7 seconds load 
                }
            }
        }, 1000);
        // this.handleIdleFrames();
        if (this.thrown) {
            this.shurikenArr[0].animate(ctx)
            if (this.shurikenArr[0].hit()) {
                this.shurikenArr.shift();
                // this.idle = false;
                this.thrown = false;
                this.attacking = false;
            }
        } else {
            this.handleAttackFrames();
        }

        if (this.teleport1) {
            this.handleTeleportFramesPhase1();
        }
        if (this.teleport2) {
            this.handleTeleportFramesPhase2();
        }
    }

    beingAttacked(dmg) {
        if (!this.invincible) {
            this.healthPoints -= dmg;
            this.healthBar.takeDamage(dmg);
            if (this.healthPoints < 0) this.dying = true;
            // teleport
            // this.invincible = true;
            this.teleport1 = true;
            this.idle = false;
            this.attacking = false;
        }
    }

    handleTeleportFramesPhase1() {
        let framesArr = this.teleportFramesLPhase1;
        if (this.direction === "right") framesArr = this.teleportFramesRPhase1;
        if (this.actionIndices["teleportIdx"] < framesArr.length) {
            this.frameX = framesArr[this.actionIndices["teleportIdx"]][0];
            this.frameY = framesArr[this.actionIndices["teleportIdx"]][1];
            this.actionIndices["teleportIdx"]++;
        } else {
            const that = this;
            this.frameX = framesArr[framesArr.length - 1][0];
            this.frameY = framesArr[framesArr.length - 1][1];
            if (that.direction === "left") {
                that.x = -50;
            } else {
                that.x = 690;
            }
            that.teleport1 = false;
            that.teleport2 = true;
            that.actionIndices["teleportIdx"] = 0;
        }
    }

    handleTeleportFramesPhase2() {
        let framesArr = this.teleportFramesLPhase2;
        if (this.direction === "right") framesArr = this.teleportFramesRPhase2;
        if (this.actionIndices["teleportIdx"] < framesArr.length) {
            this.frameX = framesArr[this.actionIndices["teleportIdx"]][0];
            this.frameY = framesArr[this.actionIndices["teleportIdx"]][1];
            this.actionIndices["teleportIdx"]++;
        } else {
            this.invincible = false;
            this.teleport2 = false;
            // this.idle = false;
            this.attack = false;
            // this.frameX = framesArr[framesArr.length - 1][0];
            // this.frameY = framesArr[framesArr.length - 1][1];
            this.actionIndices["teleportIdx"] = 0;
        }
    }

    handleAttackFrames() {
        if (this.attacking && !this.idle && this.shurikenArr.length > 0) {
            let framesArr = this.attackFramesL;
            if (this.direction === "right") framesArr = this.attackFramesR;
            if (this.actionIndices["attackingIdx"] < framesArr.length) {
                this.frameX = framesArr[this.actionIndices["attackingIdx"]][0];
                this.frameY = framesArr[this.actionIndices["attackingIdx"]][1];
                this.actionIndices["attackingIdx"]++;
            } else {
                this.thrown = true; // animates shuriken the moment rogue's attack frame ends
                this.attacking = false;
                this.idle = true;
                this.actionIndices["attackingIdx"] = 0;
            }
        }
    }

    handleIdleFrames() {
        if (this.idle && !this.attacking) {
            let framesArr = this.idleFramesL;
            if (this.direction === "right") framesArr = this.idleFramesR;
            if (this.actionIndices["idleIdx"] < framesArr.length) {
                this.frameX = framesArr[this.actionIndices["idleIdx"]][0];
                this.frameY = framesArr[this.actionIndices["idleIdx"]][1];
                this.actionIndices["idleIdx"]++;
            } else {
                this.actionIndices["idleIdx"] = 0;
                this.frameX = framesArr[this.actionIndices["idleIdx"]][0];
                this.frameY = framesArr[this.actionIndices["idleIdx"]][1];
            }
        }
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
            this.frameX = framesArr[framesArr.length-1][0];
            this.frameY = framesArr[framesArr.length-1][1];
            setTimeout(function () {
                that.frameX = framesArr[framesArr.length-1];
                that.alive = false;
            }, 3000);
        }
    }
    
    move(coordinates) {
        if (this.x > coordinates[0]) { // player is leftside
            if (this.direction !== "left") this.direction = "left";
            this.playerSprite.src = playerLeft;
            // this.idle = true;
        }
        if (this.x < coordinates[0]) { // player is rightside
            if (this.direction !== "right") this.direction = "right";
            this.playerSprite.src = playerRight;
            // this.idle = true;
        }
    }
}
