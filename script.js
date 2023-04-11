
/* closure compiler output

var a = 0, b = 250, c = 250, e = document.getElementById("counter"), f = 0, g = document.getElementById("myCanvas"), h = g.getContext("2d");
h.fillStyle = "blue";
h.fillRect(0, 0, g.width, g.height);
let dn = Date.now();
function m() {
  for (var k = h.getImageData(0, 0, 500, 500), d = k.data, l = 0; 1000000 > l; l++) {
    255 == d[4 * b + 2E3 * c] ? (d[4 * b + 2E3 * c] = 0, d[4 * b + 2E3 * c + 1] = 0, d[4 * b + 2E3 * c + 2] = 0, a++, 3 < a && (a = 0)) : (d[4 * b + 2E3 * c] = 255, d[4 * b + 2E3 * c + 1] = 255, d[4 * b + 2E3 * c + 2] = 255, a--, 0 > a && (a = 3)), 0 == a ? (--b, 0 > b && (b = 499)) : 1 == a ? (--c, 0 > c && (c = 499)) : 2 == a ? (b += 1, 500 == b && (b = 0)) : 3 == a && (c += 1, 500 == c && (c = 0)), f++;
  }
  h.putImageData(k, 0, 0);
  e.innerHTML = f;
  requestAnimationFrame(m);//aa
  if (f==1000000000)
    {
      document.getElementById("time").innerHTML=Date.now()-dn;//7888
    }
}
requestAnimationFrame(m);

*/



let wh = 500;
let d = 0;
let x = Math.round(wh / 2);
let y = Math.round(wh / 2);
let counterElement = document.getElementById("counter");
let counter = 0;
let stepsAtOnce = 100000;



let dn = Date.now();
  
const canvas = document.getElementById("myCanvas");
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
     if (counter==100000000)
    {
      document.getElementById("time").innerHTML=Date.now()-dn;//10958
    }
  }
  ctx.putImageData(id, 0, 0);
  counterElement.innerHTML = counter;
  requestAnimationFrame(step);
}

requestAnimationFrame(step);


