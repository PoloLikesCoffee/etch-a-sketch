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
let resetButton = document.createElement('button');
resetButton.textContent = 'RESET';
resetButton.className = 'resetButton';
resetButton.addEventListener("click", resetGrid);
//append the reset button as the frist child of the parent mainContainer
mainContainer.insertBefore(resetButton, mainContainer.firstChild);

function resetGrid () {
    //let newGridSize = sliderRange.value;
    let newGridSize = prompt('How many squares per side do want you the new grid will be?');
    //if click on cancel, don't call function resetGrid 
    //and keep the current grid and trail
    if (newGridSize !== null) {
        if (newGridSize <= 1 || newGridSize > 100 || isNaN(newGridSize)) {
            alert('The value has to be between 2 and 100.');
            resetGrid();
        } else {
            //loop to remove all children "gridItem" from an gridContainer:
            while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.firstChild)
            }
            makeAGrid(newGridSize);
            //sliderRange.value = newGridSize;
            //outputSlider.textContent = sliderRange.value + ' x ' + sliderRange.value;
        }
    }
}

function loadDefaultGrid () {
    //load window with a grid of 16 x 16
    makeAGrid(16);
    /*sliderRange.value = 16;
    outputSlider.textContent = sliderRange.value + ' x ' + sliderRange.value;*/
}

/*const outputSlider = document.createElement('p');
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
*/
