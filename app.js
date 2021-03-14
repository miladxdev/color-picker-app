// elements in header
const header = document.getElementById("header");
const hexElement =  document.getElementById("hex");
const randomBtn = document.getElementById("rnd");
// slider elements
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
 // all <span> tags in the div.rgb
const rgbElements = document.querySelectorAll(".rgb-colors > span");
// all spans in #tints
const tints = document.querySelectorAll("#tints > span");
const shades = document.querySelectorAll("#shades > span");

// functions to convert RGB color to HEX color
function rgbToHex(r, g, b) {
    
    r = Number(r).toString(16);
    g = Number(g).toString(16);
    b = Number(b).toString(16);
    
    if (r.length < 2) r = '0' + r;
    if (g.length < 2) g = '0' + g;
    if (b.length < 2) b = '0' + b;

    return '#' + r + g + b;
};


setInterval(() => {
    // updates header with current slider values
    header.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;
    // 1st <span> red
    rgbElements[0].innerHTML = redSlider.value;
    rgbElements[0].style.background = `rgb(${redSlider.value}, 0, 0)`;
    //2nd <span> green
    rgbElements[1].innerHTML = greenSlider.value;
    rgbElements[1].style.background = `rgb(0, ${greenSlider.value}, 0)`;
    //3rd <span> blue
    rgbElements[2].innerHTML = blueSlider.value;
    rgbElements[2].style.background = `rgb(0, 0, ${blueSlider.value})`;
    // displays hex color code
    hexElement.innerHTML = rgbToHex(redSlider.value, greenSlider.value, blueSlider.value);

    // color tints
    let alpha = 1;
    for (let i = 0; i < tints.length; i++) {
        tints[i].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;
        // tints[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;


        shades[i].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;
        // shades[i].innerHTML = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha.toFixed(1)})`;
        alpha -= 0.1;

        // tints[i].style.background = `rgb(${redSlider.value-10*i},${greenSlider.value-10*i},${blueSlider.value-10*i})`
    }
}, 10);


// Generates a random color
randomBtn.addEventListener("click", () => {
    redSlider.value   = Math.random() * 255;
    greenSlider.value = Math.random() * 255;
    blueSlider.value  = Math.random() * 255;
});





// instagram: web.script
// github: github.com/xcripts
// © 2020 Milad Gharibi.  All rights reserved