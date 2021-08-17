import spinningBlade from "../assets/rogue/Shuriken.png";

export default class Suriken {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
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
    }
}
