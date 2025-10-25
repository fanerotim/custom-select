// get custom select element
const customSelectBtn = document.querySelector('.custom__select');

// add event listener to custom select element, so we can show hide the options
customSelectBtn.addEventListener('click', customSelectClickHandler)

// get custom options wrapper
const customOptionsWrapper = document.querySelector('.options__wrapper');

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

// get all options in a NodeList
const optionElements = document.querySelectorAll('.option');

// attach an event listener to each option
optionElements.forEach(o => o.addEventListener('click', handleOptionChange))

// custom__select paragraph
let customSelectElement = document.querySelector('.custom__select');

// change custom select value upon option change
function handleOptionChange() {
    // update custom__select paragraph to match the value of the selected / clicked option
    // 1. get value of current select option
    const currentOption = this.textContent;
    // update value of custom select
    customSelectElement.textContent = currentOption;

    // call customSelectClickHandler to close the option list
    customSelectClickHandler();
}

// handle form submission

// get submit button
const formSubmitButton = document.querySelector('.submit__btn');

// add event listener to the submit button
formSubmitButton.addEventListener('click', submitFormHandler)

function submitFormHandler(e) {
    e.preventDefault();
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectElement.textContent);
}