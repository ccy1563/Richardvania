import shurikenLeft from "../assets/rogue/ShurikenLeft.png";
import shurikenRight from "../assets/rogue/ShurikenRight.png";

export default class Shuriken {
    constructor(x, y, speed, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 64;
        this.height = 64,
        this.frameX = 0;
        this.frameY = 0;

        this.moving = false;
        this.direction = direction;

        this.throw = false;

        this.frameL = [[2, 0], [1, 0], [0, 0], [2, 1], [1, 1], [0, 1]];
        this.frameR = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];

        // lol, "playerSprite"
        this.playerSprite = new Image();
        this.playerSprite.src = shurikenLeft;
    }

    animate(ctx) {
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

            this.move();
            this.handleFrames();
    }

    move() {
        this.moving = true;
        // console.log(`shuriken direction ${this.direction}`)
        if (this.direction === "left") {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }
    }

    handleFrames() {
        if (this.moving) {
            let framesArr = this.frameL;
            if (this.direction === "right") framesArr = this.frameR;
            if (this.frameIdx < framesArr.length) {
                this.frameX = framesArr[this.frameIdx][0];
                this.frameY = framesArr[this.frameIdx][1];
                this.frameIdx++;
            } else {
                this.frameIdx = 0;
            }
        }
    }

    hit() {
        if (this.x < - 70 || this.x > 670) {
            return true
        } else {
            return false;
        }
    }
}
