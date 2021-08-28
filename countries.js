const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))

}

loadCountries();

const displayCountries = countries => {
    const countriesDiv = document.getElementById('countries');
    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('country');
        div.innerHTML = `
        <h3>${country.name}</h3>
        <p>Captial city: ${country.capital}</p>
        <button class="btn" onclick="countryLoadByName('${country.name}')">Details</button>
        `;
        countriesDiv.appendChild(div);
    });
}

function countryLoadByName(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCountryDetails(data[0]))
}

const displayCountryDetails = country => {
    const countryDetailsDiv = document.getElementById('country-details');
    countryDetailsDiv.innerHTML = `
    <h4>Country Name: ${country.name}</h4>
    <p>Capital city: ${country.capital}</p>
    <p>Population : ${country.population}</p>
    <img width=200 src="${country.flag}">
    `
}