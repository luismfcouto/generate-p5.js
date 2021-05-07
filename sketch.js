let img;

let xAngle = 0;
let yAngle = 0;

let rangeDistance;
let rangeDensity;
let rangeSize;

let input;

let colorPicker;
let colorPickerBG;

let buttonJ;
let buttonP;

let buttonR;
let buttonNR;

let buttonC;

let shouldRotate = false;
let shouldColour = false;

function preload(){
    img = loadImage("venus.jpg");
}

function setup() {
  var canvas = createCanvas(1320,800, WEBGL);
  canvas.parent('canvas-container');
  img.resize(1320, 1320);
  camera(0, 0, 2000, 0, 0, 0, 0, 1, 0);
  
  col = color(1,118,253);
  
  input = document.getElementById("file-input");
  input.addEventListener("change", handleFiles, false);
  
  buttonJ = select("#jpeg-box");
  buttonJ.position(1531,750);
  buttonJ.mousePressed(saveJPEG);
  
  buttonP = select("#png-box");
  buttonP.position(1741,750);
  buttonP.mousePressed(savePNG);
  
  buttonR = select("#on");
  buttonNR = select("#off");
  buttonNR.style('background', col);
  buttonR.mousePressed(rotateOn);
  buttonNR.mousePressed(rotateOff);
  
  buttonC=select("#img-colour");
  buttonC.mousePressed(toggleColor);

  //colorPickerBG = createColorPicker('#ffffff');
  colorPickerBG = select("#control-picker-bg")
  //colorPickerBG.position(width + 75,130)
  
  //colorPicker = createColorPicker('#000000');
  colorPicker = select("#control-picker");
  //colorPicker.position(width,130);
  
  //rangeDistance = createSlider(0, 1500, 0);
  rangeDistance = select("#range-distance");
  //rangeDistance.position(width,50);
  
  //rangeDensity = createSlider(0, 200, 50);
  rangeDensity = select("#range-density");
  //rangeDensity.position(width,70);
  
  //rangeSize = createSlider(0.1, 2, 0.5, 0.1);
  rangeSize = select("#range-size");
  //rangeSize.position(width,90);
  
  //input = createFileInput(handleFile);
  input = select("#file-input");
  //input.position(width,10);
}

function rotateOn() {
  shouldRotate = true;
  buttonR.style('background-color', color(1,118,253));
  buttonNR.style('background-color', color(23,23,23));
}

function rotateOff() {
  shouldRotate = false;
  buttonR.style('background-color', color(23,23,23));
  buttonNR.style('background-color', color(1,118,253));
}

function toggleColor(){
    if(shouldColour == true){
    shouldColour = false;
    buttonC.style('background-color', color(23,23,23));
  }else if ( shouldColour == false){
    shouldColour = true;
    buttonC.style('background-color', color(1,118,253));
  }
}

function draw() {
  
  if(shouldRotate){
    rotateY(radians(frameCount));
  }
  
  background(colorPickerBG.value());
  fill(colorPicker.value());
  noStroke();
  
  //let tiles = 50; //for better frames use <50, for better looks use >125
  let tiles = rangeDensity.value();
  orbitControl();
  let tileSize = img.width/tiles;
  push();
  
  //rotateY(radians(frameCount)); //allows tiles to rotate
  
  rotateX(xAngle);
  rotateY(yAngle);
  
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {
      let c = img.get(int(x*tileSize),int(y*tileSize));
      
      if (shouldColour){
        fill(c); //keep fill if images have color
      }
      
      let b = map(brightness(c),0,100,1,0);
      //let z = map(b,0,1,-400,400);
      let z = map(b,0,1,-rangeDistance.value(),rangeDistance.value());
      
      push();
      translate(x*tileSize - width/2, y*tileSize - height/2, z);
      //sphere(tileSize*b*0.7); //tiles stroke
      sphere(tileSize*b*rangeSize.value());
      pop();

    }
  }
  pop();
}

function keyPressed() {
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

function saveJPEG() {
  save("mySketch.jpeg");
}

function savePNG() {
  save("mySketch.png");
}

function handleFiles() {
  const fileList = this.files; /* now you can work with the file list */
  const file = fileList[0]
  console.log(file)

  var reader = new FileReader();

  reader.onload = function(e) {
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      img = loadImage(e.target.result, '');
      //img.hide();
    } else {
      img = null;
      print('hello')
    }
  }

  reader.readAsDataURL(file);
}