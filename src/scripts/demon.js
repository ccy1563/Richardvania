import playerRight from "../assets/AbominationRight.jpg"
import playerLeft from "../assets/AbominationLeft.jpg"

export default class Demon {
    constructor() {
        this.x = 375;
        this.y = 185;
        this.width = 180;
        this.height = 180,
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3;
        this.direction = "left";

        this.playerSprite = new Image();

        this.movement = [[0, 3], [1, 3], [2, 3], [3, 3]];
        this.movement_idx = 0;

        this.keys = [];
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
        drawSprite(this.playerSpriteRight, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);

        this.movePlayer(coordinates);
        this.handleMovementFrame();
    }

    movePlayer(coordinates) {
        if (this.x > coordinates[0]) { // left
            if (this.direction !== "left") {
                this.direction = "left";
            }
            this.moving = true;
            this.x -= this.speed
        }
        if (this.x < coordinates[0]) {// right
            if (this.direction !== "right") {
                this.direction = "right";
            }
            this.moving = true;
            this.x += this.speed;
        }
    }

    attack() {
        // if collision is detected -- attack
    }

    handleMovementFrame() {
        if (this.direction === "right") {
            if (this.movement_idx > 0) {
                this.frameX = this.movement[this.movement_idx][0]+1;
                this.frameY = this.movement[this.movement_idx][1];
                this.movement_idx--;
            } else {
                this.movement_idx = this.movement.length-1;
            }
        }
        if (this.direction === "left") {
            if (this.movement_idx < 4) {
                this.frameX = this.movement[this.movement_idx][0];
                this.frameY = this.movement[this.movement_idx][1];
                this.movement_idx++;
            } else {
                this.movement_idx = 0;
            }
        }
    }
}
