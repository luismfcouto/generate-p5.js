let img;

let xAngle = 0;
let yAngle = 0;

let rangeDistance;
let rangeDensity;
let rangeSize;

let input;

let colorPicker;
let colorPickerBG;

function preload(){
    img = loadImage("venus.jpg");

}

function setup() {
  createCanvas(720, 720, WEBGL);
  img.resize(1080, 1080);
  camera(0, 0, 2500, 0, 0, 0, 0, 1, 0);
  
  colorPickerBG = createColorPicker('#ffffff');
  colorPickerBG.position(width + 75,130)
  
  colorPicker = createColorPicker('#000000');
  colorPicker.position(width,130);
  
  rangeDistance = createSlider(0, 1500, 0);
  rangeDistance.position(width,50);
  
  rangeDensity = createSlider(0, 200, 50);
  rangeDensity.position(width,70);
  
  rangeSize = createSlider(0.1, 2, 0.5, 0.1);
  rangeSize.position(width,90);
  
  input = createFileInput(handleFile);
  input.position(width,10);
}

function draw() {
  background(colorPickerBG.value());
  
  fill(colorPicker.value());
  noStroke();
  //let tiles = 50; //for better frames use <50, for better looks use >125
  let tiles = rangeDensity.value();
  
  orbitControl();
  
  let tileSize = img.width/tiles;
  
  push();
  
  //translate(width/2,height/2);
  //rotateY(radians(frameCount)); //allows tiles to rotate
  rotateX(xAngle);
  rotateY(yAngle);
  
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {
      let c = img.get(int(x*tileSize),int(y*tileSize));
      //fill(c); //keep fill if images have color
      let b = map(brightness(c),0,100,1,0);
      //let z = map(b,0,1,-400,400);
      let z = map(b,0,1,-rangeDistance.value(),rangeDistance.value());
      
      //fill(c); //remove if image has color
      
      push();
      translate(x*tileSize - width/2, y*tileSize - height/2, z);
      //sphere(tileSize*b*0.7); //tiles stroke
      sphere(tileSize*b*rangeSize.value());
      pop();

    }
  }
  pop();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

function keyPressed() {

  // If you hit the s key, save an image
  if (key == 's') {
    save("mySketch.jpg");
  }
  
  if (keyCode === 88) /* x-key*/ {
    // Align view with x-axis (look at y-z plane)
    xAngle = 0;
    yAngle = -PI/2;
  } else if (keyCode === 89) /* y-key*/ {
    xAngle = -PI/2;
    yAngle = 0;
  } else if (keyCode === 90) /* z-key*/{
    xAngle = 0;
    yAngle = 0;
  }
}