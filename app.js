const header = document.getElementById("header");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const HEX =  document.getElementById("hex");


const RGB = document.querySelectorAll(".rgb > span"); // all <span> tags in the .rgb class

var rgbToHex = function (rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };
  var fullColorHex = function(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red+green+blue;
  };

setInterval(() => {

    header.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;
    // 1st <span>
    RGB[0].innerHTML = redSlider.value;
    RGB[0].style.background = `rgb(${redSlider.value}, 0, 0)`;
    //2nd <span>
    RGB[1].innerHTML = greenSlider.value;
    RGB[1].style.background = `rgb(0, ${greenSlider.value}, 0)`;
    //3rd <span>
    RGB[2].innerHTML = blueSlider.value;
    RGB[2].style.background = `rgb(0, 0, ${blueSlider.value})`;
    

    HEX.innerHTML = fullColorHex(redSlider.value, greenSlider.value, blueSlider.value);

    let alpha = 1;
    for (let s in shades) {
        shades[s].style.background = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value}, ${alpha})`;
        shades[s].innerHTML = `rgba (${redSlider.value}, ${greenSlider.value}, ${blueSlider.value}, ${Math.round(alpha * 10) / 10})`;
        alpha -= 0.1;
        console.log(alpha);
    }



}, 10);

