import playerRight from "../assets/HeroRight.png"
import playerLeft from "../assets/HeroLeft.png"

// import playerAttackLeft from "../assets/hero/left/attack.png"
// import playerBlockLeft from "../assets/hero/left/block.png"
// import playerDodgeLeft from "../assets/hero/left/dodge.png"
// import playerIdleLeft from "../assets/hero/left/idle.png"
// import playerRunLeft from "../assets/hero/left/run.png"

// import playerAttackRight from "../assets/hero/Right/attack.png"
// import playerBlockRight from "../assets/hero/Right/block.png"
// import playerDodgeRight from "../assets/hero/Right/dodge.png"
// import playerIdleRight from "../assets/hero/Right/idle.png"
// import playerRunRight from "../assets/hero/Right/run.png"

export default class Player {
    constructor() {
        this.x = 0;
        this.y = 348;
        this.width = 130;
        this.height = 72,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 8;
        this.y_velocity = 0;
        
        this.playerSprite = new Image();
        this.playerSprite.src = playerRight;
        
        this.action = false;
        this.jumping = false;
        this.dodging = false;
        this.attacking = false;
        this.moving = true

        this.atkFrames = [[5,2], [0,3], [1,3], [2,3], [3,3], [4,3], [5,3]];
        this.atkFramesIdx = 0;

        this.keys = [];
    }

    animate(ctx) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        drawSprite(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);

        this.move();
        this.attack();
        this.dodgeRoll();
        this.handleFrames();
        // this.fall();
        // this.handleAttackFrame();
    }

    keyDown(e) {
        this.keys[e.code] = true;
        // this.action = "move";
    }

    keyUp(e) {
        delete this.keys[e.code];
        // this.action = "move";
        this.frameY = 0;
        this.attacking = false;
        this.moving = false;
        this.jumping = false;
        this.dodging = false;
    }

    move() {
        if (this.keys["KeyD"]) {// right
            this.playerSprite.src = playerRight;
            this.moving = true;
            this.x += this.speed;
            this.frameY = 1;
        }
        if (this.keys["KeyA"]) { // left
            this.playerSprite.src = playerLeft;
            this.moving = true;
            this.x -= this.speed
            this.frameY = 1
        }
        if (this.keys["KeyW"] && this.jumping === false) {
            this.frameY = 9;
            this.y_velocity -= 5;
            this.jumping = true;
        }
    }
    
    attack() {
        if (this.keys["ArrowLeft"]) {
            this.attacking = true;
            this.frameY = 3;
            // this.moving = true;
        }
        if (this.keys["ArrowUp"]) {
            this.attacking = true;
            this.frameY = 4;
            // this.moving = true;
        }
    }

    dodgeRoll() {
        if (this.keys["ArrowRight"] && this.playerSprite.src === playerRight) {
            this.frameY = 10;
            // this.action = true
            this.x += 10;
        }
        if (this.keys["ArrowRight"] && this.playerSprite.src === playerLeft) {
            // this.action = true
            this.frameY = 10;
            this.x -= 10;
        }
    }
    
    handleFrames() {
        // if key is not pressed -- execute idle animations
        if (this.playerSprite.src === playerRight) {
            // if (!this.action && this.frameY !== 0) {
            //     this.frameY = 0;
            // }
            if (this.frameX < 5) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } 
        if (this.playerSprite.src === playerLeft) {
            // if (!this.action && this.frameY !== 0) {
            //     this.frameY = 0;
            // }
            if (this.frameX >= 1) {
                this.frameX--;
            } else {
                this.frameX = 5;
            }
        }
    }
    
    // handleAttackFrame() {
    //     if (this.attacking == true) {
    //         if (this.atkFramesIdx > 0) {
    //             this.frameX = this.atkFrames[this.atkFramesIdx][0];
    //             this.frameY = this.atkFrames[this.atkFramesIdx][1];
    //             this.atkFramesIdx--;
    //         } else {
    //             this.atkFramesIdx = this.atkFrames.length - 1;
    //         }
    //     }
    // }

    coordinates() {
        return [this.x, this.y];
    }

}
