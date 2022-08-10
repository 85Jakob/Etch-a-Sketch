const DEFAULT_SIZE = 16;
const DEFAULT_COLOR_MODE = "BLACK";
const DEFAULT_DRAW_MODE = "CLICK";

let colorMode = DEFAULT_COLOR_MODE;
let drawMode = DEFAULT_DRAW_MODE;

const container = document.getElementById("container");

const rainbowBtn = document.getElementById('rgb')
const eraserBtn = document.getElementById('erase')

rainbowBtn.onclick = () => setColorMode('rainbow')
eraserBtn.onclick = () => setColorMode('eraser')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

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
* Sets the color
*/
function setColorMode(mode){
    colorMode = mode;
}
/* 
* Sets the color
*/



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
            e.target.style.backgroundColor = 'black';
            e.target.style.borderColor = 'black';
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