let current = [];
let prev = [];
let w,h;

let img;

function preload(){

  img = loadImage("sky.jpg");

}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  w = width;
  h = height;
  
  //init our 2d arrays, one for current and one for previous
  for(let i = 0; i < w; i++){
    current[i] = [];
    prev[i] = [];
    for (let j =0; j < h; j++){  
    
      current[i][j] = 0;
      prev[i][j] = 0;
    
    }
  }
  
  current[w/2][h/2] = 255;
  
  
  
  image(img, 0 , 0);

}

function draw() {

 loadPixels();
  


    for(let x = 1; x < w-1; x++){
     for(let y = 1; y < h-1; y++){ 
    

      //let's put all that messy code in a seperate function
      current[x][y] = getPreviousAverage(x, y);
         

      let currentVal = current[x][y]; 
         
         
     let thisPix = (x + y * w) * 4;
       
     pixels[thisPix] = pixels[thisPix] + currentVal*2;
       pixels[thisPix+1] = pixels[thisPix+1] + currentVal*3;
       pixels[thisPix+2] = pixels[thisPix+2] + currentVal/5;
    // pixels[thisPix+1] = currentVal * 255;
    // pixels[thisPix+2] = currentVal * 255;
     pixels[thisPix+3] = 255;
   }
  }
  
  updatePixels();
  
  //swap the buffers
  let temp = prev;
  prev = current;
  current = temp;
  
  
}



 function getPreviousAverage(_x, _y){

       let left = _x - 1;
       let right = _x + 1;
       let above = _y-1;
       let below = _y + 1;

     
      let avg = (prev[left][_y] +
                prev[right][_y] +
                prev[_x][above] +
                prev[_x][below] +
                prev[left][above] +
                prev[left][below] +
                prev[right][above] +
                prev[right][below])/4 - (current[_x][_y]);


  
     return avg

 }