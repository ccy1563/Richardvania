import village from "../assets/background/CemeteryScreen.png"

import intro from "../assets/intro.png"

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.background = new Image();
        this.background.src = village;

        this.title = new Image();
        this.title.src = intro;

    }

    animate(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
        
        // this.animate(this.ctx, this.canvas);
        // requestAnimationFrame(this.animate(c1, c2));
    }

    animateTitle(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.title, 0, 0, canvas.width, canvas.height);
    }
}