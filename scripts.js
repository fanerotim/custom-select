// get custom select element
const customSelectBtn = document.querySelector('.custom__select');

// add event listener to custom select element, so we can show hide the options
customSelectBtn?.addEventListener('click', customSelectClickHandler)

// get custom options wrapper
const customOptionsWrapper = document.querySelector('.options__wrapper');

// function that handles open and close state of custom select
function customSelectClickHandler() {
    // toggle 'show' class. initially options wrapper is with 'display: none' and .show class changes it to 'display: block'
    customOptionsWrapper.classList.toggle('show')
}

// custom__select paragraph
let customSelectElement = document.querySelector('.custom__select');

// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper?.addEventListener('click', handleOptionChange);

// change custom select value upon option change
function handleOptionChange(e) {
    // identify the current option by checking e.target (thanks to event delegation)
    const currentOption = e.target;
    // update custom select text with the text of the custom option
    customSelectElement.textContent = currentOption.textContent;
    // call customSelectClickHandler to close the option list
    customSelectClickHandler();
}

// handle form submission

// get submit button
const formSubmitButton = document.querySelector('.submit__btn');

// add event listener to the submit button
formSubmitButton?.addEventListener('click', submitFormHandler)

function submitFormHandler(e) {
    e.preventDefault();
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectElement.textContent);
}