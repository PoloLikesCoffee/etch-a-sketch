//load the grid with default values of 16 x 16
window.addEventListener('load', loadDefaultGrid);

const gridContainer = document.getElementById('gridContainer');
const mainContainer = document.getElementById('mainContainer');

//title of the project on top of the page
const title = document.createElement('h1');
title.className = 'title';
title.textContent = 'Etch A Sketch'
//append the title as the frist child of the parent mainContainer
mainContainer.insertBefore(title, mainContainer.firstChild);

//output text of the squares of the grid
const outputSlider = document.createElement('p');
outputSlider.className = 'outputP';
mainContainer.appendChild(outputSlider);

//slider to change the number of squares of the grid
const sliderRange = document.createElement('input');
sliderRange.setAttribute('type', 'range');
sliderRange.min = 2;
sliderRange.max = 50;
sliderRange.className = 'slider';
mainContainer.appendChild(sliderRange);

//buttons to clear and create the grid
const multiButton = document.createElement('div');
multiButton.className = 'multiButton';
mainContainer.appendChild(multiButton);
//clearbutton
let clearButton = document.createElement('button');
clearButton.textContent = 'clear';
multiButton.appendChild(clearButton);
clearButton.addEventListener("click", clearGrid);
//newgridbutton
let newGridButton = document.createElement('button');
newGridButton.textContent = 'new grid';
multiButton.appendChild(newGridButton);
newGridButton.addEventListener("click", makeNewGrid);

function makeAGrid (colAndRow) {
    //set the value of columns and rows to the two custom properties in the css file
    gridContainer.style.setProperty('--temp-column', colAndRow);
    gridContainer.style.setProperty('--temp-row', colAndRow);
    for (i = 0; i < (colAndRow * colAndRow); i++) {
        //create div cell
        let cell = document.createElement('div');
        //add an event listener on that div when mouse over it, trigger the function changeColor
        cell.addEventListener("mouseover", changeColor);
        //add the cell div to his parent and gets and sets the value of the gridItem class
        gridContainer.appendChild(cell).className = 'gridItem';
    }
}

function clearGrid () {
    let cell = gridContainer.children;
    for (let i = 0; i < cell.length; i++) {
        //change background color of cells to no color
        cell[i].style.backgroundColor = '';
    }
}

function removeGrid () {
    //loop to remove all children "gridItem" from an gridContainer:
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function getRandomColor() {
    //gets a random (floating point) number from 0 to 256 (0 to 255 inclusive)
    return Math.floor(Math.random() * 256);
}

function changeColor (event) {
    /*getRandomColor();
    let randomColor = 'rgba(' + getRandomColor() + ',' + getRandomColor() + ',' + getRandomColor() + ',' + '0.7)';
    event.target.style.backgroundColor = randomColor;*/
    
    let randomColor = event.target.style.backgroundColor;
    //add random color
    if (randomColor == "") {
        event.target.style.backgroundColor = 'rgba(' + getRandomColor() + ',' + getRandomColor() + ',' + getRandomColor() + ',' + '0.4)';
    } else {
        //if not enough dark, darken the color without changing the random color
        let rgbaValues = randomColor.match(/(\b\w*\.?\w)/g);
        //console.log(rgbaValues);
        if (rgbaValues[1] > 10 || rgbaValues[2] > 10 || rgbaValues[3] > 10 || rgbaValues[4] < 0.8) {
            event.target.style.backgroundColor = 'rgba(' + rgbaValues[1]*0.5 + ',' + rgbaValues[2]*0.5 + ',' + rgbaValues[3]*0.5 + ',' + parseFloat(rgbaValues[4]*1.4) + ')';
        }
    }
}

function loadDefaultGrid () {
    //load window with a grid of 16 x 16
    makeAGrid(16);
    sliderRange.value = 16;
    outputSlider.textContent = sliderRange.value + ' x ' + sliderRange.value;
}

sliderRange.oninput = function() {
    outputSlider.textContent = this.value + ' x ' + this.value;
}

function makeNewGrid () {
    removeGrid();
    makeAGrid(sliderRange.value);
}