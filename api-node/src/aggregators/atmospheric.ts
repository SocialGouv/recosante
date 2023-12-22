import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

function getAtomsphericIndicator() {
  // return fetch(
  //   `https://api.openweathermap.org/data/2.5/uvi?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.API_KEY}`
  // )
  //   .then((res) => res.json())
  //   .then((res) => res.value);
}

getAtomsphericIndicator();
