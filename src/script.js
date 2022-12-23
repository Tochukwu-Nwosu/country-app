let input = document.querySelector('input');
let button = document.querySelector('button');
let result = document.querySelector('#result');

button.addEventListener('click', () => {
    let countryName = input.value;
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(url)
        .then(response => response.json())
        .then(country => {
            console.log(country);
            country = country[0];
            console.log('name:', country.name.common);
            console.log(country.capital.join(', '));
            console.log(country.flags.svg);
            console.log(country.coatOfArms.svg)
            console.log(country.region);
            console.log(country.subregion);
            console.log(country.population);
            let currency = Object.values(country.currencies)[0]
            console.log(currency.name, currency.symbol);
            console.log(Object.values(country.languages).join(', '));
            console.log(country.timezones.join(', '));
            console.log(country.idd.root + '' + country.idd.suffixes);
            console.log(country.tld[0]);
            console.log(country.car.side, country.car.signs[0]);
            console.log(country.maps.googleMaps)
        })
        .catch(error => console.error(error))
});