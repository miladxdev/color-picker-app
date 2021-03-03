const header = document.getElementById("header");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

const RGB = document.querySelectorAll(".rgb > span"); // all <span>s in .rgb


setInterval(() => {

    header.style.background = `rgb(${redSlider.value},${greenSlider.value},${blueSlider.value})`;

    RGB[0].innerHTML = redSlider.value;
    RGB[0].style.background = `rgb(${redSlider.value}, 0, 0)`;

    RGB[1].innerHTML = greenSlider.value;
    RGB[1].style.background = `rgb(0, ${greenSlider.value}, 0)`;

    RGB[2].innerHTML = blueSlider.value;
    RGB[2].style.background = `rgb(0, 0, ${blueSlider.value})`;

}, 10);


