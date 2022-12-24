let input = document.querySelector('input');
let button = document.querySelector('button');
let result = document.querySelector('#result');

button.addEventListener('click', () => {
    let countryName = input.value;
    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(url)
        .then(response => response.json())
        .then(country => {
            country = country[0];

            const showDialcode = () => {
                if(country.idd.suffixes.length > 1) {
                    return country.idd.root;
                }else {
                    return `${country.idd.root}${country.idd.suffixes[0]}`;
                }
            }
            

            result.innerHTML = `
                <div class="flex flex-col justify-center items-center py-2 my-4">
                    <div class="mb-4">
                        <img class="w-60 shadow-md" src="${country.flags.svg}" id="flag" alt="${country.name.common.toLowerCase()} flag">
                        <img class="hidden w-60 h-60 object-contain shadow-md" id="coat-of-arms" src="${country.coatOfArms.svg}" alt="${country.name.common.toLowerCase()} coat of arms">
                    </div>
                    <h3 class="mb-4 text-lg sm:text-xl font-semibold">${country.name.common.toUpperCase()}</h3>
                    <button class="px-5 sm:px-7 py-2 sm:py-3 rounded-3xl bg-indigo-600 text-gray-100 text-sm font-semibold tracking-wider hover:bg-indigo-400 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-opacity-50 transition ease-linear" id="toggle-btn">Coat Of Arms</button>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Capital:</h4>
                    <span>${country.capital.join(', ')}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Countinent:</h4>
                    <span>${country.region}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Subregion:</h4>
                    <span>${country.subregion}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Population:</h4>
                    <span>${country.population}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Currency:</h4>
                    <span>${Object.values(country.currencies)[0]['name']} ${Object.values(country.currencies)[0]['symbol']}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Language:</h4>
                    <span>${Object.values(country.languages).join(', ')}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Time Zone:</h4>
                    <span>${country.timezones.join(', ')}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Dial Code:</h4>
                    <span>${showDialcode()}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">TLD:</h4>
                    <span>${country.tld[0]}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Traffic:</h4>
                    <span>${country.car.side} | ${country.car.signs[0]}<span>
                </div>
                <div class="border-b-2 border-gray-300 py-2 sm:text-lg">
                    <h4 class="inline-block mr-2 font-semibold">Map:</h4>
                    <span><a class="text-indigo-500 hover:text-indigo-400 rounded-lg outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-opacity-50 transition ease-linear" href="${country.maps.googleMaps}" target="_blank">Map Of ${country.name.common}<span>
                </div>
            `

            let toggleButton = document.querySelector('#toggle-btn');
            let flag = document.querySelector('#flag');
            let coatOfArms = document.querySelector('#coat-of-arms');

            toggleButton.addEventListener('click', () => {
                if(coatOfArms.classList.contains('hidden')) {
                    flag.classList.add('hidden');
                    coatOfArms.classList.remove('hidden');
                    toggleButton.textContent = 'Flag';
                }
                else {
                    coatOfArms.classList.add('hidden');
                    flag.classList.remove('hidden');
                    toggleButton.textContent = 'Coat of Arms';
                }
            })
        })
        .catch(error => console.error(error))
});