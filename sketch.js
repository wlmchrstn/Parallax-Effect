let cnv; // The canvas
let w; // Width of entire wave

let xspacing = 8; // Distance between each horizontal location
let maxwaves = 4; // Total number of waves
let theta = 0.0; // The speed of the wave
let amplitude = new Array(maxwaves); // The wave height
let dx = new Array(maxwaves); 
let yvalues;

let noiseScale=0.02;
let num = 0;

let time = 0; 
let phase = 0;

function setup() {
  cnv = createCanvas(600, 400);
  w = width + 25;
  for (let i = 0; i < maxwaves; i++) {
    amplitude[i] = random(10, 15); // The wave height
    let period = random(100, 200); // Num pixels before wave repeats
    dx[i] = (TWO_PI / period) * xspacing;
  }

  yvalues = new Array(floor(w / xspacing)); // Total point for Y
}

function draw() {
  background(255, 182, 185);

  calcWave();
  renderWave();
  renderLayer2();
  renderLayer3();
}

function calcWave() {
  theta += 0.04; // The speed of the wave

  // Set all height values to zero
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = 0;
  }

  // Accumulate wave height values
  for (let j = 0; j < maxwaves; j++) {
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      if (j % 2 == 0) yvalues[i] += sin(x) * amplitude[j];
      else yvalues[i] += cos(x) * amplitude[j];
      x += dx[j];
    }
  }
}

function renderWave() {
  noStroke();
  fill(250, 227, 217);
  let xmouse = map(mouseX,0,600,-20,20)
  let x = floor(xmouse)
  let ymouse = map(mouseY,0,400,-20,20)
  let y = floor(ymouse)
  
  beginShape();
  for (let x = 0; x < yvalues.length; x++) {
    vertex((x * xspacing)-10+x, width / 2 + yvalues[x] - 225+y);
  }
  vertex(710, 400)
  vertex(0, 400)
  endShape(CLOSE)
}

function renderLayer2() {
  num += 1;
  noStroke();
  fill(187, 222, 214);
  let xmouse = map(mouseX,0,600,-30,30)
  let x = floor(xmouse)
  let ymouse = map(mouseY,0,400,-30,30)
  let y = floor(ymouse)
  
  beginShape();
  for (let x=0; x < w; x++) {
    let noiseVal = noise((num+x)*noiseScale, 10*noiseScale);
    vertex(x-40+x,(noiseVal*100)+150+y)
  }
  vertex(600, 400);
  vertex(0, 400);
  endShape();
}

function renderLayer3() {
  let ypoint = 0; // The coordinate for Y
  let amplitude = 25; // The wave height
  let velocity = 6.28 / 100; // The speed of the wave
  let xmouse = map(mouseX,0,600,-10,10)
  let x = floor(xmouse)
  let ymouse = map(mouseY,0,400,-10,10)
  let y = floor(ymouse)
  
  time += 0.5;
  noStroke();
  fill(138, 198, 209);
  beginShape();
  for (i = 0; i < w+40; i += 20) {
    ypoint = sin(velocity * (time - phase)) * amplitude;
    vertex(i-30+x, 335 + ypoint+y)
    phase += 2;
  }
  vertex(630+x, 420+y);
  vertex(-30+x, 420+y);
  endShape(CLOSE);
  if (time == 100) time = 0;
  phase = 0;
}