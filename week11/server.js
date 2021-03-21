// load the things we need
var express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// form page
app.get('/form', function(req, res) {
    res.render('pages/form');
});

// calculate postal rate page
app.get('/response', function(req, res) {
    mailType = req.query.mailType;
    weight = req.query.weight;
    var cost = '';
    var message = '';

    switch (mailType) {
        case 'Stamped Letter':
            if (weight <= 1) {
                cost = '0.55';
                break;
            } else if (weight <= 2) {
                cost = '0.75';
                break;
            } else if (weight <= 3) {
                cost = '0.95';
                break;
            }else if (weight <= 3.5) {
                cost = '1.15';
                break;
            } else cost = '0';
                break;
        case 'Metered Letter':
            if (weight <= 1) {
                cost = '0.51';
                break;
            } else if (weight <= 2) {
                cost = '0.71';
                break;
            } else if (weight <= 3) {
                cost = '0.91';
                break;
            } else if (weight <= 3.5) {
                cost = '1.11';
                break;
            } else cost = '0';
                break;
        case 'Flat Large Envelope':
            if (weight <= 1) {
                cost = '1.00';
                break;
            } else if (weight <= 2) {
                cost = '1.20';
                break;
            } else if (weight <= 3) {
                cost = '1.40';
                break;
            } else if (weight <= 4) {
                cost = '1.60';
                break;
            } else if (weight <= 5) {
                cost = '1.80';
                break;
            } else if (weight <= 6) {
                cost = '2.00';
                break;
            } else if (weight <= 7) {
                cost = '2.20';
                break;
            } else if (weight <= 8) {
                cost = '2.40';
                break;
            } else if (weight <= 9) {
                cost = '2.60';
                break;
            } else if (weight <= 10) {
                cost = '2.80';
                break;
            } else if (weight <= 11) {
                cost = '3.00';
                break;
            } else if (weight <= 12) {
                cost = '3.20';
                break;
            } else if (weight <= 13) {
                cost = '3.40';
                break;
            } else cost = '0';
            break;
        case 'First-Class Retail package':
            if (weight <= 4) {
                cost = '4.00';
                break;
            } else if (weight <= 8) {
                cost = '4.80';
                break;
            } else if (weight <= 12) {
                cost = '5.50';
                break;
            } else if (weight <= 13) {
                cost = '6.25';
                break;
            } else cost = '0';
            break;
        default:
            cost = 'e';
            break;
    }
    if (cost === '0') {
        message = 'Your mail is over the weight limit. Please try again.'
    } else if (cost === 'e') {
        message = 'Error! Your request could not be processed at this time. Please try again.';
    } else {
        message = 'You selected ' + mailType + ' and your package weighs ' + weight + ' ounces.';
        message += 'Your total cost is $' + cost + '. Have a nice day!';
    }

    

    
    res.render('pages/response', {
        message: message
    });
});

app.listen(PORT);
console.log('webnode running');
