// get custom select element
const customSelectBtn = document.querySelector('.custom__select');

// add event listener to custom select element, so we can show hide the options
customSelectBtn?.addEventListener('click', customSelectClickHandler)

// get custom options wrapper
const customOptionsWrapper = document.querySelector('.options__wrapper') as HTMLElement;

// function that handles open and close state of custom select
function customSelectClickHandler() {
    // toggle 'show' class to show / hide the select options
    customOptionsWrapper.classList.toggle('show')
}

// custom__select paragraph
let customSelectElement = document.querySelector('.custom__select') as HTMLElement;

// use event delegation approach to only add one event listener to wrapper
customOptionsWrapper?.addEventListener('click', handleOptionChange);

// change custom select value upon option change
function handleOptionChange(e: Event) {
    // identify the current option by checking e.target (thanks to event delegation)
    const currentOption = e.target as HTMLElement;
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
    // log value of selected option - it is basically the textContent of customSelectElement
    console.log(customSelectElement.textContent);
}

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
        customOptionsWrapper.appendChild(span);
    })
}

// add all options on documet load
document.addEventListener('DOMContentLoaded', createAndAttachOptions);