# [Richardvania](https://ccy1563.github.io/Richardvania/)

<img align="center" width="500" height="300" src="https://github.com/ccy1563/Richardvania/blob/main/richardvania.gif">

## Background
* RICHARDVANIA is a game where the player controls a character that can move left, right, and attack.
* The goal is to reach the end of the level while eliminating as many enemies as possible.
* You play as a swordsman Old Richard that was imprisoned by Demon Lord Anthony. After a decade of imprisonment, Old Richard escaped and now his sole mission is to slay Anthony with his big sword.

## Functionality & MVPs
INSTRUCTIONS
* A: move left
* D: move right
* Left Arrow: Attack
* A/D + Right Arrow: Dodge-roll towards direction. Invinciblity applied for 1 second. Cooldown for 1 second after.

In RICHARD, users will be able to:
* Move player character left, right, and be able to jump.
* Attack enemy character to accumulate points.
* Dodge roll to avoid enemy attacks (pending).
* Pause the game.
* Stop the music from playing.

In addition, this project will include:
An About modal that will display the controls.
A production README

## Wireframe
![wireframe](wireframe.png)

## Technologies, Libraries, APIs
This project will be implemented with the following technologies:
* Javascript
* CSS
* Canvas API

## Code Snippet
<img align="center" width="500" height="300" src="https://github.com/ccy1563/Richardvania/blob/main/teleport.gif">

* When the Rogue enemy type gets hit by the player, she must go through two phases of animation
  1. Teleport straight up, fading out, and then Rogue location is shifted over to the opposite side of the screen
  2. Teleport straight down, fading back in

```Javascript
    handleTeleportFramesPhase1() {
        let framesArr = this.teleportFramesLPhase1;
        if (this.direction === "right") framesArr = this.teleportFramesRPhase1;
        if (this.actionIndices["teleportIdx"] < framesArr.length) {
            this.frameX = framesArr[this.actionIndices["teleportIdx"]][0];
            this.frameY = framesArr[this.actionIndices["teleportIdx"]][1];
            this.actionIndices["teleportIdx"]++;
        } else {
            const that = this;
            this.frameX = framesArr[framesArr.length - 1][0];
            this.frameY = framesArr[framesArr.length - 1][1];
            if (that.direction === "left") {
                that.x = -50;
            } else {
                that.x = 690;
            }
            that.teleport1 = false;
            that.teleport2 = true;
            that.actionIndices["teleportIdx"] = 0;
        }
    }

    handleTeleportFramesPhase2() {
        let framesArr = this.teleportFramesLPhase2;
        if (this.direction === "right") framesArr = this.teleportFramesRPhase2;
        if (this.actionIndices["teleportIdx"] < framesArr.length) {
            this.frameX = framesArr[this.actionIndices["teleportIdx"]][0];
            this.frameY = framesArr[this.actionIndices["teleportIdx"]][1];
            this.actionIndices["teleportIdx"]++;
        } else {
            this.invincible = false;
            this.teleport2 = false;
            this.attack = false;
            this.actionIndices["teleportIdx"] = 0;
        }
    }
```

## Implementation Timeline
* Friday Afternoon & Weekend\
Making character, one enemy and background to appear. Making player character capable of moving when keystroke is pressed.
* Monday\
Complete player character attacking animations. Make attacks capable of "hitting" enemy character. Allow points to be accumulated after eliminating enemy.
* Tuesday\
Complete enemy character animations and enemy A.I. 
* Wednesday\
Complete UI and additional features.
* Thursday Morning\
Polish.

