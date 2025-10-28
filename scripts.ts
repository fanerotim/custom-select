// array that holds book titles that will be used in the different options
const bookTitles = [
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

// get wrapper of custom select options
const customSelectWrapper = document.querySelector<HTMLDivElement>('.custom__select__wrapper');

// add event listener to custom select element, so we can show hide the options
customSelectWrapper?.addEventListener('click', customSelectClickHandler)

// get custom options wrapper
const customOptionsWrapper = document.querySelector<HTMLDivElement>('.options__wrapper');

const arrowUpElement = document.querySelector<HTMLSpanElement>('.arrow__up')!; // add not-null operator to avoid conditional checks - element is hardcoded in html
const arrowDownElement = document.querySelector<HTMLSpanElement>('.arrow__down')!; // add not-null operator to avoid conditional checks - element is hardcoded in html

// function that handles open and close state of custom select
function customSelectClickHandler(e: Event) {
    // stopping propagation, so when I select an option the dropdown can close automatically
    // it was a nice bug i caught after debugging for some time
    // there are event listeners in both options__wrapper and custom__select__wrapper, and each has an event listener, so we need to stop propagation in order for the drop down to close, else it is opened / closed very quickly, so it never closes when you select an option
    e.stopPropagation();
    if (!customOptionsWrapper) {
        throw Error('Options Wrapper does not exist!');
    }
    
    // toggle 'show' class to show / hide the select options
    customOptionsWrapper.classList.toggle('show')

    if (customOptionsWrapper.classList.contains('show')) {
        arrowUpElement.style.display = 'block';
        arrowDownElement.style.display = 'none';
    } else {
        arrowDownElement.style.display = 'block';
        arrowUpElement.style.display = 'none';
    }
}

// custom__select paragraph
let customSelectParagraph = document.querySelector<HTMLParagraphElement>('.custom__select');

// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper?.addEventListener('click', handleOptionChange);

// change custom select value upon option change
function handleOptionChange(e: Event) {
    
    if (!customSelectParagraph) {
        throw Error('Custom Select element does not exist!');
    }

    // identify the current option by checking e.target (thanks to event delegation)
    const currentOption = e.target as HTMLSpanElement;
    // update custom select text with the text of the custom option
    customSelectParagraph.textContent = currentOption.textContent;
    // call customSelectClickHandler to close the option list
    customSelectClickHandler(e);
}

// handle form submission

// get submit button
const formSubmitButton = document.querySelector('.submit__btn');

// add event listener to the submit button
formSubmitButton?.addEventListener('click', submitFormHandler)

function submitFormHandler(e: Event) {
    e.preventDefault();

    if (!customSelectParagraph) {
        throw Error('Custom Select Element does not exist!');
    }
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectParagraph.textContent);
}

// function that generates options on initial page load and when bookTitiles array changes
function createAndAttachOptions() {

    const spanElementsCollection: HTMLSpanElement[] = [];

    bookTitles.forEach(bookTitle => {
        const spanElement = document.createElement('span');
        spanElement.textContent = bookTitle;
        spanElement.className = 'option';
        spanElementsCollection.push(spanElement);
    })

    spanElementsCollection.forEach(span => {

        if (!customOptionsWrapper) {
            throw Error('Custom Options Wrapper does not exist!')
        }
        customOptionsWrapper.appendChild(span);
    })
}

// add all options on documet load
document.addEventListener('DOMContentLoaded', createAndAttachOptions);