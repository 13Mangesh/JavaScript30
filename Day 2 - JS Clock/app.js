const API_KEY = 'c5dc0bd0ea894b68716e62e0f4525883';

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

const searchWeatherButton = document.querySelector('.search-btn');
const searchText = document.querySelector('.search-text');
const temperatureIconDiv = document.querySelector('.temperature-icon-div');
const temperatureTextDiv = document.querySelector('.temperature-text');
const temperatureTextH1 = document.querySelector('.temperature-text-h1');
const temperatureOutput = document.querySelector('#temperature-output');
const cityOutput = document.querySelector('#city-output');

const heading = document.querySelector('.heading');
const text = heading.textContent;
const splitString = text.split("");
heading.textContent = "";

for(let i = 0; i < splitString.length; i++) {
	heading.innerHTML += "<span>" + splitString[i] + "</span>";
}
let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
	const span = heading.querySelectorAll('span')[char];
	console.log(span);
	span.classList.add('fade');
	char++;
	if(char === splitString.length) {
		complete();
		return;
	}
}

function complete() {
	clearInterval(timer);
	timer = null;
}

function setDate() {
    // console.log(secondHand.style.transform === 'rotate(444deg)');
    // if(secondHand.style.transform === 'rotate(444deg)') {
    //     secondHand.classList.remove('transition-class');
    // } else if (secondHand.style.transform === 'rotate(90deg)') {
    //     secondHand.classList.add('transition-class');
    // }
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    const hours = now.getHours();
    const hourDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

}

setInterval(setDate, 1000);
setDate();


searchWeatherButton.addEventListener('click' , (e) => {
    e.preventDefault();
    // console.log(searchText.value);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchText.value.toString() + '&units=metric&appid=' + API_KEY)
  .then(response => response.json())
  .then((data) => {
	console.log(data);
    temperatureIconDiv.classList.add('temperature-icon-div-transition');
    temperatureTextDiv.style.animation = 'temperature-text-div 2s normal forwards ease-out';
    temperatureTextH1.style.animation = 'temperature-text-h1 2s normal forwards ease-out';
    searchText.value = '';
    temperatureOutput.style.animation = 'temperature-output 1s normal forwards ease-out 1s';
    cityOutput.style.animation = 'city-output 1s normal forwards ease-in 1s';
    if(data.cod == 200) {
    	temperatureOutput.innerHTML = data.main.temp.toString() + '°C';
      	cityOutput.innerHTML = data.name;
    } else {
		temperatureOutput.innerHTML = 'Not Found!';
		cityOutput.innerHTML = 'Search Again';
	}
  })
})