// MADEBYHEIRS spinning box by zeke wattles
// site by zeke wattles + ali torbati
// zeke.studio
// alitorbati.com
// 2023

let angle = 0;
let typeImg;
let unitSize = 300;
let canvas;
let activityDetected = false;

function preload() {
  typeImg = loadImage("mbh_2048.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  pixelDensity(1);
}

function draw() {
  background(0);
  noStroke();
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  if (activityDetected == false) {
    push();
    translate(0, 0, -width);
    texture(typeImg);
    box(width/2);
    pop();
  }

  if (activityDetected == true) {
    for (let x = -width / 2; x <= width / 2; x += unitSize) {
      for (let y = -height / 2; y <= height / 2; y += unitSize) {
        push();
        translate(x, y, 0);
        rotateX(angle);
        rotateY(angle * 1.3);
        rotateZ(angle * 0.7);
        texture(typeImg);
        box(unitSize);
        pop();
      }
    }

    unitSize = map(mouseX, 0, width, 100, width);
    angle += 0.01;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
  if (activityDetected == false) {
    activityDetected = true;
  }
}
