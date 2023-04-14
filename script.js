let dimension = 1200;
let direction = 0;
//let direction2 = 0;
let x = Math.round(dimension / 2);
let y = Math.round(dimension / 2);
//let x2 = Math.round(dimension / 2);
//let y2 = Math.round(dimension / 2);
let stepsAtOnce = 10000;

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

let stepsSelect = document.getElementById("stepsAtOnce");
stepsSelect.addEventListener("change", function () {
  stepsAtOnce = stepsSelect.value;
});

let rules = "LRRRRRLLR";
rules = "LR";
rules = "LLRRRLRLRLLR";
rules = "RRLLLRLLLRRR";
convertRules();

const canvas = document.getElementById("myCanvas");
canvas.width = dimension;
canvas.height = dimension;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//const canvas2 = document.getElementById("myCanvas2");
//canvas2.width = dimension;
//canvas2.height = dimension;
//const ctx2 = canvas2.getContext("2d", {
//  alpha: false,
//  willReadFrequently: true,
//});
//ctx2.fillStyle = "blue";
//ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

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
  ctx.fillStyle = "rgba(0,0,225,0.01)";
  ctx.fillRect(0, 0, dimension, dimension);
  //step2();
  requestAnimationFrame(step);
}
/*
let counter2 = 0;
let grow = true;
function step2() {
  let id2 = ctx2.getImageData(0, 0, dimension, dimension);
  let pixels = id2.data;
  for (let a = 0; a < stepsAtOnce; a++) {
    if (grow) {
      counter2+=1/(stepsAtOnce/8);
    } else {
      counter2-=1/(stepsAtOnce/8);
    }
    if (counter2 >=255) {
      grow = false;
    }
    if (counter2 <= 0) {
      grow = true;
    }
    direction2 = direction2 + rules[pixels[x2 * 4 + y2 * dimension * 4]];
    pixels[x2 * 4 + y2 * dimension * 4] =
      pixels[x2 * 4 + y2 * dimension * 4] + 1;
    if (pixels[x2 * 4 + y2 * dimension * 4] == rules.length) {
      pixels[x2 * 4 + y2 * dimension * 4] = 0;
    }
    pixels[x2 * 4 + y2 * dimension * 4 + 1] = 255-counter2;
    pixels[x2 * 4 + y2 * dimension * 4 + 2] = counter2;

    if (direction2 > 3) {
      direction2 = 0;
    } else if (direction2 < 0) {
      direction2 = 3;
    }
    if (direction2 == 0) {
      x2 = x2 - 1;
      if (x2 < 0) {
        x2 = dimension - 1;
      }
    } else if (direction2 == 1) {
      y2 = y2 - 1;
      if (y2 < 0) {
        y2 = dimension - 1;
      }
    } else if (direction2 == 2) {
      x2 = x2 + 1;
      if (x2 == dimension) {
        x2 = 0;
      }
    } else if (direction2 == 3) {
      y2 = y2 + 1;
      if (y2 == dimension) {
        y2 = 0;
      }
    }
  }
  ctx2.putImageData(id2, 0, 0);
  ctx2.fillStyle = "rgba(0,0,225,0.01)";
  ctx2.fillRect(0, 0, dimension, dimension);
}
*/
step();
