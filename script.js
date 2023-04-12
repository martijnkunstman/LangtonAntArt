let dimension = 900;
let direction = 0;
let x = Math.round(dimension / 2);
let y = Math.round(dimension / 2);
let counterElement = document.getElementById("counter");
let counter = 0;
let stepsAtOnce = 10000;

let rules = "LRRRRRLLR";
rules = "LR";
rules = "LLRRRLRLRLLR";
rules = "RRLLLRLLLRRR";
convertRules();

let dateNow = Date.now();

const canvas = document.getElementById("myCanvas");
canvas.width = dimension;
canvas.height = dimension;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function convertRules() {
  rules = rules.split("");
  for (let i = 0; i < rules.length; i++) {
    if (rules[i] == "L") {
      rules[i] = -1;
    } else if (rules[i] == "R") {
      rules[i] = 1;
    }
  }
}

function step() {
  let id = ctx.getImageData(0, 0, dimension, dimension);
  let pixels = id.data;
  for (let a = 0; a < stepsAtOnce; a++) {
    
    direction = direction + rules[pixels[x * 4 + y * dimension * 4]];
    pixels[x * 4 + y * dimension * 4] = pixels[x * 4 + y * dimension * 4] + 1;
    if (pixels[x * 4 + y * dimension * 4] == rules.length) {
      pixels[x * 4 + y * dimension * 4] = 0;
    }
    pixels[x * 4 + y * dimension * 4 + 1] = 255*pixels[x * 4 + y * dimension * 4]/(rules.length-1);
    pixels[x * 4 + y * dimension * 4 + 2] = 255*pixels[x * 4 + y * dimension * 4]/(rules.length-1);

    if (direction > 3) {
      direction = 0;
    } else if (direction < 0) {
      direction = 3;
    }
    if (direction == 0) {
      x = x - 1;
      if (x < 0) {
        x = dimension - 1;
      }
    } else if (direction == 1) {
      y = y - 1;
      if (y < 0) {
        y = dimension - 1;
      }
    } else if (direction == 2) {
      x = x + 1;
      if (x == dimension) {
        x = 0;
      }
    } else if (direction == 3) {
      y = y + 1;
      if (y == dimension) {
        y = 0;
      }
    }
    counter++;
    if (counter == 1000000) {
      document.getElementById("time").innerHTML = Date.now() - dateNow;
    }
  }
  ctx.putImageData(id, 0, 0);

  ctx.fillStyle = 'rgba(0,0,225,0.01)';
  ctx.fillRect(0,0, dimension, dimension);

  counterElement.innerHTML = counter;

  requestAnimationFrame(step);
}

step();
