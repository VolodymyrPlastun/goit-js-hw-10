import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import fetchCountries from '../src/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputLink: document.querySelector('#search-box'),
    counryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.inputLink.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(evt) {
    const countryName = refs.inputLink.value.trim();
    fetchCountries(countryName).then(searchCountry); 

}

function searchCountry(countries) {
    refs.counryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";

    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (countries.length >= 1 && countries.length <= 10) {
        const createCountriesMarcup = countries.map(country => {
           return `<li class="country-list__item">
            <img class="country-list__img" src="${country.flags.svg}" alt="${country.name}" width=30 height=30></img>
            <p class="country-list__title">${country.name}</p>
            </li>`
        }).join('');
        refs.counryList.insertAdjacentHTML('beforeend', createCountriesMarcup);
    } 
    if (countries.length === 1) {
        const languages = [];
        const createCounryMarcup = countries.map(country => {
            for (const language of country.languages) {
                languages.push(language.name);
            }
            return `<ul><li class="country-list__item"><h3>Capital:</h3><p>${country.capital}</p></li>
            <li class="country-list__item"><h3>Population:</h3><p>${country.population}</p></li>
            
            <li class="country-list__item"><h3>Languages:</h3><p>${languages}</p></li></ul>`
        }).join('');
        refs.countryInfo.insertAdjacentHTML('beforeend', createCounryMarcup);
    } 
}
