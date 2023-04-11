
let wh = 600;
let d = 0;
let x = Math.round(wh / 2);
let y = Math.round(wh / 2);
let counterElement = document.getElementById("counter");
let counter = 0;
let stepsAtOnce = 1000;

let dn = Date.now();
  
const canvas = document.getElementById("myCanvas");
canvas.width = wh;
canvas.height = wh;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently:true });
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function step() {
  let id = ctx.getImageData(0, 0, wh, wh);
  let pixels = id.data;
  for (let a = 0; a < stepsAtOnce; a++) {
    if (pixels[x * 4 + y * wh * 4] == 255) {
      pixels[x * 4 + y * wh * 4] = 0;
      pixels[x * 4 + y * wh * 4 + 1] = 0;
      pixels[x * 4 + y * wh * 4 + 2] = 0;
      d++;
      if (d > 3) {
        d = 0;
      }
    } else {
      pixels[x * 4 + y * wh * 4] = 255;
      pixels[x * 4 + y * wh * 4 + 1] = 255;
      pixels[x * 4 + y * wh * 4 + 2] = 255;
      d--;
      if (d < 0) {
        d = 3;
      }
    }
    if (d == 0) {
      x = x - 1;
      if (x < 0) {
        x = wh - 1;
      }
    } else if (d == 1) {
      y = y - 1;
      if (y < 0) {
        y = wh - 1;
      }
    } else if (d == 2) {
      x = x + 1;
      if (x == wh) {
        x = 0;
      }
    } else if (d == 3) {
      y = y + 1;
      if (y == wh) {
        y = 0;
      }
    }
    counter++;
     if (counter==1000000)
    {
      document.getElementById("time").innerHTML=Date.now()-dn;//10958
    }
  }
  ctx.putImageData(id, 0, 0);
  counterElement.innerHTML = counter;
  requestAnimationFrame(step);
}

step();