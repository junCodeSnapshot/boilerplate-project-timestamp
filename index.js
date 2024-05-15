// index.js
// where your node app starts

// init project
require('nodemon');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// enable bodyParser

// app.use(bodyParser.urlencoded({extended: false}))

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date", (req, res) => {
  //date should looks like 2000-12-30
  console.log(typeof req.params.date)
  let date = req.params.date;
  let dateUNIX;
  let dateUTC;
  if (date.includes('-')) {
    console.log('first')
    dateUNIX = Math.floor(new Date(date).getTime() / 10);
    dateUTC = new Date(date).toUTCString();
  }else{
    dateUTC = new Date(date*1000).toUTCString();
    dateUNIX = date;
  }
  console.log(dateUTC, dateUNIX)
  res.json({
    unix: dateUNIX,
    utc: dateUTC
  });
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
