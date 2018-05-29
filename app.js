var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var data = '';
var myPathTxt = 'C:/Users/ingenio/Documents/ProyectoComputacion/01Mueble/01MuebleBOM.txt';

Bill = require('./models/bill');
Price = require('./models/price');
Item = require('./models/item');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bills');
mongoose.connect('mongodb://localhost/prices');
mongoose.connect('mongodb://localhost/inventory');
var db = mongoose.connection;

app.use(bodyParser.json());

// Wait for file to exist, checks every 2 seconds
function getFile(path, timeout, data) {
    var timeout = setInterval(function() {

        var file = path;
        var fileExists = fs.existsSync(file);

        console.log('Checking for: ', file);
        console.log('Exists: ', fileExists);

        if (fileExists) {
            clearInterval(timeout);
            fs.readFile(myPathTxt, 'utf8', function(error, data){
            	price(data);
            });
        }
    }, timeout);
};

function price(data){
	var words = data.split(/\r?\n/).map(function(val){return val.split(';')});
	console.log(words);
};

app.get('/', function(req, res){
	res.send('Please use /api/bills or /api/prices');
});

// Get all bills
/*
app.get('/api/bills', function(req, res){
	Bill.getBills(function(err, bills){
		if(err){
			console.log('Unable to get list of bills');
		}
		res.json(bills);
	});
});
*/
// Get bill by id
/*
app.get('/api/bills/:_id', function(req, res){
	Bill.getBillById(req.params._id, function(err, bill){
		if(err){
			console.log('Unable to get bill by id');
		}
		res.json(bill);
	});
});
*/
// Post bill
app.post('/api/bills', function(req, res){
	var bill = req.body;
	Bill.addBill(bill, function(err, bill){
		if(err){
			console.log('Unable to add bill');
		}
		// Llamar script
		//wait
		getFile(myPathTxt,5000);
		res.json(bill);
	});
});

// Post price
app.post('/api/prices', function(req, res){
	var price = req.body;
	Price.addPrice(price, function(err, price){
		if(err){
			console.log('Unable to add price');
		}
		// Llamar script
		// Enviar correo
		res.json(price);
	});
});
app.listen(3000);
console.log('Running on port 3000...');