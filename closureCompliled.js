//var a=1E3,b=0,c=Math.round(a/2),d=Math.round(a/2),e=1E4,f="RRLLLRLLLRRR",g=!0;l();var m=document.getElementById("rules");m.addEventListener("change",function(){f=m.value;l();c=Math.round(a/2);d=Math.round(a/2);b=0;n.fillStyle="blue";n.fillRect(0,0,p.width,p.height)});var q=document.getElementById("dimension");q.addEventListener("change",function(){a=q.value;p.width=a;p.height=a;n.fillStyle="blue";n.fillRect(0,0,p.width,p.height);c=Math.round(a/2);d=Math.round(a/2);b=0});var r=document.getElementById("fade");
//r.addEventListener("change",function(){g="yes"==r.value?!0:!1});var t=document.getElementById("steps");t.addEventListener("change",function(){e=t.value});var p=document.getElementById("myCanvas");p.width=a;p.height=a;var n=p.getContext("2d",{alpha:!1,willReadFrequently:!0});n.fillStyle="blue";n.fillRect(0,0,p.width,p.height);function l(){f=f.split("");for(var h=0;h<f.length;h++)"L"==f[h]?f[h]=-1:"R"==f[h]&&(f[h]=1)}
//function u(){for(var h=n.getImageData(0,0,a,a),k=h.data,v=0;v<e;v++)b+=f[k[4*c+d*a*4]],k[4*c+d*a*4]+=1,k[4*c+d*a*4]==f.length&&(k[4*c+d*a*4]=0),k[4*c+d*a*4+1]=255*k[4*c+d*a*4]/(f.length-1),k[4*c+d*a*4+2]=255*k[4*c+d*a*4]/(f.length-1),3<b?b=0:0>b&&(b=3),0==b?(--c,0>c&&(c=a-1)):1==b?(--d,0>d&&(d=a-1)):2==b?(c+=1,c==a&&(c=0)):3==b&&(d+=1,d==a&&(d=0));n.putImageData(h,0,0);g&&(n.fillStyle="rgba(0,0,225,0.01)",n.fillRect(0,0,a,a));requestAnimationFrame(u)}u();



const initialSize = 1000;
const maxIterations = 10000;
const defaultRules = "RRLLLRLLLRRR";
const fade = true;

let a = initialSize, b = 0, c = Math.round(a / 2), d = Math.round(a / 2);
let rules = defaultRules, iterations = maxIterations, shouldFade = fade;

initialize();

const rulesInput = document.getElementById("rules");
rulesInput.addEventListener("change", function () {
    rules = rulesInput.value;
    updateRules();
    resetGrid();
});

const dimensionInput = document.getElementById("dimension");
dimensionInput.addEventListener("change", function () {
    a = dimensionInput.value;
    updateCanvasSize();
    resetGrid();
});

const fadeInput = document.getElementById("fade");
fadeInput.addEventListener("change", function () {
    shouldFade = fadeInput.value === "yes";
});

const stepsInput = document.getElementById("steps");
stepsInput.addEventListener("change", function () {
    iterations = stepsInput.value;
});

const canvas = document.getElementById("myCanvas");
canvas.width = a;
canvas.height = a;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

function initialize() {
    rules = convertRules(rules);
}

function updateRules() {
    rules = convertRules(rules);
}

function convertRules(input) {
    return input.split("").map(rule => rule === "L" ? -1 : 1);
}

function updateCanvasSize() {
    canvas.width = a;
    canvas.height = a;
}

function resetGrid() {
    c = Math.round(a / 2);
    d = Math.round(a / 2);
    b = 0;
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resetGrid();

function runSimulation() {
    const imageData = ctx.getImageData(0, 0, a, a);
    const data = imageData.data;

    for (let i = 0; i < iterations; i++) {
        b += rules[data[4 * c + d * a * 4]];
        data[4 * c + d * a * 4] += 1;
        data[4 * c + d * a * 4] %= rules.length;
        data[4 * c + d * a * 4 + 1] = 255 * data[4 * c + d * a * 4] / (rules.length - 1);
        data[4 * c + d * a * 4 + 2] = 255 * data[4 * c + d * a * 4] / (rules.length - 1);

        if (b > 3) {
            b = 0;
        } else if (b < 0) {
            b = 3;
        }

        switch (b) {
            case 0:
                c--;
                if (c < 0) c = a - 1;
                break;
            case 1:
                d--;
                if (d < 0) d = a - 1;
                break;
            case 2:
                c++;
                if (c >= a) c = 0;
                break;
            case 3:
                d++;
                if (d >= a) d = 0;
                break;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    if (shouldFade) {
        ctx.fillStyle = "rgba(0, 0, 225, 0.01)";
        ctx.fillRect(0, 0, a, a);
    }

    requestAnimationFrame(runSimulation);
}

runSimulation();

/*

//hexagonal grid

const initialSize = 1000;
const maxIterations = 10000;
const defaultRules = "RRLLLRLLLRRR";
const fade = true;

let a = initialSize, b = 0, c = Math.round(a / 2), d = Math.round(a / 2);
let rules = defaultRules, iterations = maxIterations, shouldFade = fade;

initialize();

const rulesInput = document.getElementById("rules");
rulesInput.addEventListener("change", function () {
    rules = rulesInput.value;
    updateRules();
    resetGrid();
});

const dimensionInput = document.getElementById("dimension");
dimensionInput.addEventListener("change", function () {
    a = dimensionInput.value;
    updateCanvasSize();
    resetGrid();
});

const fadeInput = document.getElementById("fade");
fadeInput.addEventListener("change", function () {
    shouldFade = fadeInput.value === "yes";
});

const stepsInput = document.getElementById("steps");
stepsInput.addEventListener("change", function () {
    iterations = stepsInput.value;
});

const canvas = document.getElementById("myCanvas");
canvas.width = a;
canvas.height = a;
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

function initialize() {
    rules = convertRules(rules);
}

function updateRules() {
    rules = convertRules(rules);
}

function convertRules(input) {
    return input.split("").map(rule => rule === "L" ? -1 : 1);
}

function updateCanvasSize() {
    canvas.width = a;
    canvas.height = a;
}

function resetGrid() {
    c = Math.round(a / 2);
    d = Math.round(a / 2);
    b = 0;
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resetGrid();

const hexDirections = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 }
];

function runSimulation() {
    const imageData = ctx.getImageData(0, 0, a, a);
    const data = imageData.data;

    for (let i = 0; i < iterations; i++) {
        b += rules[data[4 * c + d * a * 4]];
        data[4 * c + d * a * 4] += 1;
        data[4 * c + d * a * 4] %= rules.length;
        data[4 * c + d * a * 4 + 1] = 255 * data[4 * c + d * a * 4] / (rules.length - 1);
        data[4 * c + d * a * 4 + 2] = 255 * data[4 * c + d * a * 4] / (rules.length - 1);

        if (b >= hexDirections.length) {
            b = 0;
        } else if (b < 0) {
            b = hexDirections.length - 1;
        }

        const { dx, dy } = hexDirections[b];
        c += dx;
        d += dy;
        if (c >= a) c = 0;
        if (c < 0) c = a - 1;
        if (d >= a) d = 0;
        if (d < 0) d = a - 1;
    }

    ctx.putImageData(imageData, 0, 0);

    if (shouldFade) {
        ctx.fillStyle = "rgba(0, 0, 225, 0.01)";
        ctx.fillRect(0, 0, a, a);
    }

    requestAnimationFrame(runSimulation);
}

runSimulation();
*/