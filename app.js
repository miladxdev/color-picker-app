const element = (e) => document.querySelector(e);

// DOM elements
const header = element("#header");
const hexElement = element("#hex");

// slider elements
const redSlider = element("#red");
const greenSlider = element("#green");
const blueSlider = element("#blue");

// #hues #tints #shadows span elements
const tints = document.querySelectorAll("#tints span");
const shades = document.querySelectorAll("#shades span");
const hues = document.querySelectorAll("#hues span");

// rgb code color
const r = document.getElementById("r");
const g = document.getElementById("g");
const b = document.getElementById("b");
// hsl code color
const h = document.getElementById("h");
const s = document.getElementById("s");
const l = document.getElementById("l");

setInterval(() => {
  let currentRGB = `${redSlider.value},${greenSlider.value},${blueSlider.value}`;
  let currentHEX = rgbToHex(redSlider.value, greenSlider.value, blueSlider.value);
  let currentHSL = rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value);

  // sliders live gradient background
  redSlider.style.backgroundImage = `linear-gradient(to right, rgba(0,${greenSlider.value},${blueSlider.value}, 0.5), rgba(255,${greenSlider.value},${blueSlider.value}, 0.5)`;
  greenSlider.style.backgroundImage = `linear-gradient(to right, rgba(${redSlider.value},0,${blueSlider.value}, 0.5), rgba(${redSlider.value},255,${blueSlider.value}, 0.5)`;
  blueSlider.style.backgroundImage = `linear-gradient(to right, rgba(${redSlider.value},${greenSlider.value},0, 0.5), rgba(${redSlider.value},${greenSlider.value},255, 0.5)`;

  // element("#app-container").style.boxShadow = `0 0 40px 0 rgba(${currentRGB}, ${0.5})`;
  element("#app-container").style.border = `6px solid rgba(${currentRGB}, ${0.4})`;

  // updates header background with current slider values
  header.style.background = `rgb(${currentRGB})`;

  // slider R/G/B current values
  element("#red-slider-value").innerText = redSlider.value;
  element("#green-slider-value").innerText = greenSlider.value;
  element("#blue-slider-value").innerText = blueSlider.value;

  // displays hex color code
  hexElement.innerHTML = currentHEX;

  // #hues #tints #shadows colors
  let alpha = 0;
  for (let i = 0; i < tints.length; i++) {
    tints[i].style.background = shadeColor(currentHEX, alpha * 100);
    tints[i].querySelector("p").innerText = shadeColor(currentHEX, alpha * 100);

    shades[i].style.background = shadeColor(currentHEX, -alpha * 100);
    shades[i].querySelector("p").innerText = shadeColor(currentHEX, -alpha * 100);

    hues[i].style.background = `hsl(${currentHSL.h + alpha * 50}, ${currentHSL.s}%, ${currentHSL.l}% )`;
    hues[i].querySelector("p").innerText = hslToHex(currentHSL.h + alpha * 60, currentHSL.s, currentHSL.l);

    alpha += 0.1;
  }

  element("#state").style.background = `rgba(${currentRGB}, ${0.3})`;
  element(".fave-color-container").style.background = `rgba(${currentRGB}, ${0.3})`;

  r.innerHTML = "R : " + redSlider.value;
  g.innerHTML = "G : " + greenSlider.value;
  b.innerHTML = "B : " + blueSlider.value;

  h.innerHTML = "H : " + currentHSL.h;
  s.innerHTML = "S : " + currentHSL.s + "%";
  l.innerHTML = "L : " + currentHSL.l + "%";

  // save last color
  localStorage.setItem("lastColor", currentHEX);
}, 10);

// Generates a random color
element("#rnd-btn").addEventListener("click", () => {
  redSlider.value = Math.random() * 255;
  greenSlider.value = Math.random() * 255;
  blueSlider.value = Math.random() * 255;
});

const fullscreenColor = element(".fullscreen-color");
const fullscreenHex = element(".fullscreen-hex");

header.addEventListener("click", function (e) {
  if (e.target == this) {
    fullscreenColor.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;
    fullscreenColor.style.top = "0";
    element(".fullscreen-hex").innerHTML = hexElement.innerHTML;
  }
});

// close fullscreen color
element("#close-btn").addEventListener("click", () => {
  fullscreenColor.style.top = "100%";
});

// load saved colors from local storage
for (const [key, value] of Object.entries(localStorage)) {
  if (value === "color") {
    createFaveColor(key);
  }
}

// load last seen color
setColor(localStorage.getItem("lastColor"));

element("#save-btn").addEventListener("click", () => {
  // check duplicates
  for (const [key, value] of Object.entries(localStorage)) {
    if (key === hexElement.innerHTML) return;
  }

  createFaveColor(hexElement.innerHTML);
});

element("#view-btn").addEventListener("click", () => {
  const savedHex = element(".fullscreen-hex").innerText;

  redSlider.value = hexToRgb(savedHex).r;
  greenSlider.value = hexToRgb(savedHex).g;
  blueSlider.value = hexToRgb(savedHex).b;

  fullscreenColor.style.top = "100%";
});

// search hex color on input change
element("#mycolor-input").onchange = function () {
  const myHex = this.value;
  redSlider.value = hexToRgb(myHex).r;
  greenSlider.value = hexToRgb(myHex).g;
  blueSlider.value = hexToRgb(myHex).b;
};

for (let tint of tints) {
  tint.addEventListener("click", function () {
    setColor(this.innerText);
  });
}

for (let tint of shades) {
  tint.addEventListener("click", function () {
    setColor(this.innerText);
  });
}

for (let tint of hues) {
  tint.addEventListener("click", function () {
    setColor(this.innerText);
  });
}

// instagram: web.script
// © 2021 Milad Gharibi. All rights reserved
