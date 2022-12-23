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

            result.innerHTML = `
                <div class="flex flex-col justify-center items-center py-2 my-4">
                    <div class="mb-4">
                        <img class="w-60 shadow-md" src="${country.flags.svg}" id="flag" alt="${country.name.common.toLowerCase()} flag">
                        <img class="hidden w-60 shadow-md" id="coat-of-arm" src="${country.coatOfArms.svg}" alt="${country.name.common.toLowerCase()} coat of arm">
                    </div>
                    <h3 class="mb-4 font-semibold">${country.name.common.toUpperCase()}</h3>
                    <button class="px-7 py-3 rounded-3xl bg-indigo-600 text-gray-100 text-sm font-semibold tracking-wider hover:bg-indigo-400 active:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-opacity-50 transition ease-linear" id="toggle-btn">Coat Of Arm</button>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Capital:</h4>
                    <span class="col-span-3">${country.capital.join(', ')}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Countinent:</h4>
                    <span class="col-span-3 ml-4">${country.region}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Subregion:</h4>
                    <span class="col-span-3 ml-2">${country.subregion}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Population:</h4>
                    <span class="col-span-3 ml-2">${country.population}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Currency:</h4>
                    <span class="col-span-3">${Object.values(country.currencies)[0]['name']} ${Object.values(country.currencies)[0]['symbol']}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Language:</h4>
                    <span class="col-span-3">${Object.values(country.languages).join(', ')}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Time Zone:</h4>
                    <span class="col-span-3">${country.timezones.join(', ')}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Dial Code:</h4>
                    <span class="col-span-3">${country.idd.root}${country.idd.suffixes[0]}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">TLD:</h4>
                    <span class="col-span-3">${country.tld[0]}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Traffic:</h4>
                    <span class="col-span-3">${country.car.side} | ${country.car.signs[0]}<span>
                </div>
                <div class="grid grid-cols-4 border-b-2 border-gray-300 py-2">
                    <h4 class="font-semibold">Map:</h4>
                    <span class="col-span-3"><a class="text-indigo-500 hover:text-indigo-400 rounded-lg outline-none focus:ring focus:ring-indigo-600 focus:ring-offset-2 focus:ring-opacity-50 transition ease-linear" href="${country.maps.googleMaps}">Map Of ${country.name.common}<span>
                </div>
            `
            let toggleButton = document.querySelector('#toggle-btn');
            let flag = document.querySelector('#flag');
            let coatOfArm = document.querySelector('#coat-of-arm');

            toggleButton.addEventListener('click', () => {
                if(coatOfArm.classList.contains('hidden')) {
                    flag.classList.add('hidden');
                    coatOfArm.classList.remove('hidden');
                    toggleButton.textContent = 'Flag';
                }
                else {
                    coatOfArm.classList.add('hidden');
                    flag.classList.remove('hidden');
                    toggleButton.textContent = 'Coat of Arm';
                }
            })
        })
        .catch(error => console.error(error))
});