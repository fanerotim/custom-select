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
    'Glue',
    'Cloud Atlas',
    'The Castle'
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
        // call function that will show checkbox (or other marker) to indicate selected option
        indicateSelectedOption(e);
        // function that handles checkbox insertion for the selected custom option
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
        // option container - will be used to wrap the span as I will add an input[type='checkbox'] that will show the currently selected input
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option__container';
        optionContainer.style.display = 'flex';
        optionContainer.style.justifyContent = 'space-between';
        optionContainer.style.position = 'relative';
        
        // span element
        const spanElement = document.createElement('span');
        spanElement.textContent = bookTitle;
        spanElement.className = 'option';
        spanElement.style.width = '100%';

        // input[type='checkbox'] that shows the currently selected input
        const inputElement = document.createElement('input');
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
        optionContainer.append(inputElement)

        spanElementsCollection.push(optionContainer);
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

// fn that will set display prop of selected option's input[type='checkbox'] to block (show the checkbox to indicate which option is selected)
function indicateSelectedOption(e: Event) {
    const textOfCurrentlySelectedOption = customSelectParagraph?.textContent;

    const optionElementsNodeList = document.querySelectorAll('.option');
    const selectedOption = optionElementsNodeList.forEach((option) => {
        if (option.textContent == textOfCurrentlySelectedOption) {
            option.parentElement?.children[1].style.display = 'block';
        } else {
            option.parentElement?.children[1].style.display = 'none';
        }
    })
}