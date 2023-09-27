// getLevel() is broken in p5 sound, bugfix found here: https://github.com/processing/p5.js-sound/issues/681

let canvas, mic, analyserNode, font, points, bounds, ptSize, bg;
let word = "                                             MADE BY HEIRS                                             ";

async function getMedia(constraints) {
  try {
    let stream = null;
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
    const audioContext = new AudioContext();
    const microphone = audioContext.createMediaStreamSource(
      stream
    );
    analyserNode = audioContext.createAnalyser();
    microphone.connect(analyserNode);
  } catch (err) {
    /* handle the error */
  }
}

function getLevel() {
  if (!analyserNode) {
    return 0;
  }
  const pcmData = new Float32Array(analyserNode.fftSize);
  analyserNode.getFloatTimeDomainData(pcmData);
  let sumSquares = 0.0;
  for (const amplitude of pcmData) {
    sumSquares += amplitude * amplitude;
  }
  return Math.sqrt(sumSquares / pcmData.length);
}

function preload() {
  font = loadFont("HaasGrotDisp-75Bold.otf");
}

function setup() {
  getMedia({
    audio: true,
    video: false,
  });

  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  pts = font.textToPoints(word, 0, 0, 10, {
    sampleFactor: 1.5,
    simplifyThreshold: 0,
  });

  bounds = font.textBounds(word, 0, 0, 10);
}

function draw() {
  background(0);

  // get volume of mic
  let vol = getLevel();

  // multiplier value for centering
  let multiplier = width / bounds.w;

  // draw the solid letters
  let darkness = map(vol, 0, 0.5, 255, 0);
  noStroke();
  fill(255, darkness);
  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(multiplier * 10);
  text(word, width / 2, height / 2 - textSize() / 25);

  // draw with texttopoints
  translate(0, height / 2 - (bounds.h * multiplier) / 2);
  translate(0, bounds.h * multiplier);
  ptSize = map(vol, 0, 0.5, 0, windowWidth * 0.3);
  for (let i = 0; i < pts.length; i++) {
    stroke(255);
    strokeWeight(0.1);
    noFill();
    ellipse(pts[i].x * multiplier, pts[i].y * multiplier, ptSize);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// bugfix for chrome
function touchStarted() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
}