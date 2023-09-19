let canvas;
let mic;

let font;
let fontMono;
let word = "                                                  MADE BY HEIRS                                                  ";

let points;
let bounds;

let ptSize;

let bg;

let volume = 0;

function preload() {
  font = loadFont("HaasGrotDisp-75Bold.otf");
  fontMono = loadFont("FragmentMono-Regular.ttf");
}

function setup() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  getAudioContext().suspend();

  mic = new p5.AudioIn();
  mic.start();

  pts = font.textToPoints(word, 0, 0, 10, {
    sampleFactor: 1.5,
    simplifyThreshold: 0,
  });

  bounds = font.textBounds(word, 0, 0, 10);
}

function draw() {
  background(0);

  // prompt for input
  fill(255);
  textFont(fontMono);
  textSize(10);
  textAlign(CENTER, CENTER);
  if (getAudioContext().state !== "running") {
    text("CLICK OR TAP TO START MIC", width / 2, height / 8);
  }

  // let level = mic.getLevel();

  let sensitivity = 10.0; 
  let v = mic.getLevel() * sensitivity;
  v = min(v, 1.0); 
  
  // Get the overall volume (between 0.0 and 1.0).
  // Smooth the volume variable with a running average
  volume = 0.5 * volume + 0.5 * v;

  ptSize = map(volume, 0, 1, 1, windowWidth / 4);

  let multiplier = width / bounds.w;

  noStroke();
  let darkness = map(volume, 0, 1, 255, 0);
  fill(255, darkness);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(multiplier * 10);
  text(word, width / 2, height / 2 - textSize() / 25);

  translate(0, height / 2 - (bounds.h * multiplier) / 2);
  translate(0, bounds.h * multiplier);

  stroke(255);
  strokeWeight(0.1);
  noFill();
  for (let i = 0; i < pts.length; i++) {
    ellipse(pts[i].x * multiplier, pts[i].y * multiplier, ptSize);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// bugfix for chrome
function touchStarted() {
  userStartAudio();
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
}

function mousePressed() {
  userStartAudio();
}