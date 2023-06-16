export function vec2(x, y) {    
    return {x, y};
}

export function addVec2(vector1, vector2) {
    return new vec2(vector1.x + vector2.x, vector1.y + vector2.y);
}

export function addVe2ByScalar(vector1, scalar) {
    return new vec2(vector1.x + scalar, vector1.y + scalar);
}

export function subVec2(vector1, vector2) {
    return new vec2(vector1.x - vector2.x, vector1.y - vector2.y);
}

export function mulVec2(vector1, vector2) {
    return new vec2(vector1.x * vector2.x, vector1.y * vector2.y);
}

export function mulVec2ByScalar(vector1, scalar) {
    return new vec2(vector1.x * scalar, vector1.y * scalar);
}

export function mulXVec2ByScalar(vector1, scalar) {
    return new vec2(vector1.x * scalar, vector1.y);
}

export function mulYVec2ByScalar(vector1, scalar) {
    return new vec2(vector1.x, vector1.y * scalar);
}

export function divVec2ByScalar(vector1, scalar) {
    return new vec2(vector1.x / scalar, vector1.y / scalar);
}

export function print(ctx, text, x, y) {
    ctx.fillText(text, x, y);    
}

export function moveableCircleFactory(x, y, radius) {    
    return {
        position: vec2(x, y),
        acceleration: vec2(0, 0),
        velocity: vec2(0, 0), 
        radius: radius,
        mass: radius,
        update: function(deltaTime){ 
            console.log(deltaTime)
            //this.velocity = addVe2ByScalar(this.velocity, deltaTime);         
        },
        show: function(ctx){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        }                     
    }
}

export function applyForce(obj, force) {
    obj.acceleration = divVec2ByScalar(force, obj.mass);
   // obj.acceleration = addVec2(obj.acceleration, force);
    obj.velocity = addVec2(obj.velocity, obj.acceleration);
    obj.position = addVec2(obj.position, obj.velocity);
    obj.acceleration = mulVec2ByScalar(obj.acceleration, 0);
}

export function applyGravity(obj, force) {    
    obj.acceleration = addVec2(obj.acceleration, force);
    obj.velocity = addVec2(obj.velocity, obj.acceleration);
    obj.position = addVec2(obj.position, obj.velocity);
    obj.acceleration = mulVec2ByScalar(obj.acceleration, 0);
}

export function setEdgesToCircle(obj, canvas) {
    if (obj.position.x < obj.radius) {
        obj.velocity = mulXVec2ByScalar(obj.velocity, -1);
        obj.position.x = obj.radius;
    }
    
    if(obj.position.x > canvas.width - obj.radius){
        obj.velocity = mulXVec2ByScalar(obj.velocity, -1);
        obj.position.x = canvas.width - obj.radius;
    }

    if (obj.position.y < obj.radius) {
        obj.velocity = mulYVec2ByScalar(obj.velocity, -1); 
        obj.position.y = obj.radius;            
    }

    if (obj.position.y > canvas.height - obj.radius) {
        obj.velocity = mulYVec2ByScalar(obj.velocity, -1);
        obj.position.y = canvas.height - obj.radius; 
    }
    
}