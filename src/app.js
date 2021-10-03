const path = require("path");
const express = require("express");
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine end views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tigran Poghosyan'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Lilit Poghosyan'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'help',
    name: 'Mary Poghosyan'
  })
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address term'
    })
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({error})
    }else{
      forecast(data.location, (error, forecastData, icon) => {
        if (error) {
          return res.send({error});
        }
        res.send({
          location: data.location,
          forecast: forecastData,
          address: req.query.address,
          icon: icon
        })
      })
    }
  })

 
});

app.get('/products', (req, res) => {
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Tigran Poghosyan',
    errorMessage: "Help article not found"
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Tigran Poghosyan',
    errorMessage: "404 not found"
  })
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
