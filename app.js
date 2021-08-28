const element = (e) => document.querySelector(e);

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
// color codes section
const state = document.getElementById("state");
// rgb code color
const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");
// hsl code color
const h = document.getElementById("h");
const s = document.getElementById("s");
const l = document.getElementById("l");

// random color after page loads
redSlider.value = Math.random() * 255;
greenSlider.value = Math.random() * 255;
blueSlider.value = Math.random() * 255;

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

function hexToRgb(hex) {
  hex = hex.trim();

  if (hex[0] == "#") {
    hex = hex.substring(1);
  }

  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  return [r, g, b];
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
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]; // returns an array
}

setInterval(() => {
  let currentRGB = `${redSlider.value},${greenSlider.value},${blueSlider.value}`;
  appContainer.style.boxShadow = `0 0 40px 0 rgba(${currentRGB}, ${0.5})`;
  // updates header with current slider values
  header.style.background = `rgb(${currentRGB})`;
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
    tints[i].style.background = `rgba(${currentRGB}, ${alpha})`;
    // tints[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;

    shades[i].style.background = `rgba(${currentRGB}, ${alpha})`;
    // shades[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;

    tones[i].style.background = `rgba(${currentRGB}, ${alpha})`;

    alpha -= 0.1;
  }

  state.style.background = `rgba(${currentRGB}, ${0.2})`;
  element(".fave-color-container").style.background = `rgba(${currentRGB}, ${0.2})`;
  r.innerHTML = "R : " + redSlider.value;
  g.innerHTML = "G : " + greenSlider.value;
  b.innerHTML = "B : " + blueSlider.value;

  h.innerHTML = "H : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[0];
  s.innerHTML = "S : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[1] + "%";
  l.innerHTML = "L : " + rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value)[2] + "%";

  // document.body.style.background = `rgba(${currentRGB}, 0.2)`;
}, 10);

// Generates a random color
randomBtn.addEventListener("click", () => {
  redSlider.value = Math.random() * 255;
  greenSlider.value = Math.random() * 255;
  blueSlider.value = Math.random() * 255;
});

function copyStringToClipboard(str) {
  // Create new element
  var el = document.createElement("textarea");
  // Set value (string to be copied)
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard
  document.execCommand("copy");
  // Remove temporary element
  document.body.removeChild(el);
}

// copy colour code to clipboard
const colorCodeElems = document.querySelectorAll(".color-code");
const toolTipElems = document.querySelectorAll(".tooltip span");
for (let i = 0; i < colorCodeElems.length; i++) {
  colorCodeElems[i].addEventListener("click", function (e) {
    if (i === 0) {
      copyStringToClipboard(`${redSlider.value},${greenSlider.value},${blueSlider.value}`);
    } else if (i === 1) {
      copyStringToClipboard(hexElement.innerHTML);
    } else {
      copyStringToClipboard(rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value));
    }
    // toggle tooltip opacity
    toolTipElems[i].style.opacity = 1;
    setTimeout(() => {
      toolTipElems[i].style.opacity = 0;
    }, 1000);
  });
}

const fullscreenColor = document.querySelector(".fullscreen-color");
const closeBtn = document.querySelector("#close-btn");
const fullscreenHex = document.querySelector(".fullscreen-hex");
header.addEventListener("click", function (e) {
  if (e.target == this) {
    fullscreenColor.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;
    fullscreenColor.style.top = "0";
    fullscreenHex.innerHTML = hexElement.innerHTML;
  }
});
closeBtn.addEventListener("click", () => {
  fullscreenColor.style.top = "100%";
  // closeBtn.style.display = "none";
});

function createFaveColor(color) {
  // favecolor div
  const div = document.createElement("div");
  div.style.background = color;
  div.style.opacity = "0";
  div.innerHTML = color;
  div.classList.add("fave-color");
  setTimeout(() => (div.style.opacity = "1"));
  element(".fave-color-container").appendChild(div);

  // delete button
  const span = document.createElement("span");
  span.innerHTML = "<i class='fa fa-times'></i>";
  span.classList.add("delete-color");
  div.appendChild(span);

  div.addEventListener("click", function (e) {
    if (e.target == this) {
      copyStringToClipboard(e.target.innerText);
      fullscreenColor.style.background = e.target.innerText;
      fullscreenColor.style.top = "0";
      fullscreenHex.innerHTML = div.innerHTML;
    }
  });

  span.addEventListener("click", function () {
    div.style.opacity = 0;
    setTimeout(() => div.remove(), 200);
    localStorage.removeItem(this.parentNode.innerText);
  });

  localStorage.setItem(color, color);
  // localStorage.clear();
}

// load saved colors from local storage
for (const [key, value] of Object.entries(localStorage)) {
  // console.log(key, value);
  createFaveColor(value);
}

element("#save").addEventListener("click", () => {
  createFaveColor(hexElement.innerHTML);
});

element("#view-btn").addEventListener("click", () => {
  const savedHex = element(".fullscreen-hex").innerText;

  redSlider.value = hexToRgb(savedHex)[0];
  greenSlider.value = hexToRgb(savedHex)[1];
  blueSlider.value = hexToRgb(savedHex)[2];

  fullscreenColor.style.top = "100%";
});

// instagram: web.script
// © 2021 Milad Gharibi. All rights reserved
