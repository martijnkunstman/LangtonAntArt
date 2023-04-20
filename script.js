
// Initialize constants and variables
const dimensionSelect = document.getElementById("dimension");
const rulesSelect = document.getElementById("rules");
const fadeSelect = document.getElementById("fader");
const stepsSelect = document.getElementById("stepsAtOnce");

// Add event listeners
rulesSelect.addEventListener("change", () => {
  rules = rulesSelect.value;
  resetSimulation();
  initCanvas();
});

dimensionSelect.addEventListener("change", () => {
  dimension = dimensionSelect.value;
  resetSimulation();
  initCanvas();
});

fadeSelect.addEventListener("change", () => {
  fade = fadeSelect.value === "yes";
});

stepsSelect.addEventListener("change", () => {
  stepsAtOnce = stepsSelect.value;
});

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

let dimension = 1000;
let direction = 0;
let x = Math.round(dimension / 2);
let y = Math.round(dimension / 2);
let stepsAtOnce = 10000;
let rules = "RRLLLRLLLRRR";
let fade = true;

// Initialize the canvas
function initCanvas() {
  canvas.width = dimension;
  canvas.height = dimension;
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  convertRules();
}

// Reset simulation
function resetSimulation() {
  x = Math.round(dimension / 2);
  y = Math.round(dimension / 2);
  direction = 0;
}

// Convert rules to numbers
function convertRules() {
  rules = rules.split("").map((rule) => (rule === "L" ? -1 : 1));
}

// Update direction based on current rule
function updateDirection(pixels) {
  direction = (direction + rules[pixels[x * 4 + y * dimension * 4]]) % 4;
  if (direction < 0) direction += 4;
}

// Update position based on current direction
function updatePosition() {
  switch (direction) {
    case 0:
      x = (x - 1 + dimension) % dimension;
      break;
    case 1:
      y = (y - 1 + dimension) % dimension;
      break;
    case 2:
      x = (x + 1) % dimension;
      break;
    case 3:
      y = (y + 1) % dimension;
      break;
  }
}

// Apply the fade effect
function applyFadeEffect() {
  if (fade) {
    ctx.fillStyle = "rgba(0, 0, 225, 0.01)";
    ctx.fillRect(0, 0, dimension, dimension);
  }
}

// Handle the animation loop
function animate() {
  const id = ctx.getImageData(0, 0, dimension, dimension);
  const pixels = id.data;

  for (let a = 0; a < stepsAtOnce; a++) {
    updateDirection(pixels);

    const index = x * 4 + y * dimension * 4;
    pixels[index] = (pixels[index] + 1) % rules.length;
    const color = (255 * pixels[index]) / (rules.length - 1);
    pixels[index + 1] = color;
    pixels[index + 2] = color;

    updatePosition();
  }

  ctx.putImageData(id, 0, 0);
  applyFadeEffect();
  requestAnimationFrame(animate);
}

// Initialize the canvas and start the animation loop
initCanvas();
animate();