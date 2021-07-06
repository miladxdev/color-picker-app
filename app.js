const appContainer = document.getElementById("app-container");
// elements in header
const header = document.getElementById("header");
const hexElement = document.getElementById("hex");
const randomBtn = document.getElementById("rnd");
// slider elements
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
// R span + G span + B span
const rgbElements = document.querySelectorAll(".rgb-colors > span");
// all span elements in #tints and #shadows
const tints = document.querySelectorAll("#tints > span");
const shades = document.querySelectorAll("#shades > span");
const tones = document.querySelectorAll("#tones > span");

const state = document.getElementById("state");
//
const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");

//
const h = document.getElementById("h");
const s = document.getElementById("s");
const l = document.getElementById("l");

// functions to convert colors
function rgbToHex(r, g, b) {
  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length < 2) r = "0" + r;
  if (g.length < 2) g = "0" + g;
  if (b.length < 2) b = "0" + b;

  return "#" + r + g + b;
}

function rgbToHsl(red, green, blue) {
  red = red < 0 ? 0 : red > 255 ? 255 : red;
  green = green < 0 ? 0 : green > 255 ? 255 : green;
  blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;

  var r = red / 255,
    g = green / 255,
    b = blue / 255,
    min = Math.min(r, g, b),
    max = Math.max(r, g, b),
    delta = max - min,
    h,
    s,
    l;
  if (max == min) {
    h = 0;
  } else if (r == max) {
    h = (g - b) / delta;
  } else if (g == max) {
    h = 2 + (b - r) / delta;
  } else if (b == max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) h += 360;
  l = (min + max) / 2;
  if (max == min) s = 0;
  else if (l <= 0.5) s = delta / (max + min);
  else s = delta / (2 - max - min);
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

setInterval(() => {
  appContainer.style.boxShadow = `0 0 50px 0 rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${0.5})`;
  // updates header with current slider values
  header.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;
  // Red
  rgbElements[0].innerHTML = redSlider.value;
  rgbElements[0].style.background = `rgb(${redSlider.value}, 0, 0)`;
  // green
  rgbElements[1].innerHTML = greenSlider.value;
  rgbElements[1].style.background = `rgb(0, ${greenSlider.value}, 0)`;
  // blue
  rgbElements[2].innerHTML = blueSlider.value;
  rgbElements[2].style.background = `rgb(0, 0, ${blueSlider.value})`;

  // displays hex color code
  hexElement.innerHTML = rgbToHex(redSlider.value, greenSlider.value, blueSlider.value);

  // color tints and shadows
  let alpha = 1;
  for (let i = 0; i < tints.length; i++) {
    tints[i].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;
    // tints[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;

    shades[i].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;
    // shades[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;

    tones[i].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;

    alpha -= 0.1;
  }

  state.style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${0.2})`;

  r.innerHTML = "R : " + redSlider.value;
  g.innerHTML = "G : " + greenSlider.value;
  b.innerHTML = "B : " + blueSlider.value;

  h.innerHTML = "H : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[0];
  s.innerHTML = "S : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[1] + "%";
  l.innerHTML = "L : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[2] + "%";
}, 10);

// Generates a random color
randomBtn.addEventListener("click", () => {
  redSlider.value = Math.random() * 255;
  greenSlider.value = Math.random() * 255;
  blueSlider.value = Math.random() * 255;
});

const colorCodeElems = document.querySelectorAll(".color-code");
const toolTipElems = document.querySelectorAll(".tooltip span");
for (let i = 0; i < colorCodeElems.length; i++) {
  colorCodeElems[i].addEventListener("click", function (e) {
    // console.log(toolTipElems[i]);
    toolTipElems[i].style.opacity = 1;
    setTimeout(() => {
      toolTipElems[i].style.opacity = 0;
    }, 1000);
  });
}
// instagram: web.script
// github: github.com/xcripts
// © 2020 Milad Gharibi. All rights reserved
