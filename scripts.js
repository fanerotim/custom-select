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
    'Glue',
    'Cloud Atlas',
    'The Castle'
];
// get wrapper of custom select options
var customSelectWrapper = document.querySelector('.custom__select__wrapper');
// add event listener to custom select element, so we can show hide the options
customSelectWrapper === null || customSelectWrapper === void 0 ? void 0 : customSelectWrapper.addEventListener('click', customSelectClickHandler);
// get custom options wrapper
var customOptionsWrapper = document.querySelector('.options__wrapper');
var arrowUpElement = document.querySelector('.arrow__up'); // add not-null operator to avoid conditional checks - element is hardcoded in html
var arrowDownElement = document.querySelector('.arrow__down'); // add not-null operator to avoid conditional checks - element is hardcoded in html
// function that handles open and close state of custom select
function customSelectClickHandler(e) {
    // stopping propagation, so when I select an option the dropdown can close automatically
    // it was a nice bug i caught after debugging for some time
    // there are event listeners in both options__wrapper and custom__select__wrapper, and each has an event listener, so we need to stop propagation in order for the drop down to close, else it is opened / closed very quickly, so it never closes when you select an option
    e.stopPropagation();
    if (!customOptionsWrapper) {
        throw Error('Options Wrapper does not exist!');
    }
    // toggle 'show' class to show / hide the select options
    customOptionsWrapper.classList.toggle('show');
    if (customOptionsWrapper.classList.contains('show')) {
        // call function that will show checkbox (or other marker) to indicate selected option
        indicateSelectedOption(e);
        // function that handles checkbox insertion for the selected custom option
        arrowUpElement.style.display = 'block';
        arrowDownElement.style.display = 'none';
    }
    else {
        arrowDownElement.style.display = 'block';
        arrowUpElement.style.display = 'none';
    }
}
// custom__select paragraph
var customSelectParagraph = document.querySelector('.custom__select');
// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper === null || customOptionsWrapper === void 0 ? void 0 : customOptionsWrapper.addEventListener('click', handleOptionChange);
// change custom select value upon option change
function handleOptionChange(e) {
    if (!customSelectParagraph) {
        throw Error('Custom Select element does not exist!');
    }
    // identify the current option by checking e.target (thanks to event delegation)
    var currentOption = e.target;
    // update custom select text with the text of the custom option
    customSelectParagraph.textContent = currentOption.textContent;
    // call customSelectClickHandler to close the option list
    customSelectClickHandler(e);
}
// handle form submission
// get submit button
var formSubmitButton = document.querySelector('.submit__btn');
// add event listener to the submit button
formSubmitButton === null || formSubmitButton === void 0 ? void 0 : formSubmitButton.addEventListener('click', submitFormHandler);
function submitFormHandler(e) {
    e.preventDefault();
    if (!customSelectParagraph) {
        throw Error('Custom Select Element does not exist!');
    }
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectParagraph.textContent);
}
// function that generates options on initial page load and when bookTitiles array changes
function createAndAttachOptions() {
    var spanElementsCollection = [];
    bookTitles.forEach(function (bookTitle) {
        // option container - will be used to wrap the span as I will add an input[type='checkbox'] that will show the currently selected input
        var optionContainer = document.createElement('div');
        optionContainer.className = 'option__container';
        optionContainer.style.display = 'flex';
        optionContainer.style.justifyContent = 'space-between';
        optionContainer.style.position = 'relative';
        // span element
        var spanElement = document.createElement('span');
        spanElement.textContent = bookTitle;
        spanElement.className = 'option';
        spanElement.style.width = '100%';
        // input[type='checkbox'] that shows the currently selected input
        var inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('checked', 'true');
        inputElement.style.width = 'fit-content';
        inputElement.style.position = 'absolute';
        inputElement.style.right = '2px';
        inputElement.style.top = '2px';
        inputElement.style.color = 'black';
        inputElement.style.backgroundColor = 'black';
        inputElement.style.display = 'none';
        optionContainer.append(spanElement);
        optionContainer.append(inputElement);
        spanElementsCollection.push(optionContainer);
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
// fn that will set display prop of selected option's input[type='checkbox'] to block (show the checkbox to indicate which option is selected)
function indicateSelectedOption(e) {
    var textOfCurrentlySelectedOption = customSelectParagraph === null || customSelectParagraph === void 0 ? void 0 : customSelectParagraph.textContent;
    var optionElementsNodeList = document.querySelectorAll('.option');
    var selectedOption = optionElementsNodeList.forEach(function (option) {
        var _a, _b;
        if (option.textContent == textOfCurrentlySelectedOption) {
            (_a = option.parentElement) === null || _a === void 0 ? void 0 : _a.children[1].style.display = 'block';
        }
        else {
            (_b = option.parentElement) === null || _b === void 0 ? void 0 : _b.children[1].style.display = 'none';
        }
    });
}
