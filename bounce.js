import Ball from "./Ball.js";
import * as f from "./functions.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const gravity = f.vec2(0, .2);
let balls = [];

for(let i = 0; i < 2; i++) 
    balls.push(new  Ball(ctx, Math.random() * canvas.width, 200, Math.floor(Math.random() * 25 + 5)));


let deltaDime = 0; 
let lastTick = 0;
let clicked = false;
const wind = f.vec2(1, 0); 

function animate(tick) {

    let deltaTime = (tick - lastTick) / 1000;
    lastTick = tick;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < balls.length; i++) {

        f.print(ctx,  `mass: ${balls[i].mass}`, i * 100 + 10, 20);
        f.print(ctx,  `vel: x: ${Math.trunc(balls[i].velocity.x, 2)}    y: ${Math.trunc(balls[i].velocity.y, 2)}`, i * 100 + 10, 40);

        if(clicked)            
            balls[i].applyForce(wind);    

        balls[i].applyGravity(gravity);
        f.setEdgesToCircle(balls[i], canvas, true);
        balls[i].update(deltaTime);        
        balls[i].show(ctx);      
    }

   

    requestAnimationFrame(animate);    
}

animate(0);

window.addEventListener('mousedown', function(e) {
    clicked = true;
});

window.addEventListener('mouseup', function(e) {
    clicked = false;
});