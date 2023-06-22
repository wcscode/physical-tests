import  * as f  from "./functions.js";

export default class Moveable2d {
    constructor(x, y, mass) {
        this.position = f.vec2(x, y);  
        this.acceleration = f.vec2(0, 0);   
        this.velocity = f.vec2(0,0); 
        this.mass = mass            
    }
    applyForce(force) {
        this.acceleration = f.divVec2ByScalar(force, this.mass);   
        this.addVec2(this.velocity, this.acceleration);
       // this.addVec2(this.position, this.velocity);
        this.mulVec2ByScalar(this.acceleration, 0);
    }

    applyGravity(force) {            
        this.addVec2(this.acceleration, force);
        this.addVec2(this.velocity, this.acceleration);
      //  obj.position = addVec2(obj.position, obj.velocity);
        this.mulVec2ByScalar(this.acceleration, 0);
    }
    addVec2(vector1, vector2) {
        vector1.x += vector2.x; 
        vector1.y += vector2.y;
    }
    mulVec2ByScalar(vector, scalar) {
        vector.x *= scalar; 
        vector.y *= scalar; 
    }
    
}