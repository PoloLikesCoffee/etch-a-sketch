//load the grid with default values of 16 x 16
window.addEventListener('load', loadDefaultGrid);

const gridContainer = document.getElementById('gridContainer');

function makeAGrid (colAndRow) {
    //set the value of columns and rows to the two
    //custom properties in the css file
    gridContainer.style.setProperty('--temp-column', colAndRow);
    gridContainer.style.setProperty('--temp-row', colAndRow);
    for (i = 0; i < (colAndRow * colAndRow); i++) {
        //create div cell
        let cell = document.createElement('div');
        //add an event listener on that div 
        //when mouse over it, trigger the function changeColor
        cell.addEventListener("mouseover", changeColor);
        //add the cell div to his parent and 
        //gets and sets the value of the gridItem class
        gridContainer.appendChild(cell).className = 'gridItem';
    }
}

function clearGrid () {
    let cell = gridContainer.children;
    for (let i = 0; i < cell.length; i++) {
        cell[i].style.backgroundColor = 'rgb(122, 89, 45)';
    }
}

function removeGrid () {
    //loop to remove all children "gridItem" from an gridContainer:
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}
//function that gets the target of the event 
//and change his color
function changeColor (event) {
    function getRandomColor() {
        //gets a random (floating point) number from 0 to 256 (0 to 255 inclusive)
        return Math.floor(Math.random() * 256);
    }
    let randomColor = 'rgb(' + getRandomColor() + ',' + getRandomColor() + ',' + getRandomColor() + ')';
    event.target.style.backgroundColor = randomColor;
    //event.target.style.opacity = (parseFloat(event.target.style.opacity) || 0) + 0.2;
}

const mainContainer = document.getElementById('mainContainer');
let clearButton = document.createElement('button');
clearButton.textContent = 'CLEAR';
clearButton.className = 'clearButton';
clearButton.addEventListener("click", clearGrid);
//append the reset button as the frist child of the parent mainContainer
mainContainer.insertBefore(clearButton, mainContainer.firstChild);

function loadDefaultGrid () {
    //load window with a grid of 16 x 16
    makeAGrid(16);
    sliderRange.value = 16;
    outputSlider.textContent = sliderRange.value + ' x ' + sliderRange.value;
}

const outputSlider = document.createElement('p');
mainContainer.appendChild(outputSlider);

const sliderRange = document.createElement('input');
sliderRange.setAttribute('type', 'range');
sliderRange.min = 2;
sliderRange.max = 100;
sliderRange.className = 'slider';
mainContainer.appendChild(sliderRange);

sliderRange.oninput = function() {
    outputSlider.textContent = this.value + ' x ' + this.value;
}

let newGridButton = document.createElement('button');
newGridButton.textContent = 'NEW GRID';
mainContainer.appendChild(newGridButton);

newGridButton.addEventListener("click", makeNewGrid);

function makeNewGrid () {
    removeGrid();
    makeAGrid(sliderRange.value);
}

