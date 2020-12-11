public class QuadTree {
  private Vector pos;
  private int width, height, limit;
  private QuadTree[] quadrants;
  private Vector[] objects;
  private boolean divided = false;
      public QuadTree(Vector vec, int w, int h, int limit) {
        pos.set(vec);
        width = w;
        height = h;
        limit = limit;
      }

      public void contains(object) {
        return ((object.pos.x <= this.pos.x+this.width && object.pos.x >= this.pos.x-this.width) && 
       (object.pos.y <= this.pos.y+this.height && object.pos.y >= this.pos.y-this.height) && 
       (object.pos.z <= this.pos.z+this.depth && object.pos.z >= this.pos.z-this.depth));
      }

      public void subdivide() {
        for(let i = 0; i < (int) sqrt(grids); i++) {
          for(let j = 0; j < (int) sqrt(grids); j++) {
            quadrants.add(new QuadTree(
            new Vector(pos.x+j*width/sqrt(grids), this.pos.y+i*this.height/Math.sqrt(grids)),
            this.width/Math.sqrt(grids),this.height/Math.sqrt(grids),
            this.limit));
          }
        }
        divided = true;
      }

      insert(object) {
        if(!this.contains(object)){return false;}
        if(this.objects.length < this.limit) {
          this.objects.push(object);
          return true;
        }else {
          if(!this.divided) {
            this.subdivide();
          }
          for(let qt of this.quadrants) {if(qt.insert(object)){return true;};}
        }
      }

      public ArrayList<> query(range, found=[]) {
        if(!this.intersects(range)) {
          return;
        }else {
          for(let p of this.objects) {
            if(p.pos.dist(range.pos) < range.r+largest) {
              found.push(p);
            }
          }
          if(this.divided) {
            for(let i = 0; i < grids; i++) {
              this.quadrants[i].query(range, found);
            }
          }
        }
      }

      newCircle() {
        var rand = Math.floor(Math.random()*spots.length);
        var spot = spots[rand];
				spots.splice(rand,1);
//         var rand = Math.random();
//         var x, y, color;
//         switch(true) {
//           case rand <= 0.1:
//             x = Math.random()*canvas.width/2+canvas.width/2;
//             y = Math.random()*canvas.height/10+canvas.height/1.5;
//             // color="rgb(200,200,145)"
//             break;
//           case rand < 0.3:
//             x = Math.random()*canvas.width/4;
//             y = Math.random()*canvas.height/1.4+canvas.height/8;
//             // color="rgb(160,196,210)"
//             break;
//           case rand < 0.5:
//             x = Math.random()*canvas.width/2+canvas.width/3;
//             y = Math.random()*canvas.height/2+canvas.width/5;
//             // color="rgb(200,250,205)"
//             break;
//           case rand <= 0.7:
//             x = Math.random()*canvas.width*0.9+canvas.width/10;
//             y = Math.random()*canvas.height*0.9+canvas.width/10;
//             // color="rgb(80,150,190)"
//             break;
//           case rand < 0.8:
//             x = Math.random()*canvas.width*0.9+canvas.width/10;
//             y = Math.random()*canvas.height*0.9+canvas.width/10;
//             // color="rgb(190,110,55)"
//             break;
//           default:
//             x = Math.random()*canvas.width;
//             y = Math.random()*canvas.height;
//             // color="#D0ADE0"
//             break;
//         }
        var valid = true;
        let temp = new Circle(spot.x,spot.y);
        // temp.color = color;
        let points = [];
        this.query(temp,points);
        for(let c of points) {
          if(temp.pos.dist(c.pos) <= c.r) {
          	valid = false;
          	return 1;
          }
        }
        if(valid) {
          qt.insert(temp);
          return 0;
        }
      }

      show() {
      	if(qt.draw){
	      	ctx.strokeStyle = "white";
	      	ctx.beginPath();
	      	ctx.rect(this.pos.x,this.pos.y,this.width,this.height);
	      	ctx.stroke();
      	}
        for(let i of this.objects) {
          i.show();
        }
        for(let i of this.quadrants) {
          i.show();
        }
      }

      update() {
        for(let i of this.objects) {
          i.grow();
          i.update();
        }
        for(let i of this.quadrants) {
          i.update();
        }
      }

      intersects(object) {
        if(object.r != null) {
          return !(object.pos.x - object.r > this.x + this.width || object.pos.x + object.r < this.x - this.width || object.pos.y - object.r > this.y + this.height || object.pos.y + object.r < this.y - this.height)
        }
        // return (object.pos.x - object.width > this.pos.x + this.width && 
        //         object.pos.y - object.height < this.pos.y + this.height) || (object.pos.x + object.width < this.pos.x - this.width && 
        //         object.pos.y + object.height > this.pos.y - this.height)
      }
    }
