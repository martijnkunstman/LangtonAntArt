let dimension = 1000;
let direction = 0;
let x = Math.round(dimension / 2);
let y = Math.round(dimension / 2);
let stepsAtOnce = 10000;
let rules = "LRRRRRLLR";
convertRules();

let rulesSelect = document.getElementById("rules");
rulesSelect.addEventListener("change", function () {
  rules = rulesSelect.value;
  convertRules();
  x = Math.round(dimension / 2);
  y = Math.round(dimension / 2);
  direction = 0;
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

let dimensionSelect = document.getElementById("dimension");
dimensionSelect.addEventListener("change", function () {
  dimension = dimensionSelect.value;
  canvas.width = dimension;
  canvas.height = dimension;
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  x = Math.round(dimension / 2);
  y = Math.round(dimension / 2);
  direction = 0;
});

let fade = true;
let fadeSelect = document.getElementById("fader");
fadeSelect.addEventListener("change", function () {
  if (fadeSelect.value == "yes") {
    fade = true;
  } else {
    fade = false;
  }
});

let stepsSelect = document.getElementById("stepsAtOnce");
stepsSelect.addEventListener("change", function () {
  stepsAtOnce = stepsSelect.value;
});

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
    pixels[x * 4 + y * dimension * 4 + 1] =
      (255 * pixels[x * 4 + y * dimension * 4]) / (rules.length - 1);
    pixels[x * 4 + y * dimension * 4 + 2] =
      (255 * pixels[x * 4 + y * dimension * 4]) / (rules.length - 1);

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
  }
  ctx.putImageData(id, 0, 0);
  if (fade) {
    ctx.fillStyle = "rgba(0,0,225,0.01)";
    ctx.fillRect(0, 0, dimension, dimension);
  }
  requestAnimationFrame(step);
}

step();