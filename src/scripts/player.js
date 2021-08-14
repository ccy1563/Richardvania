import playerRight from "../assets/HeroKnightRight.jpg"
import playerLeft from "../assets/HeroKnightLeft.jpg"

export default class Player {

    constructor() {
        this.x = 0;
        this.y = 374;
        this.width = 100;
        this.height = 55,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 8;
        this.moving = false;

        this.jumping = false;
        this.direction = "right";

        // playerSprite, will create a new instance of image object
        this.playerSpriteRight = new Image();
        this.playerSpriteLeft = new Image();
        // set playerSprite's src value to the spreadsheet.
        this.playerSpriteRight.src = playerRight;
        this.playerSpriteLeft.src = playerLeft;

        this.keys = [];
    }

    animate(ctx) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
        if (this.direction === "right") {
            drawSprite(this.playerSpriteRight, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        } else {
            drawSprite(this.playerSpriteLeft, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        }

        this.movePlayer();
        this.skills();
        this.handlePlayerFrame();
        this.dodgeRoll();
        // this.idlePlayer();
    }

    keyDown(e) {
        this.keys[e.code] = true;
        this.moving = true;
    }

    keyUp(e) {
        delete this.keys[e.code];
        this.moving = false;
        this.frameY = 0;
    }

    idlePlayer() {
        if (!this.moving && this.frameY !== 0) {
            this.frameY = 0;
        }
        // if (!this.moving && this.frameY === 0) {
        //     this.frameX++;
        // }
    }

    movePlayer() {
        if (this.keys["KeyD"]) {// right
            console.log("moving");
            if (this.direction !== "right") {
                this.direction = "right";
            }
            this.moving = true;
            this.x += this.speed;
            this.frameY = 1;
        }
        if (this.keys["KeyA"]) { // left
            if (this.direction !== "left") {
                this.direction = "left";
            }
            this.moving = true
            this.x -= this.speed
            this.frameY = 1
        }
        if (this.keys["Space"]) {
            
        }
    }

    skills() {
        if (this.keys["ArrowLeft"]) {
            // this.moving = false;
            this.frameY = 3;
        }
        if (this.keys["ArrowDown"]) {
            this.frameY = 6;
        }
    }

    dodgeRoll() {
        if (this.keys["ArrowRight"] && this.direction === "right") {
            // this.moving = true
            this.frameY = 7;
            this.x += 10;
        }
        if (this.keys["ArrowRight"] && this.direction === "left") {
            // this.moving = true
            this.frameY = 7;
            this.x -= 10;
        }
    }
    
    handlePlayerFrame() {
        // if key is not pressed -- execute idle animations
        if (this.direction === "right") {
            // if (!this.moving && this.frameY !== 0) {
            //     this.frameY = 0;
            // }
            if (this.frameX < 7 && this.moving) {
                this.frameX++;
            } else {
                this.frameX = 2;
            }
        } else {
            // if (!this.moving && this.frameY !== 0) {
            //     this.frameY = 0;
            // }
            if (this.frameX >= 3 && this.moving) {
                this.frameX--;
            } else {
                this.frameX = 7;
            }
        }
    }
}