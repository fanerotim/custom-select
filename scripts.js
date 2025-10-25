// get custom select element
const customSelectBtn = document.querySelector('.custom__select');

// get custom options wrapper
const customOptionsWrapper = document.querySelector('.options__wrapper');

// add event listener to custom select element, so we can show hide the options
customSelectBtn.addEventListener('click', customSelectClickHandler)

// function that handles open and close state of custom select
function customSelectClickHandler() {
    // if options are hidden show them by toggling '.hide' and '.show' classes
    if (customOptionsWrapper.className.includes('hide')) {
        customOptionsWrapper.classList.remove('hide');
        customOptionsWrapper.classList.add('show')
    // opposite of above: hide options 
    } else {
        customOptionsWrapper.classList.remove('show');
        customOptionsWrapper.classList.add('hide');
    }
}