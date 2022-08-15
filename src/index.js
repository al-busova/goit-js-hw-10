import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchCountryEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchCountryEl.addEventListener('input', debounce(getInput, DEBOUNCE_DELAY));

function getInput() {
    if (searchCountryEl.value.trim() === '') {
        resetPage();
        return;
    }
    fetchCountries(searchCountryEl.value.trim())
        .then(data => {
        if (data.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        }
        resetPage();
        insertContent(data);
        })
        .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name")); 
}
     
function createInfoCountry(countries) {
    const content = [];

    for (country of countries) {
        const item = `
        <ul >
        <li class = "country-list_item dec-item">
        <img src= "${country.flags.svg}" alt = 'Flag of ${country.name}' width = 30>
        <h2>${country.name}</h2></li>
        <li class = "dec-item"><p ><span class = "country-dec">Capital: </span>${country.capital}</p></li>
        <li class = "dec-item"><p ><span class = "country-dec">Population: </span>${country.population}</p></li>
        <li class = "dec-item"><p ><span class = "country-dec">Languages: </span>
        ${country.languages.map(language => ` ${language.name}`)}</p></li>
       </ul>`
        content.push(item);
    }

    res = content.join('');
    return res;
}
    
function createListCountries(countries) {
    const content = [];

       for (country of countries) {
           const item = `
        <li class = "country-list_item"><img src= "${country.flags.svg}" alt = 'Flag of ${country.name}' width = 30>
        <p>${country.name}</p></li>`
        content.push(item);
       }
    
    res = content.join('');
    return res;
}

function insertContent(countries) {
    if (countries.length === 1) {
        countryInfoEl.insertAdjacentHTML('beforeend', createInfoCountry(countries));
    } else {
        countryListEl.insertAdjacentHTML('beforeend', createListCountries(countries));
    }
}

function resetPage() {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
}