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

        this.healthBar = new HealthBar(20, 480, 750, 10, 100, "red");

        this.direction = "left";

        this.playerSprite= new Image();
        this.playerSprite.src = playerLeft;

        this.movement = [[0, 3], [1, 3], [2, 3], [3, 3]];
        this.movement_idx = 0;


        this.keys = [];
    }

    animate(ctx, coordinates) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        drawSprite(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);

        this.move(coordinates);
        // this.skills();
        this.handleMovementFrame();
        this.healthBar.show(ctx);
        // // this.handleAttackFrame();
    }


    move(coordinates) {
        if (this.x > coordinates[0]) { // left
            if (this.direction !== "left") {
                this.direction = "left";
                // need this to make frames match when switching directions
                this.movement_idx = 0;
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
                this.movement_idx = 3;
            } 
            this.playerSprite.src = playerRight;
            this.moving = true;
            this.x += this.speed;
            // this.frameY = 1;
        }
    }

    skills() {
    }

    handleMovementFrame() {
        if (this.direction === "right") {
            if (this.movement_idx > 0) {
                this.frameX = this.movement[this.movement_idx][0]+2;
                this.frameY = this.movement[this.movement_idx][1];
                this.movement_idx--;
            } else {
                this.movement_idx = 3;
            }
        } else {
            if (this.movement_idx < this.movement.length) {
                this.frameX = this.movement[this.movement_idx][0];
                this.frameY = this.movement[this.movement_idx][1];
                this.movement_idx++;
            } else {
                this.movement_idx = 0;
            }
        }
    }
}
