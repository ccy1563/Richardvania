import playerRight from "../assets/rogue/RogueRight.png"
import playerLeft from "../assets/rogue/RogueLeft.png"
import HealthBar from "../scripts/bar.js"


export default class Rogue {
    constructor() {
        this.x = 600;
        this.y = 305;
        this.width = 100;
        this.height = 100,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3;

        this.attacking = false;
        this.idle = false;

        this.dying = false;
        this.alive = true;

        this.healthBar = new HealthBar(20, 480, 750, 10, 100, "yellow");
        this.healthPoints = 750;

        this.playerSprite = new Image();
        this.playerSprite.src = playerLeft;

        this.direction = "left"; 

        this.frameIdx = 0;
        this.idleFramesL = [
            [7, 0], [6, 0], [5, 0], [4, 0], 
            [3, 0], [2, 0], [1, 0], [0, 0]];
        this.idleFramesR = [
            [0, 0], [1, 0], [2, 0], [3, 0], 
            [4, 0], [5, 0], [6, 0], [7, 0]];
        this.attackFramesL = [[7, 7], [6, 7], [5, 7], [4, 7], [3, 7], [2, 7], [1, 7], [0, 7]];
        this.attackFramesR = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]];
        this.dyingFramesL = [[7, 3], [6, 3], [5, 3], [4, 3], [3, 3], [2, 3], [1, 3], [0, 3]];
        this.dyingFramesR = [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3]];
        this.teleportFramesLPhase1 = [[7, 10], [6, 10], [5, 10], [4, 10], [3, 10], [2, 10], [1, 10], [0, 10]];
        this.teleportFramesLPhase2 = [[7, 11], [6, 11], [5, 11], [4, 11], [3, 11], [2, 11], [1, 11], [0, 11]];
        this.teleportFramesRPhase1 = [[0, 10], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10]];
        this.teleportFramesRPhase2 = [[0, 11], [1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]];

        this.numOfAttacks = 1;

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
        } else {
            // one attack per 3 seconds
            if (this.numOfAttacks > 0) {
                this.attacking = true;
                this.numOfAttacks--;
                setTimeout(() => {
                    this.numOfAttacks = 1;
                }, 3000);
            }
            this.handleAttackFrames();
            this.handleIdleFrames();
        }
    }

    handleAttackFrames() {
        let framesArr = this.attackFramesL;
        if (this.direction === "right") framesArr = this.attackFramesR;
        if (this.frameIdx < framesArr.length) {
            this.frameX = framesArr[this.frameIdx][0];
            this.frameY = framesArr[this.frameIdx][1];
            this.frameIdx++;
        } else {
            this.frameIdx = 0;
            this.attacking = false;
            this.idle = true;
        }
    }

    handleIdleFrames() {
        if (this.idle && !this.attacking) {
            let framesArr = this.idleFramesL;
            if (this.direction === "right") framesArr = this.idleFramesR;
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

    handleDyingFrames() {
        let framesArr = this.dyingFramesL;
        if (this.direction === "right") framesArr = this.dyingFramesR;
        if (this.frameIdx < framesArr.length) {
            this.frameX = framesArr[this.frameIdx][0];
            this.frameY = framesArr[this.frameIdx][1];
            this.frameIdx++;
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

    // handleTeleportFramesPhase1() {
    //     // if (this.y < 300) {
    //     //     this.y -= 100;
    //     // }
    //     let framesArr = this.teleportFramesLPhase1;
    //     if (this.direction === "right") framesArr = this.teleportFramesLPhase2;
    //     if (this.frameIdx < framesArr.length) {
    //         if (this.x > 0) {
    //             this.x -= 50;
    //         } else {
    //             this.x += 100
    //         }
    //         this.frameX = framesArr[this.frameIdx][0];
    //         this.frameY = framesArr[this.frameIdx][1];
    //         this.frameIdx++;
    //     } else {
    //         const that = this;
    //         this.frameX = framesArr[framesArr.length - 1][0];
    //         this.frameY = framesArr[framesArr.length - 1][1];
    //         setTimeout(function () {
    //             // call phase ?
    //             this.handleTeleportFramesPhase2()
    //         }, 3000);
    //     }
    // }

    // handleTeleportFramesPhase2() {
    //     let framesArr = this.teleportFramesLPhase2;
    //     if (this.direction === "right") framesArr = this.teleportFramesRPhase2;
    //     if (this.frameIdx < framesArr.length) {
    //         this.frameX = framesArr[this.frameIdx][0];
    //         this.frameY = framesArr[this.frameIdx][1];
    //         this.frameIdx++;
    //     } else {
    //         this.frameX = framesArr[framesArr.length - 1][0];
    //         this.frameY = framesArr[framesArr.length - 1][1];
    //     }
    // }
    
    move(coordinates) {
        if (this.x > coordinates[0]) { // player is leftside
            if (this.direction !== "left") this.direction = "left";
            this.playerSprite.src = playerLeft;
            this.idle = true;
        }
        if (this.x < coordinates[0]) { // player is rightside
            if (this.direction !== "right") this.direction = "right";
            this.playerSprite.src = playerRight;
            this.idle = true;
        }
    }

    beingAttacked(dmg) {
        console.log("ROGUE IS HIT")
        this.healthPoints -= dmg;
        this.healthBar.takeDamage(dmg);
        if (this.healthPoints < 0) this.dying = true;
        // teleport
        // this.handleTeleportFramesPhase1();
    }
}
