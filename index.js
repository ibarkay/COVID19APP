console.log(
  '   ▐▀▄      ▄▀▌   ▄▄▄▄▄▄▄             \n   ▌▒▒▀▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄         \n  ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄        \n ▌▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄     \n▀█▒▒█▌▒▒█▒▒▐█▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌    \n▀▌▒▒▒▒▒▀▒▀▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐  ▄▄\n▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌▄█▒█\n▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐▒█▀ \n▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐▀  \n▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌    \n▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐     \n▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌     \n ▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐      \n ▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌      \n   ▀▄▄▀▀▀▀▄▄▀▀▀▀▀▀▄▄▀▀▀▀▀▀▄▄▀       \n \nIbarkay',
);
/* eslint-disable no-loop-func */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */

// *GLOBALS & selectors
const API = 'https://corona-api.com/countries';
const countriesAPI = 'https://restcountries.herokuapp.com/api/v1';
const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
const container = document.querySelector('.main-container');
const container2 = document.querySelector('.chart-container');
const contCuntery = document.querySelector('.country-container');
const casesBox = document.querySelector('#cases');
const newCasesBox = document.querySelector('#new-cases');
const deathsBox = document.querySelector('#deaths');
const newDeathsBox = document.querySelector('#new-deaths');
const recoveredBox = document.querySelector('#recovered');
const criticalBox = document.querySelector('#critical');
const titleHeader = document.querySelector('.countreyname');

const flag = document.querySelector('.flag');

const linkez = document.createElement('div');
linkez.classList.add('linkss');
container.append(linkez);

const countries = [];
let testCounties = [];
let testCountiesData = [];
const worldObj = {};
let chosenContinent = '';
let chosenParams = '';

// *BTNs selectors
const americasBtn = document.querySelector('.Americas');
const africaBtn = document.querySelector('.Africa');
const asiaBtn = document.querySelector('.Asia');
const europeBtn = document.querySelector('.Europe');
const oceaniaBtn = document.querySelector('.Oceania');

const deathsBtn = document.querySelector('.deaths');
const recoveredBtn = document.querySelector('.recovered');
const criticalBtn = document.querySelector('.critical');
const confirmedBtn = document.querySelector('.confirmed');
// btn Lists
const btnList = [
  africaBtn,
  americasBtn,
  africaBtn,
  asiaBtn,
  europeBtn,
  oceaniaBtn,
];
const btnListParams = [deathsBtn, recoveredBtn, criticalBtn, confirmedBtn];

//* fetch countries by continent
async function makeWorld() {
  const resp = await fetch(`${proxy}${countriesAPI}`);
  const data = await resp.json();
  // eslint-disable-next-line no-restricted-syntax
  for (const c in data) {
    if (worldObj[`${data[c].region}`]) {
      worldObj[`${data[c].region}`].push(`${data[c].name.common}`);
    } else {
      worldObj[`${data[c].region}`] = [];
      worldObj[`${data[c].region}`].push(`${data[c].name.common}`);
    }
  }
}

//* create lists for drawing
function dreawFromList(continent, params) {
  contCuntery.style = 'display : none;';
  container2.style = 'display : in-line;';
  testCounties = [];
  testCountiesData = [];
  for (const con in worldObj[continent]) {
    const cont = findByCountry(worldObj[continent][con]);
    if (cont) {
      testCounties.push(cont.name);
      testCountiesData.push(cont[params]);
    }
  }
}

// ! fetch all data to an object (local)
async function fetchiAll() {
  const resp = await fetch(`${API}`);
  const data = await resp.json();

  for (let i = 0; i < data.data.length; i++) {
    const cObj = {};

    //  name
    cObj.name = `${data.data[i].name}`;

    //  deaths
    cObj.deaths = `${data.data[i].latest_data.deaths}`;
    //  recovered
    cObj.recovered = `${data.data[i].latest_data.recovered}`;
    //  critical
    cObj.critical = `${data.data[i].latest_data.critical}`;
    //  confirmed
    cObj.confirmed = `${data.data[i].latest_data.confirmed}`;
    // todayConfiremd
    cObj.newConfirmed = `${data.data[i].today.confirmed}`;
    // todayDeaths
    cObj.newDeaths = `${data.data[i].today.deaths}`;
    // flag
    cObj.flag = `${data.data[i].code.toLowerCase()}`;
    countries.push(cObj);
  }
}
// * find Specific country
const findByCountry = (country) => {
  const ret = countries.find((x) => x.name === `${country}`);
  return ret;
};

// *SAFE RUN HERE
async function safe() {
  await fetchiAll();
  await makeWorld();

  // * CHART
  const ctx = document.getElementById('myChart').getContext('2d');
  async function createChart(namesArr, numbersArr) {
    const chart = await new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: namesArr, // ? replace the labels with a list of values
        datasets: [
          {
            label: `${chosenContinent} ${chosenParams}`,
            backgroundColor:
              'rgba(255, 99, 132, 0.2)',
            borderColor: [
              'rgba(255,99,132,1)',
            ],
            borderColor: 'rgba(0,0,255,1)',
            data: numbersArr, // ? replace the data with a list of values
          },
        ],
      },
      options: {
        events: ['hover'],
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              // Edit here for the yAxe
              beginAtZero: true,
              fontColor: '#fff',
            },
          }],
          xAxes: [{
            ticks: {
              // Edit here for the xAxe
              fontColor: '#fff',
            },
          }],
        },
      },
    });
  }
  // *Continents EV btns
  for (let i = 0; i < btnList.length; i++) {
    // ev on continents
    btnList[i].addEventListener('click', function clickedOnContinent() {
      linkez.innerHTML = '';
      chosenContinent = `${this.innerHTML}`;
      dreawFromList(chosenContinent, 'deaths');
      createChart(testCounties, testCountiesData);
      for (const con of testCounties) {
        const linky = document.createElement('a');
        linky.innerHTML = con;
        linky.href = '#';
        // ev on links
        linky.addEventListener('click', function createCountryInfo() {
          const counteryThis = findByCountry(this.innerHTML);

          container2.style = 'display : none;';
          titleHeader.innerHTML = counteryThis.name;
          flag.src = `https://www.countryflags.io/${counteryThis.flag}/shiny/64.png`;
          casesBox.innerHTML = `cases  <br> ${counteryThis.confirmed}`;
          newCasesBox.innerHTML = `new cases  <br> ${counteryThis.newConfirmed}`;
          deathsBox.innerHTML = `deaths  <br> ${counteryThis.deaths}`;
          newDeathsBox.innerHTML = `New Deaths  <br> ${counteryThis.newDeaths} `;
          recoveredBox.innerHTML = `Recovered <br> ${counteryThis.recovered}`;
          criticalBox.innerHTML = `Critical  <br> ${counteryThis.critical}`;
          contCuntery.style = 'display : flex;';
        });
        linkez.append(linky);
      }
    });
  }
  //* EV on params
  for (let i = 0; i < btnListParams.length; i++) {
    btnListParams[i].addEventListener('click', function clickedParam() {
      contCuntery.style = 'display : none;';
      chosenParams = `${this.innerHTML}`;
      // console.log(`${chosenContinent},${chosenParams}`);
      dreawFromList(chosenContinent, chosenParams);
      createChart(testCounties, testCountiesData);
    });
  }
}

safe();
// ! DONT CALL STUFF AFTER SAFE()
