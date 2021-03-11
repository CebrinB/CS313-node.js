// load the things we need
var express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// form page
app.get('/form', function(req, res) {
  res.render('pages/form');
});


// math page
app.get('/math', function(req, res) {
  operation = req.query.operation;
  operand1 = Number(req.query.operand1);
  operand2 = Number(req.query.operand2);

  var symbol;
  var total;
  

  switch (operation) {
    case 'Add':
      total = operand1 + operand2;
      symbol = '+';
      break;
    case 'Subtract':
      total = operand1 - operand2;
      symbol = '-';
      break;
    case 'Multiply':
      total = operand1 * operand2;
      symbol = '*';
      break;
    case 'Divide':
      total = operand1 / operand2;
      symbol = '/';
      break;
    default:
      total = 'Error!';
      break;
  }  
  
  res.render('pages/math', {
    operand1: operand1,
    operand2: operand2,
    symbol: symbol,
    total: total
  });


});

// math page
app.get('/math_service', function(req, res) {
  operation = req.query.operation;
  operand1 = Number(req.query.operand1);
  operand2 = Number(req.query.operand2);

  var symbol;
  var total;
  

  switch (operation) {
    case 'Add':
      total = operand1 + operand2;
      symbol = '+';
      break;
    case 'Subtract':
      total = operand1 - operand2;
      symbol = '-';
      break;
    case 'Multiply':
      total = operand1 * operand2;
      symbol = '*';
      break;
    case 'Divide':
      total = operand1 / operand2;
      symbol = '/';
      break;
    default:
      total = 'Error!';
      break;
  }  
  
  parameters = {
    operand1: operand1,
    operand2: operand2,
    symbol: symbol,
    total: total
  }
  console.log(parameters);
  res.json(parameters);
});

app.listen(PORT);
console.log(PORT + ' is the magic port');