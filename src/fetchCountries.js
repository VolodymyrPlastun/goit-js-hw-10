import Notiflix from 'notiflix';

export default function fetchCountries(name) {

    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
      if (!response.ok) {
        // console.log(response.ok);
        Notiflix.Notify.failure('Oops, there is no country with that name'); 
        
      }
        return response.json();
    })
}

   
// `<li class="country-list__item"><img class="country-list__img" src="${country.flags}" alt="${country.name.official}"></img><p>${country.name}</p></li>`