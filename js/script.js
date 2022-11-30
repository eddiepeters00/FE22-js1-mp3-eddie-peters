const searchBtn = document.getElementById('search-btn');
const outerContainer = document.getElementById('outer-container');
const errorContainer = document.getElementById('error-container');

searchBtn.addEventListener('click', e => {
    e.preventDefault();

    const languageInput = document.getElementById('language-input');
    const language = languageInput.value.toLowerCase();;

    const url = `https://restcountries.com/v3.1/lang/${language}`;

    fetch(url).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw 'Could not fetch data';
        }
    }).then(data => {
        console.log(data);
        errorContainer.style.display ='none';
        outerContainer.innerHTML = '';
        displayCountries(data);

    }).catch(error => {
        console.log('ERROR:', error);
        errorContainer.style.display ='block';
    });
});


function displayCountries(listOfCountries) {
    listOfCountries.forEach((country, index, countries) => {
        const innerContainer = document.createElement('section');
        innerContainer.className = 'inner-container';
        outerContainer.appendChild(innerContainer);

        const name = document.createElement('h2');
        name.innerText = country.name.official;
        innerContainer.append(name);

        const subRegion = document.createElement('b');
        subRegion.innerText = `Subregion: ${country.subregion}`;
        innerContainer.append(subRegion);

        const capital = document.createElement('b');
        capital.innerText = `Capital: ${country.capital}`;
        innerContainer.append(capital);

        const population = document.createElement('p');
        population.innerText = `Population: ${country.population}`;
        innerContainer.append(population);
        population.setAttribute = `population${index}`;
        console.log(countries[index]);

        const flag = document.createElement('img');
        flag.src = country.flags.png;
        innerContainer.append(flag);
    });

    getLargestPopulation();
}

function getLargestPopulation() {
    const populations = document.querySelectorAll('p');
    const popArr = [];
    for (let i = 0; i < populations.length; i++) {
        let subStr = populations[i].innerText.slice(11);
        popArr.push(Number(subStr));
    }
    
    const max = Math.max(...popArr);
    console.log('MAX:', max);

    const indexOfMax = popArr.indexOf(max);
    console.log('INDEX OF MAX:', indexOfMax);

    populations[indexOfMax].style.backgroundColor = 'green';
}
