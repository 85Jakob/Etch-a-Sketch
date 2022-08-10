const DEFAULT_SIZE = 16;
const DEFAULT_COLOR_MODE = "solid";
const DEFAULT_COLOR = "BLACK";

let colorMode = DEFAULT_COLOR_MODE;
let currentColor = DEFAULT_COLOR;
let size = DEFAULT_SIZE


const container = document.getElementById("container");

const rainbowBtn = document.getElementById('rgb');
const eraserBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('color');
const solidBtn = document.getElementById('solid');

rainbowBtn.onclick = () => setColorMode('rainbow');
eraserBtn.onclick = () => setColorMode('eraser');
solidBtn.onclick = () => setColorMode('solid');
clearBtn.onclick = () => clear();
colorPicker.oninput = (e) => setColor(e.target.value);

let mouseDown = false;
document.querySelector('.drawArea').onmousedown = () => (mouseDown = true);
document.querySelector('.drawArea').onmouseup = () => (mouseDown = false);

/*
* updates grid layout
*/
let slider = document.getElementById('slider');
let output = document.getElementById('sValue');
output.innerHTML = slider.value;
/*slider.addEventListener('click',function() {
    size = slider.value;
    clear();
});*/
output.innerHTML = size;

slider.addEventListener('input',function() {
    output.innerHTML = slider.value;
    size = slider.value;
    clear();
},false);
output.innerHTML = size;


/*
* Makes drawing grid
*/
function makeGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        container.appendChild(cell).className = "grid-item";
    };
};
/*
* Resets board
*/
function clear(){
    container.innerHTML = " ";
    makeGrid(size, size);
}

/* 
* Sets the color Mode
*/
function setColorMode(mode){
    colorMode = mode;
}
/* 
* Sets the color 
*/
function setColor(color){
    currentColor = color;
}

/* 
* Generates a random color and returns it
*/
function getRandomColor(){
    let color = '#';
    let colorChar = '0123456789ABCDEF';
    for (var i = 0; i < 6; i++) {
        color += colorChar[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
* updates the color of the square when clicked
*/
function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown){
        //pass
    }    
    else {
        if(colorMode === 'eraser'){
            e.target.style.backgroundColor = 'white';
            e.target.style.borderColor = 'lightblue';
        }
        else if(colorMode === 'rainbow'){
            let newColor = getRandomColor();
            e.target.style.backgroundColor = newColor;
            e.target.style.borderColor = newColor;
        } else {
            e.target.style.backgroundColor = currentColor;
            e.target.style.borderColor = currentColor;
        }
    }
}

/*
* sets up default board
*/
window.onload = () =>{
    makeGrid(DEFAULT_SIZE, DEFAULT_SIZE);
    setColorMode(DEFAULT_COLOR_MODE);
}