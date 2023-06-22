import Ball from "./Ball.js";
import * as f from "./functions.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const gravity = f.vec2(0, .2);
const wind = f.vec2(1, 0); 
let balls = [];

for(let i = 0; i < 2; i++) 
    balls.push(new  Ball(ctx, Math.random() * canvas.width, 200, Math.random() * 25 + 5));


let deltaTime = 0; 
let lastTick = 0;
let clicked = false;
let colliding = false;

function animate(tick) {

    deltaTime = (tick - lastTick) / 1000;
    lastTick = tick;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    if(f.colliding(balls[0], balls[1]))
        colliding = true;    

        if(colliding)
        {            
            const mass1 = balls[0].mass;
            const mass2 = balls[1].mass;
            const mTotal = mass1 + mass2;
            const v1 = balls[0].velocity.x;
            const v2 = balls[1].velocity.x;
            const vTotal = v1 + v2;
            const momentum1 = mass1 * v1;
            const momentum2 = mass2 * v2;
            const momentumTotal = momentum1 + momentum2;
            const vf1 = (momentumTotal - (mass2 * vTotal)) / mTotal;
            const vf2 = (momentumTotal + (mass1 * vTotal)) / mTotal;
            balls[0].mulVec2ByScalar(balls[0].velocity, -1);
            balls[1].mulVec2ByScalar(balls[1].velocity, -1);
           // balls[0].applyForce(f.vec2(vf2, 0));
          //  balls[1].applyForce(f.vec2(vf1, 0));
            //let force = f.mulVec2ByScalar(balls[i].velocity, -1);
           // f.applyForce(balls[i], force);

        //  console.log(momentumTotal)
            colliding = false;
        } 

    for(let i = 0; i < balls.length; i++) {

        f.print(ctx,  `mass: ${balls[i].mass.toFixed(2)}`, i * 100 + 10, 20);
        f.print(ctx,  `vel: x: ${balls[i].velocity.x.toFixed(2)}    y: ${balls[i].velocity.y.toFixed(2)}`, i * 100 + 10, 40);

        if(clicked)            
            balls[i].applyForce(wind);    
                         
        balls[i].applyGravity(gravity);
        f.setEdgesToCircle(balls[i], canvas,false);
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