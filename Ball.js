import Moveable2d from "./Moveable2d.js";

export default class Ball extends Moveable2d{
    
    constructor(ctx, x, y, radius) {
        super(x, y, radius);
        this.ctx = ctx;
        this.radius = radius; 
        this.maxSpeed = 5;             
    }
       
    update(deltaDime){ 
        // this.velocity.y = Math.max(this.velocity.y, -this.maxSpeed);        
        // this.velocity.x = Math.max(this.velocity.x, -this.maxSpeed);  
        //this.velocity.x = this.velocity.x * (1 + deltaTime);
        //this.velocity.y = this.velocity.y * (1 + deltaTime);
         this.addVec2(this.position, this.velocity);
    }

    show(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "white";
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }              
}