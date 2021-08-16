export default class HealthBar {
    constructor(x, y, w, h, maxHealth, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxHealth = maxHealth;
        this.maxWidth = w;
        this.health = maxHealth;
        this.color = color;
    }

    animate(ctx) {
        ctx.lineWith = 5;
        ctx.strokeStyle = "#333";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }

    takeDamage(damagePerHit) {
        if (this.w - damagePerHit < 0) {
            this.w = 0;
        } else {
            this.w -= damagePerHit;
        }
    }
}