import * as f from "./functions.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const gravity = f.vec2(0, .2);
let balls = [];

for(let i = 0; i < 2; i++) 
    balls.push(f.moveableCircleFactory(Math.random() * canvas.width, 200, Math.floor(Math.random() * 25) + 5));


let deltaDime = 0; 
let lastTick = 0;
let clicked = false;
function animate(tick) {

    let deltaTime = (tick - lastTick) / 1000;
    lastTick = tick;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < balls.length; i++) {

        f.print(ctx,  `mass: ${balls[i].mass}`, i * 100 + 10, 20);
        f.print(ctx,  `vel: x: ${parseInt(balls[i].velocity.x)}    y: ${parseInt(balls[i].velocity.y)}`, i * 100 + 10, 40);

        f.applyGravity(balls[i], gravity);
        if(clicked)
            f.applyForce(balls[i], f.vec2(5, 0));

        f.setEdgesToCircle(balls[i], canvas);
       // balls[i].update(deltaTime);        
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