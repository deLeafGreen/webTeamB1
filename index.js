
/**
 * Author: Philipp Fleischer
 * email: philipp.fleischer0@gmail.com
 */

const express = require('express')
const app = express()
var path = require('path');
const port = 3000


//static css files inclusion
app.use('/static', express.static(__dirname + '/static'));
app.use('/img', express.static(__dirname + '/img'));


//hard coded routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/rezept',function(req, res) {
    res.sendFile(path.join(__dirname + '/html/Rezept.html'));
});

app.get('/spinach',function(req, res) {
    res.sendFile(path.join(__dirname + '/html/spinach_strawberry_salad.html'));
});


//debug info for developers
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
