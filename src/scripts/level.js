import village from "../assets/inferno_village.jpg"

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.background = new Image();
        this.background.src = village;
    }

    animate(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        // this.animate(this.ctx, this.canvas);
        // requestAnimationFrame(this.animate(c1, c2));
    }
}