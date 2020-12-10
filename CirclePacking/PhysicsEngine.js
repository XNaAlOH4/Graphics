function modular(x, mod) {
  return x < 0? (x+mod)%mod: x%mod;
}

function sign(x){return x<0? -1:1}

function getPrimes(start=2, limit=null) {
  let primes = [];
  if(limit == null) {
    for(let i = 2; i < Math.floor(start); i++) {
      if(long_isPrime(i)) {
        primes.push(i);
      }
    }
  }else {
    for(let i = start; i < Math.floor(limit); i++) {
      if(long_isPrime(i)) {
        primes.push(i);
      }
    }
  }
  return primes;
}

function long_isPrime(x) {
  if(x == 2|| x == 3) {
    return true;
  }else if(x==0 || x==1){
    return false;
  }
  for(let i = 2; i <= Math.floor(Math.sqrt(x)); i++) {
    if(x%i == 0) {
      return false;
    }
  }
  return true;
}

function getPrimeFactors(x, opp=false) {
  if(long_isPrime(x)) {
    let temp = {};
    temp[x] = 1;
    return temp;
  }
  let PFactors = {};
  let small_primes;
  if(opp) {
    small_primes = getPrimes(Math.sqrt(x), x);
  }else {
    small_primes = getPrimes(Math.sqrt(x));
  }
  let temp = x;
  for(let i of small_primes) {
    // Use logarithm to account for the powers 999 % 3 && 3^2 == 0 
    if(x%i == 0) {
      PFactors[i] = 1;
      for(let j = 2; j < Math.floor(Math.log(x,i)); j++) {
        if(x%Math.pow(i,j) == 0) {
          PFactors[i] = j;
        }else {
          temp = temp/Math.pow(i,j-1);
          break;}
      }
    }
  }
  switch(true) {
      case long_isPrime(temp):
        PFactors[temp] = 1;
        break;
      case temp == 1:
        break;
      default:
        let tem = getPrimeFactors(temp, true);
        Object.keys(tem).forEach(function(key) {
          PFactors[key] = tem[key];
        });
        break;
    }
  return PFactors;
}

function LCM(x,y,xIntoy=false) {
  let PrimeX = getPrimeFactors(x);
  let PrimeY = getPrimeFactors(y);
  let lcm = 1;
  let lcm_2 = 1;
  // find all common primes
  Object.keys(PrimeX).forEach(function(key) {
    lcm *= Math.pow(key,PrimeY[key] > PrimeX[key]? PrimeY[key]:PrimeX[key]);
    delete PrimeY[key];
  });
  Object.keys(PrimeY).forEach(function(key) {
    lcm_2 *= Math.pow(key,PrimeY[key]);
    lcm *= Math.pow(key,PrimeY[key]);
  });
  if(xIntoy){return lcm_2;}
  return lcm;
}

function HCF(x,y=null) {
  var fac = 1;
  if(y == null) {
    let Primes = [];
    for(let i of x) {
      Primes.push(getPrimeFactors(i));
    }

  }else {
    let PrimeX = getPrimeFactors(x);
    let PrimeY = getPrimeFactors(y);
    Object.keys(PrimeX).forEach(function(key) {
      if(key in PrimeY) {
        if(PrimeX[key] < PrimeY[key]){
          fac *= Math.pow(key,PrimeX[key]);
        }else {
          fac += Math.pow(key,PrimeY[key]);
        }
      }
    });
  }
  return fac;
}

function range(start, stop=null) {
  var list = [];
  if(stop == null) {
    for(let i = 0; i < start; i++) {
      list.push(i);
    }
    return list;
  }
  for(let i = start; i < stop; i++) {
    list.push(i);
  }
  return list;
}

function isIter(obj) {
  // checks for null and undefined
  switch(true) {
    case obj == null:
      return false;
    case obj[0] == null:
      return false;
    default:
      return typeof obj[Symbol.iterator] === 'function';
  }
}

class SortingHandler {
  constructor(data) {
  	this.dlist = data;
  }

  sort() {
  	var len = this.dlist.length;
  	switch(true) {
  	  case len < 25:
  	  	this.bubble(len);
  	    break;
  	  case len < 2500:
  	    this.quick(this.decide_partition());
  	    break;
  	  case len < 10000:
  	    this.radix(len);
  	    break;
  	}
  }

  async swap(array, data1, data2) {
  	let temp = JSON.parse(JSON.stringify(array[data1]));
  	array[data1] = array[data2];
  	array[data2] = temp;
  }

  bubble(len) {
  	for(let i = 0; i < len-1; i++) {
  	  for(let j = 0; j < len-i-1; j++) {// Loop through every element in data
  	    if(this.dlist[j] > this.dlist[j+1]) {
  	  	  swap(this.dlist, j, j+1);
  	    }
  	  }
  	}
  }

  async Lomuto_partition(array, start, end) {
  	let pivot = array[end];
  	for(let i = start; i < end; i++) {
  	  if(array[i] < pivot) {
  	  	await this.swap(array, start, i);
  	  	start += 1;
  	  }
  	}
  	await this.swap(array, start, end);
  	return start;
  }

  async Hoare_partition(array, start, end) {
  	const pivot = array[Math.floor((start+end)/2)];
  	while(true){// loop forever
  	  while(array[i] < pivot) {
  	  	start += 1;
  	  }
  	  while(array[j] > pivot) {
  	  	end -= 1;
  	  }
	  if(start >= end) {
	  	return end;
	  }
	  await this.swap(array, start, end);
  	}
  }

  decide_partition() {
  	return false;
  }

  async quick(array=this.dlist, start=0, end=this.dlist.length, lomuto=true) {
  	if(start >= end) {
  	  return;
  	}
  	
  	if(lomuto) {
  	  const index = await this.Lomuto_partition(array, start, end);
  	  await Promise.all([
	  	this.quick(array, start, index-1),
	  	this.quick(array, index+1, end)
	  ]);
  	}else {
  	  const index = await this.Hoare_partition(array, start, end);
  	  await Promise.all([
	  	this.quick(array, start, index, false),
	  	this.quick(array, index+1, end, false)
	  ]);
  	}
  }
}

class Vector {
  constructor(x=0,y=0,z=0) {
  	this.x = x;
  	this.y = y;
  	this.z = z;
    this.type = "Vector";
  	if(isIter(x)){this.set(x);}
  }

  getAngle(other) {
    if(this.z != 0 || other.z != 0) {
      return null;
    }else {
      // The angle to rotate from this to other
      let dy = this.y-other.y, dx = this.x-other.x;
      if(dy >= 0 ) {
        if(dx >= 0) {
          return Math.atan(dy/dx);
        }else {
          return Math.PI + Math.atan(dy/dx);
        }
      }else {
        if(dx >= 0) {
          return Math.atan(dy/dx);
        }else {
          return -(Math.PI+Math.atan(dy/dx));
        }
      }
    }
  }

  add(vec,y=0,z=0) {
    switch(vec.x) {
      case null:
        this.x += vec;
        this.y += y;
        this.z += z;
        break;
      case undefined:
        this.x += vec;
        this.y += y;
        this.z += z;
        break;
      default:
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        break;
    }
  }

  sub(vec,y=0,z=0) {
    switch(vec.x) {
      case null:
        this.x -= vec;
        this.y -= y;
        this.z -= z;
        return new Vector(this.x-vec,this.y-y,this.z-z);
      case undefined:
        this.x -= vec;
        this.y -= y;
        this.z -= z;
        return new Vector(this.x-vec,this.y-y,this.z-z);
      default:
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return new Vector(this.x-vec.x,this.y-vec.y,this.z-vec.z);
    }
  }

  mult(factor) {
    switch(factor.x) {
      case null:
        this.x = this.x * factor;
        this.y = this.y * factor;
        this.z = this.z * factor;
        break;
      case undefined:
        this.x = this.x * factor;
        this.y = this.y * factor;
        this.z = this.z * factor;
        break;
      default:
        this.x = this.x * factor.x;
        this.y = this.y * factor.y;
        this.z = this.z * factor.z;
        break;
    }
  }
  div(factor) {
    this.x = this.x / factor;
    this.y = this.y / factor;
    this.z = this.z / factor;
  }

  dot(vec) {
    let nVec = vec.copy();
    nVec.mult(this.mag());
    return nVec;
  }

  unit() {
    let x = this.x/this.mag();
    let y = this.y/this.mag();
    let z = this.z/this.mag();
    return new Vector(x,y,z);
  }

  mag() {
    return(Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z))
  }

  dist(vec, y=0, z=0) {
    if(vec.x == null || vec.x == undefined) {
      let X = vec - this.x;
      let Y = y - this.y;
      let Z = z - this.z;
      return(Math.sqrt(X*X + Y*Y + Z*Z))
    }
    let X = vec.x - this.x;
    let Y = vec.y - this.y;
    let Z = vec.z - this.z;
    return(Math.sqrt(X*X + Y*Y + Z*Z))
  }

  set(x,y,z) {
  	switch(isIter(x)) {
  	  case true:
  	    this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        break;
      case false:
        this.x = x;
        this.y = y;
        this.z = z;
        break;
  	}
  }

  same(vec) {
    return this.x == vec.x && this.y == vec.y && this.z == vec.z;
  }

  copy(){
    return new Vector(this.x,this.y,this.z);
  }
}

class Line {
  constructor(pos, dir) {
    // point on line = (pos) + λ(dir)
    this.pos = pos? pos:new Vector();
    this.dir = dir? dir:new Vector(1,1,1);
    this.type = "Line";
  }

  angle(line, acute=true) {
    // line objects cannot check angle between itself and plane
    let top = this.dir.dot(line.dir);
    let bottom = this.dir.mag()* line.dir.mag();
    return acute? Math.acos(top/bottom) : Math.PI-Math.acos(top/bottom);
  }

  intersect(line) {
    //make the simultaneous equations

    // let matrix = [[this.dir.x, line.dir.x],
    // [this.dir.y, line.dir.y],[this.dir.z, line.dir.z]];
    // let ans = line.pos.copy();
    // ans.sub(this.pos);
    // let solver = new Simul_Eqn(matrix, ans);
    // return solver.solve();

    let matrix = new Matrix([[-line.dir.y, line.dir.x],[-this.dir.y,this.dir.x]]);
    matrix.multRows(1/matrix.determinant());
    let ans = new Matrix([[line.pos.x-this.pos.x],[line.pos.y-this.pos.y]])
    let result = matrix.mult(ans);
    if(this.dir.z*result.rows[0] - line.dir.z*result.rows[1] == line.pos.z - this.pos.z) {
      return new Vector(this.pos.x + this.dir.x*result.rows[0],
        this.pos.y + this.dir.y*result.rows[0],
        this.pos.z + this.dir.z*result.rows[0]);
    }
    return null;
  }

  onLine(point) {
    let x = (point.x - this.pos.x) / this.dir.x;
    let y = (point.y - this.pos.y) / this.dir.y;
    let z = (point.z - this.pos.z) / this.dir.z;
    return (x == y) && (x == z);
  }

  footOfPerp(vec) {
    // PN * dir = (ON - OP) * dir = 0
    // ON = line
    let temp = vec.copy();
    temp.sub(this.pos);
    temp.mult(this.dir);
    let matrix =[[this.dir.x*this.dir.x, temp.x],
    [this.dir.y*this.dir.y, temp.y],
    [this.dir.z*this.dir.z, temp.z]];
    let solver = new Simul_Eqn([matrix],[0,0,0]);

    return solver.solve();
  }

  //dir = λ(x,y,z)

  perpDist() {

  }

}

class Plane {
  constructor(n, val) {
    // r = λ(pos) + μ(dir)
    // r * (n) = val
    this.n = n;
    this.val = val;
    this.type = "Plane";
  }

  getAngle(obj) {
    switch(obj.type) {
      case 'Line':

        break;
    }
  }
}

class Physics_Engine {
  constructor(pos, vel, acc) {
    this.pos = pos? pos:new Vector();
    this.vel = vel? vel:new Vector();
    this.acc = acc? acc:new Vector();
    this.enum = {pos:'pos',vel:'vel',acc:'acc'}
  }

  airRes() {
    //NO one really knows what the formula is
  }

  update(force=new Vector()) {
    this.acc.set(force.x,force.y,force.z);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  restrictMotion(plane) {

  }
}

class Matrix {
  constructor(width=0, height=null, initial=0) {
    // row (left to right)
    // column (top to bottom) 
    this.rows = [];
    switch(height) {
      case null:
        this.setAll(width);
        this.height = width.length;
        this.width = width[0].length == null? 1: width[0].length;
        break;
      default:
        this.width = width;
        this.height = height;
        this.construct(initial);
        break;
    }
    this.square = (this.width == this.height);
  }

  construct(num) {
    for(let y = 0; y < this.height; y++) {
      // add arrays from top to bottom
      this.rows.push([]);
      for(let x = 0; x < this.width; x++) {
        //add values from left to right
        this.rows[y][x] = num;
      }
    }
  }

  set(row, values) {
    this.rows[row] = isIter(values)? [...values]:values;
  }

  setAll(values) {
      values.forEach((row, index) => {
        this.rows[index] = isIter(row)? [... row]:row;
      });
    //this.rows.forEach((row,index, array) => {array[index] = values[index]});
  }

  addRow(values, rowIndex=null) {
    let iterable = isIter(values[0]);
  	switch(rowIndex) {
  	  case null:// Add the values to every row
        if(iterable) {
  	      for(let row in this.rows) {
            values[row].forEach(function(val,i){this.rows[row][i] += val;});
          }
        }else {
          for(let row in this.rows) {
            this.rows[row] += values[row];
          }
        }
  	    break;
  	  default:// Add the values to a specific row
        if(iterable) {
          for(let i in this.rows[rowIndex]) {
            this.rows[rowIndex][i] += values[i];
          }
        }else {
          for(let i of this.rows[rowIndex]) {
            i += values;
          }
        }
  	    break;
  	}
  }

  subRow(values, rowIndex=null) {
    let iterable = isIter(values[0]);
    switch(rowIndex) {
      case null:// Add the values to every row
        if(iterable) {
          for(let row in this.rows) {
            for(let i in this.rows[row]) {
              this.rows[row][i] -= values[i];
            }
          }
        }else {
          for(let row in this.rows) {
            this.rows[row] -= values[row];
          }
        }
        break;
      default:// Add the values to a specific row
        if(iterable) {
          for(let i in this.rows[rowIndex]) {
            this.rows[rowIndex][i] -= values[i];
          }
        }else {
          for(let i in this.rows[rowIndex]) {
            this.rows[rowIndex][i] -= values[i];
          }
        }
        break;
    }
  }

  multRow(row_, factor) {
    if(this.width == 1) {
      this.rows[row_] *= factor;
    }else {
      for(let i in this.rows[row_]) {
        this.rows[row_][i] *= factor;
      }
    }
  }

  multRows(factor) {
    for(let row in this.rows) {
      this.multRow(row,factor);
    }
  }

  listBlanks() {
    let blanks = [];
    this.rows.forEach((row,index) => {
      let dict = [];
      row.forEach((num,index) => {
        if(num == 0) {dict.push(index);}
      });
      blanks.push(dict);
    });
    return blanks;
  }

  swapRow(index1, index2) {
    let copy = this.rows[index1];
    this.rows[index1] = this.rows[index2];
    this.rows[index2] = copy;
  }

  getRow(row=0, exclude=null) {
    return this.exclude(this.rows[row].slice(), exclude);
  }

  getColumn(column=0, exclude=null) {
    let columns = [];
    this.rows.forEach(array => {columns.push(array[column])});
    return columns;
  }

  exclude(array, column=0) {
    if(column == null) {
      return array;
    }
    let copy = [...array];
    // console.log(copy, this.width);
    copy.splice(column,1);
    return copy;
  }

  mult(mat) {
    let rows = [];
    for(let i in mat.rows[0]) {
      let column = mat.getColumn(i);
      for(let j in this.rows) {
        let sum = 0;
        for(let k in j) {
          sum += (this.rows[j][k]*column[k]);
        }
        rows.push([sum]);
      }
    }
    return new Matrix(rows);
  }

  identity() {
    if(!this.square) {
      console.log("Not square bro");
      return null;
    }
    let I = new Matrix(this.height, this.width);
    for(let i = 0; i < this.height; i++) {
      I.rows[i][i] = 1;
    }
    return I;
  }

  determinant() {
    // If matrix is 1 x 1
    if(this.width < 2) {
      return this.rows[0][0];
    }
    // Get Determinant of 2 x 2 Matrix
    return this.rows[0][0]*this.rows[1][1] - this.rows[1][0]*this.rows[0][1];
  }

  isDegenerate() {
    // I could've been smarter about this because truthiness is a thing
    // Meaning anything that is not 0, null or undefined is true 
    return this.determinant();
  }

  lapExp() {// get determinant using Laplace Expansion
    //this is tedious as shit lol
    if(this.square) {
      if(this.width == 2) {
        return this.determinant();
      }
      var matrices = [];
      for(let i in this.rows[0]) {
        matrices.push(new Matrix(this.width-1, this.height-1));
        for(let j = 1; j < this.height; j++) {
          matrices[i].set(j-1, this.getRow(j, i));
        }
      }
      var determinant = 0;
      var even_odd = {0:1,1:-1}
      matrices.forEach((matrix,index) => {
        determinant += even_odd[index%2]*this.rows[0][index]*matrix.lapExp();
      });
      return determinant;
    }else {console.log("Not a square lol");return null;}
  }

  inverse() {// inverse using row reduced echelon form
    // First, check if determinant is 0
    let det = this.lapExp();
    if(det == 0) {
      return;
    }
    // Then make sure the top-left is not 0
    let blanks = this.listBlanks();
    if(0 in blanks[0]) {
      
    }
    let temp = this.copy();
    // [A] [B] [C] | [1] [0] [0]
    // [D] [E] [F] | [0] [1] [0]
    // [G] [H] [I] | [0] [0] [1]
    let I = this.identity();
    // finish off all the bottoms first

    //Make first row 1
    temp.multRow(0, 1/temp.rows[0][0]);
    for(let i = 1; i < this.height; i++) {
      let a = new Matrix([temp.getRow()]);
      a.multRow(0,temp.rows[i][0]);
      temp.subRow(a.getRow(),i);
    }
    for(let i = 2; i < this.height; i++) {
      let a = new Matrix([temp.getRow(1)]);
      //[0, -3, -4, -2]
      let temp_1 = sign(temp.rows[i][1])*LCM(Math.abs(a.rows[0][1]),Math.abs(temp.rows[i][1]),true);
      let temp_2 = sign(a.rows[0][1])*LCM(Math.abs(temp.rows[i][1]),Math.abs(a.rows[0][1]),true);
      a.multRow(0,temp_1);
      temp.multRow(i,temp_2);
      temp.subRow(a.getRow(),i);
    }
    let a = new Matrix([temp.getRow(2)]);
    let temp_1 = sign(temp.rows[3][2])*LCM(Math.abs(a.rows[0][2]),Math.abs(temp.rows[3][2]),true);
    let temp_2 = sign(a.rows[0][2])*LCM(Math.abs(temp.rows[3][2]),Math.abs(a.rows[0][2]),true);
    a.multRow(0,temp_1);
    temp.multRow(3,temp_2);
    temp.subRow(a.getRow(),3);
    
    // Simplify everything
    // for(let i = 0; i < this.height; i++) {
    //   temp.multRow(i,1/HCF(temp.getRow));
    // }
    temp.print();
    return temp;
    //return I;
  }

  solve(ans) {

  }

  transpose() {
    let rows = [];
    for(let i = 0; i < this.height; i++) {
      rows.push(this.getColumn(i));
    }
    let A = new Matrix(this.height, this.width);
    A.setAll(rows);
    return A;
  }

  CrissCross() {// Getting Area of a polygon
    let positives = 0, negatives = 0;

    for(let i = 0; i < this.width; i++) {
      let multiple_1 = 1, multiple_2 = 1;
      for(let j = 0; j < this.height; j++) {
        multiple_1 *= this.rows[j][(i+j)%3];
        multiple_2 *= this.rows[j][modular(i-j,3)];
      }
      positives += multiple_1;
      negatives += multiple_2;
    }
    return positives-negatives;
  }

  eigenVec() {

  }

  eigenVal() {

  }

  print() {
    // column.forEach(
    console.table(this.rows);
  }

  copy() {
    // let rows = [... this.rows];
    let copy = new Matrix(this.width, this.height);
    copy.setAll([... this.rows]);
    return copy;
  }
}

class Simul_Eqn {
  constructor(matrix, ans) {
    this.matrix = new Matrix(matrix);
    this.ans = new Matrix(ans)
  }

  solve() {
    // First, sort the rows such that all the numbers in the 
    // top-left to bottom-right diagonal are not 0
    let temp = this.matrix.giveSort();
    // [A] [B] [C] | [1] [0] [0]
    // [D] [E] [F] | [0] [1] [0]
    // [G] [H] [I] | [0] [0] [1]
    for(let j = 0; j < this.width; j++) {
      temp.multRow(j, 1/temp.row[j][j]); this.ans.multRow(j, 1/temp.row[j][j]);
      for(let i = 0; i < this.height-1; i++) {
        let temp_row = temp.getRow(i).slice(); let temp_2row = this.ans.getRow(i).slice();
        temp_row.multRow(i, temp.rows[i+1][j]); temp_2row.multRow(i, this.ans.rows[i+1][j]);
        temp.addRow(temp_row); this.ans.addRow(temp_2row);
      }
    }
    console.log(temp);
    return this.ans;
  }
}