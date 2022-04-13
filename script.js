const gridContainer = document.querySelector('#grid-container');
const clearBtn = document.getElementById('clear-btn');
const sizeInput = document.querySelector('#size-input');
const sliderOutput = document.getElementById('size-output');
let currentSize = 16; // initial grid size is 16 x 16


// create the grid
function createGridItems(size){
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for(let i = 0; i < (size * size); i++){
        const gridItem = document.createElement('div');
        gridItem.addEventListener('mouseover', changeColor); // adds event listener to each grid item to check when mouse is hovered over it
        gridItem.addEventListener('mousedown', changeColor); // adds event listener to each grid item to check when mouse is hovered over it
        gridContainer.appendChild(gridItem).className = "grid-item"; // adds the grid item to the grid and gives it a class of grid-item
    }
}

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// change the color of the grid item to black (drawing)
function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = "black";
}

// clear the grid of any black pixels
clearBtn.addEventListener('click', function(e){
    gridContainer.innerHTML = ''; // clear the grid
    createGridItems(currentSize); // create a new grid the same size as the curent one
    sliderOutput.innerHTML = `${currentSize} x ${currentSize}`; // keep the input label the same
})


// changing the grid size

// when the mouse moves the slider, change the numbers displayed
sizeInput.onmousemove = (e) => sizeOutput(e.target.value);
//when the value is changed, change the size of the grid and the current size variable
sizeInput.onchange = (e) => {
    changeSize(e.target.value);
    getCurrentSize(e.target.value);
}

//set current size variable equal to the value of the slider
function getCurrentSize(value){
    currentSize = value;
}

// when slider is moved, number value label changes
function sizeOutput(value){
    sliderOutput.innerHTML = `${value} x ${value}`;
}
//when slider value is changed, clear the current grid, then reload the new grid with the selected value
function changeSize(value){
    gridContainer.innerHTML = '';
    createGridItems(value, value);
}

//page load

//when page is loaded, set grid size to 16 x 16
window.onload = () => {
    createGridItems(currentSize);
    sliderOutput.innerHTML = `${currentSize} x ${currentSize}`;
}
