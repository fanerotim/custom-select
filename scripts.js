// get custom select element
var customSelectBtn = document.querySelector('.custom__select');
// add event listener to custom select element, so we can show hide the options
customSelectBtn === null || customSelectBtn === void 0 ? void 0 : customSelectBtn.addEventListener('click', customSelectClickHandler);
// get custom options wrapper
var customOptionsWrapper = document.querySelector('.options__wrapper');
// function that handles open and close state of custom select
function customSelectClickHandler() {
    if (!customOptionsWrapper) {
        throw Error('Options Wrapper does not exist!');
    }
    // toggle 'show' class to show / hide the select options
    customOptionsWrapper.classList.toggle('show');
}
// custom__select paragraph
var customSelectElement = document.querySelector('.custom__select');
// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper === null || customOptionsWrapper === void 0 ? void 0 : customOptionsWrapper.addEventListener('click', handleOptionChange);
// change custom select value upon option change
function handleOptionChange(e) {
    if (!customSelectElement) {
        throw Error('Custom Select element does not exist!');
    }
    // identify the current option by checking e.target (thanks to event delegation)
    var currentOption = e.target;
    // update custom select text with the text of the custom option
    customSelectElement.textContent = currentOption.textContent;
    // call customSelectClickHandler to close the option list
    customSelectClickHandler();
}
// handle form submission
// get submit button
var formSubmitButton = document.querySelector('.submit__btn');
// add event listener to the submit button
formSubmitButton === null || formSubmitButton === void 0 ? void 0 : formSubmitButton.addEventListener('click', submitFormHandler);
function submitFormHandler(e) {
    e.preventDefault();
    if (!customSelectElement) {
        throw Error('Custom Select Element does not exist!');
    }
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectElement.textContent);
}
// array that holds book titles that will be used in the different options
var bookTitles = [
    'Anima',
    'Border',
    'To the Lake',
    'Elixir',
    'Out of Thin Air',
    'The Sweet Soirt',
    'It`s not about the bike',
    'Perfume',
    'On the road',
    'Glue'
];
// function that generates options on initial page load and when bookTitiles array changes
function createAndAttachOptions() {
    var spanElementsCollection = [];
    bookTitles.forEach(function (bookTitle) {
        var spanElement = document.createElement('span');
        spanElement.textContent = bookTitle;
        spanElement.className = 'option';
        spanElementsCollection.push(spanElement);
    });
    spanElementsCollection.forEach(function (span) {
        if (!customOptionsWrapper) {
            throw Error('Custom Options Wrapper does not exist!');
        }
        customOptionsWrapper.appendChild(span);
    });
}
// add all options on documet load
document.addEventListener('DOMContentLoaded', createAndAttachOptions);
