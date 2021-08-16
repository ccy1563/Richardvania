import playerRight from "../assets/HeroRight.png"
import playerLeft from "../assets/HeroLeft.png"
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
        
        this.action = false;
        this.jumping = false;
        this.dodging = false;
        this.attacking = false;
        this.moving = true

        this.healthBar = new HealthBar(20,20,130,10,100,"green");

        this.keys = [];
    }

    animate(ctx) {
        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }
        drawSprite(this.playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width * 1.5, this.height * 1.5);
        this.move();
        this.handleFrames();
        this.healthBar.animate(ctx);
    }

    keyDown(e) {
        this.keys[e.code] = true;
    }

    keyUp(e) {
        delete this.keys[e.code];
        this.frameY = 0;
        this.attacking = false;
        this.moving = false;
        this.jumping = false;
        this.dodging = false;
    }

    move() {
        if (this.keys["KeyD"]) {// right
            this.playerSprite.src = playerRight;
            this.direction = "right";
            this.moving = true;
            this.x += this.speed;
            this.frameY = 1;
            
        }
        if (this.keys["KeyA"]) { // left
            this.playerSprite.src = playerLeft;
            this.direction = "left";
            this.moving = true;
            this.x -= this.speed
            this.frameY = 1
        }
        if (this.keys["KeyW"] && this.jumping === false) {
            this.frameY = 9;
            this.y_velocity -= 5;
            this.jumping = true;
        }
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
        if (this.keys["ArrowRight"] && this.playerSprite.src === playerRight) {
            for (let i = 0; i < 10; i++) {
                this.keys["ArrowRight"];
            }
            // console.log()
            this.dodging = true
            this.frameY = 10;
            this.x += 10;
        }
        if (this.keys["ArrowRight"] && this.playerSprite.src === playerLeft) {
            // for (let i = 0; i < 10; i++) {
            //     this.keys.push("ArrowRight");
            // }
            this.dodging = true
            this.frameY = 10;
            this.x -= 10;
        } 
        // if (this.keys["p"]) {
            
        // }
    }
    
    handleFrames() {
        if (this.playerSprite.src === playerRight) {
            if (this.frameX < 5) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        } 
        if (this.playerSprite.src === playerLeft) {
            if (this.frameX >= 1) {
                this.frameX--;
            } else {
                this.frameX = 5;
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
}
