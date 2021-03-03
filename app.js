const header = document.getElementById("header");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const sliders = document.querySelectorAll(".slider"); // all sliders


for (let i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousedown", changeColor);
    sliders[i].addEventListener("mouseup", () => clearInterval(id));
    // clear interval when you're not clicking (for optimization)
}

var count = 0;
function changeColor() {
    id = setInterval(() => {
        count ++;
        console.log(count);
        header.style.background = `rgb(
            ${redSlider.value},
            ${greenSlider.value},
            ${blueSlider.value}
        )`;
    }, 10);
}
