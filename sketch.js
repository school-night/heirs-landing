// MADEBYHEIRS spinning box by zeke wattles
// site by zeke wattles + ali torbati
// zeke.studio
// alitorbati.com
// 2023

let angle = 0;
let typeImg;
let unitSize = 300;
let canvas;

function preload() {
  typeImg = loadImage("mbh_2048.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);
}

function draw() {
  if (mouseX === 0 && mouseY === 0) return false;

  background(0);
  unitSize = map(mouseX, 0, width, 200, width);
  angle += 0.01;

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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
