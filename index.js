const express = require('express');

const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');

// app.use(express.static('public'));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const city = req.body.city;
  // console.log(city);

  const api = '097f1fcdc8d2259d10cda9df1d090666';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=097f1fcdc8d2259d10cda9df1d090666&units=metric`;
  var temp;
  var weatherIcon;
  var desc;

  fetch(url)
    .then(response => {
      return response.json();
    }).then(data => {
      temp = data["main"].temp;
      weatherIcon = data["weather"][0].icon;
      desc = data["weather"][0].description;

      const weatherData = {
        'temp': temp,
        'desc': desc,
        'icon': weatherIcon
      }
      
      // console.log(weatherData);

      res.send(weatherData);

    })

})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
