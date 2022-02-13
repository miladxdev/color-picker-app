function rgbToHex(r, g, b) {
  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length < 2) r = "0" + r;
  if (g.length < 2) g = "0" + g;
  if (b.length < 2) b = "0" + b;

  return "#" + r + g + b;
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex) {
  hex = hex.trim();

  if (hex[0] == "#") {
    hex = hex.substring(1);
  }

  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);

  return { r: r, g: g, b: b };
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
  //   return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]; // returns an array
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

function setColor(hex) {
  const rgb = hexToRgb(hex);

  redSlider.value = rgb.r;
  greenSlider.value = rgb.g;
  blueSlider.value = rgb.b;
}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = { position: "absolute", left: "-9999px" };
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

// favorite color component
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
      fullscreenHex.innerHTML = this.innerText;
    }
  });

  span.addEventListener("click", function () {
    div.style.opacity = 0;
    setTimeout(() => div.remove(), 240);
    localStorage.removeItem(this.parentNode.innerText);
  });

  localStorage.setItem(color, "color");
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
      const hsl = rgbToHsl(redSlider.value, greenSlider.value, blueSlider.value);
      copyStringToClipboard(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
    }
    // toggle tooltip opacity
    toolTipElems[i].style.opacity = 1;
    setTimeout(() => {
      toolTipElems[i].style.opacity = 0;
    }, 1000);
  });
}
