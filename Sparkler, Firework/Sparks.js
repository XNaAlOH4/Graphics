class vector {
  constructor(x=0,y=0,z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }
  set(vec) {
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
  }
}

class Spark {
  constructor(x,y,r) {
    this.pos = new vector(x,y);
    this.vel = new vector();
    this.acc = new vector();
    this.color = {r:255,g:255,b:255};
    this.life = 255;
    this.radius = r;
  }
  
  applyForce(F) {
    this.acc.set(F);
  }
  
  update(force) {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.applyForce(force)
  }
  
  show() {
    
  }
}
