import { characters } from './characters.js';

//character
let charImg = document.querySelector('.char-img');
let charName = document.querySelectorAll('.char-name');
let charJob = document.querySelector('.char-job');
let charInfo = document.querySelector('.char-info');

let arrows = document.querySelectorAll('.arrow');
//search
let form = document.querySelector('.wrapper');
let input = document.querySelector('.search');
let results = document.querySelector('.results');
let searchBtn = document.querySelector('.search-btn');

//for the borders
let emptyInput = 'empty-input'
let emptyBtn = 'empty-btn';
let empty = 'empty';

//variables
let names = characters.map(character => { return character.name })
let currIdx = 0;
let len = characters.length;

//show person

showPerson(currIdx);

function showPerson(index) {
    let dbz = characters[index];
    charImg.src = 'images/' + dbz.img;
    charName[0].innerHTML = charName[1].innerHTML = dbz.name;
    charJob.innerHTML = dbz.job;
    charInfo.innerHTML = dbz.info;
}

arrows.forEach(click => {
    click.addEventListener('click', e => {
        let tar = e.currentTarget.classList;
        if (tar.contains('next')) currIdx++;
        else if (tar.contains('prev')) currIdx--;
        else {
            while (1) {
                let rand = random();
                if (currIdx !== rand) {
                    currIdx = rand;
                    break;
                }
            }
        }
        if (currIdx >= len) currIdx = 0;
        else if (currIdx < 0) currIdx = len - 1;
        showPerson(currIdx);
    })
})

//generate a random number
function random() {
    let random = Math.floor(Math.random() * len);
    return random;
}

search.addEventListener('keyup', () => {
    let value = input.value;
    value = value.toLowerCase();
    let result = [];
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    if (value) {
        result = names.filter(name => {
            name = name.toLocaleLowerCase();
            return name.includes(value);
        })
    }
    else {
        form.classList.add(empty);
        searchBtn.classList.add(emptyBtn);
        input.classList.add(emptyInput);
    }
    if (result.length) {
        form.classList.remove(empty);
        searchBtn.classList.remove(emptyBtn);
        input.classList.remove(emptyInput);
        showResults(result);
    }
    else {
        form.classList.add(empty);
        searchBtn.classList.add(emptyBtn);
        input.classList.add(emptyInput);
    }
})

function showResults(result) {
    result.forEach(res => {
        let li = document.createElement('li');
        li.innerHTML = res;
        results.appendChild(li);
        li.addEventListener('click', () => {
            input.value = li.innerHTML;
        })
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let value = input.value;
    input.value = '';
    form.classList.add(empty);
    searchBtn.classList.add(emptyBtn);
    input.classList.add(emptyInput);
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    names.forEach((name, index) => {
        if (name === value) currIdx = index;
    })
    showPerson(currIdx);
})