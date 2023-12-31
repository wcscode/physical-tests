
export function vec2(x, y) {    
    return {x, y};
}

export function addVec2(vector1, vector2) {
    return new vec2(vector1.x + vector2.x, vector1.y + vector2.y);
}

export function addVec2ByScalar(vector1, scalar) {
    return new vec2(vector1.x + scalar, vector1.y + scalar);
}

export function subVec2(vector1, vector2) {
    return new vec2(vector1.x - vector2.x, vector1.y - vector2.y);
}

export function mulVec2(vector1, vector2) {
    return new vec2(vector1.x * vector2.x, vector1.y * vector2.y);
}

export function mulVec2ByScalar(vector, scalar) {
    return new vec2(vector.x * scalar, vector.y * scalar);
}

export function mulXVec2ByScalar(vector, scalar) {
    return new vec2(vector.x * scalar, vector.y);
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

export function applyForce(obj, force) {
    obj.acceleration = divVec2ByScalar(force, obj.mass);   
    obj.velocity = addVec2(obj.velocity, obj.acceleration);
    obj.position = addVec2(obj.position, obj.velocity);
    obj.acceleration = mulVec2ByScalar(obj.acceleration, 0);
}

export function applyGravity(obj, force) {    
    obj.acceleration = addVec2(obj.acceleration, force);
    obj.velocity = addVec2(obj.velocity, obj.acceleration);
  //  obj.position = addVec2(obj.position, obj.velocity);
    obj.acceleration = mulVec2ByScalar(obj.acceleration, 0);
}

export function magnitude(obj) {
    return Math.sqrt(obj.x ** 2 + obj.y ** 2);
}

export function normalize(vector) {
    let mag = magnitude(vector);
    return vec2(vector.x / mag, vector.y / mag);
}

export function distanceBetweenCircles(obj1, obj2) {
    return subVec2(obj1.position, obj2.position);    
}

export function colliding(obj1, obj2) {
    let vecDistance = distanceBetweenCircles(obj1, obj2);
    return magnitude(vecDistance) <= obj1.radius + obj2.radius;
}

export function setEdgesToCircle(obj, canvas, bounceGround = true) {
    if (obj.position.x < obj.radius) {        
        obj.velocity = mulXVec2ByScalar(obj.velocity, -1);
        obj.position.x = obj.radius;
    }
    
    if(obj.position.x > canvas.width - obj.radius){
        
        obj.velocity = mulXVec2ByScalar(obj.velocity, -1);
        obj.position.x = canvas.width - obj.radius;
    }

    if (obj.position.y < obj.radius) {        
        obj.velocity.y *= -1;
        obj.position.y = obj.radius;            
    }

    if (obj.position.y > canvas.height - obj.radius) {
        if(bounceGround){
            obj.velocity.y *= -1;  
            obj.velocity.y  = Math.max(obj.velocity.y, -obj.maxSpeed);       
        }else{
            obj.velocity.y = 0;
        }

        obj.position.y = canvas.height - obj.radius; 
        //console.log(" " + (obj.position.y + obj.radius))
    }
    
}