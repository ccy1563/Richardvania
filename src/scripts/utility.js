// export default class Utility {
//     static collision(player, demon) {
//         if (player.x > demon.x + demon.width ||
//             player.x + player.width < demon.x ||
//             player.y > demon.y + demon.height ||
//             player.y + player.height < demon.y) {
//             // no collision
//             // console.log("no collision");
//         } else {
//             // console.log("collision");
//             // enemy character should attack player character 
//             // make sure to (throttle?) so that it isnt spamming the shit out of attack
//             // maybe setInverval? fk me idk
//             let timeID = window.setTimeout(this.timeIt, 5000);
//             window.clearTimeout(timeID)
//             demon.attack();
//         }
//     }

//     static timeIt() {
//         console.log("fjkjsalkfhasjlkj");
//     }
// }