const container = document.getElementById("container");

function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    //cell.addEventListener('mouseover', changeColor)
    cell.addEventListener('mousedown', changeColor)
    container.appendChild(cell).className = "grid-item";
  };
};

function changeColor(e){
    e.target.style.backgroundColor = 'green';
}

makeRows(16, 16);