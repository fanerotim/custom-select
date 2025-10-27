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

// get custom select element
const customSelectBtn = document.querySelector('.custom__select');

// add event listener to custom select element, so we can show hide the options
customSelectBtn?.addEventListener('click', customSelectClickHandler)

// get custom options wrapper
const customOptionsWrapper = document.querySelector<HTMLElement>('.options__wrapper');

const arrowUpElement = document.querySelector<HTMLSpanElement>('.arrow__up');
const arrowDownElement = document.querySelector<HTMLSpanElement>('.arrow__down');

// function that handles open and close state of custom select
function customSelectClickHandler() {

    if (!customOptionsWrapper) {
        throw Error('Options Wrapper does not exist!');
    }
    
    // toggle 'show' class to show / hide the select options
    customOptionsWrapper.classList.toggle('show')

    if (customOptionsWrapper.classList.contains('show')) {
        arrowUpElement!.style.display = 'inline-block';
        arrowDownElement!.style.display = 'none'
    } else {
        arrowUpElement!.style.display = 'none';
        arrowDownElement!.style.display = 'inline-block'
    }
}

// custom__select paragraph
let customSelectElement = document.querySelector<HTMLElement>('.custom__select');

// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper?.addEventListener('click', handleOptionChange);

// change custom select value upon option change
function handleOptionChange(e: Event) {

    if (!customSelectElement) {
        throw Error('Custom Select element does not exist!');
    }

    // identify the current option by checking e.target (thanks to event delegation)
    const currentOption = e.target as HTMLSpanElement;
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

function submitFormHandler(e: Event) {
    e.preventDefault();

    if (!customSelectElement) {
        throw Error('Custom Select Element does not exist!');
    }
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectElement.textContent);
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