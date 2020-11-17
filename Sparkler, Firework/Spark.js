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
  mult(factor) {
    this.x = this.x * factor;
    this.y = this.y * factor;
    this.z = this.z * factor;
  }
  div(factor) {
    this.x = this.x / factor;
    this.y = this.y / factor;
    this.z = this.z / factor;
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
    this.applyForce(force);
  }
  
  show(ctx) {
    var org = JSON.parse(JSON.stringify(ctx.lineWidth));
    ctx.lineWidth = this.radius;
    ctx.beginPath();
    ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*PI);
    ctx.stroke();
    ctx.lineWidth = org;
  }
}

class Flame {
  constructor(x,y,rx,ry=0) {
    this.pos = new vector(x,y);
    this.vel = new vector();
    this.range = new vector(rx,ry);
    this.plasma = [];
    this.color = {r:255,g:255,b:255};
  }
  
  colorMap(mat) {
    let color = {r:255,g:255,b:255};
    return colour;
  }
  
  setRGB(r,g,b) {
    this.color.r = r;
    this.color.g = g;
    this.color.b = b;
  }
  
  mapColor(material) {
    this.color =  this.colorMap[material];
  }
  
  updateColor() {
     
  }
  
  blow(wind) {
    this.vel.set(wind);
  }
  
  update() {
    for(let i of this.plasma) {
      i.move();
    }
  }
  
  show() {
    for(let i of this.plasma) {
      i.show();
    }
  }
}

class Plasma {
  constructor(x,y) {
    this.pos = new vector(x,y);
    this.color = {r:255,g:255,b:255};
    this.alpha = 255;
  }
  
  move(field) {
    this.pos.add(field) 
  }
  
  show() {
    
  }
}
