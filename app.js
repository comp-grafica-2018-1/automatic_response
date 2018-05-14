var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Bill = require('./models/bill');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bills');
var db = mongoose.connection;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Please use /api/bills or /api/price');
});

// Get all bills
app.get('/api/bills', function(req, res){
	Bill.getBills(function(err, bills){
		if(err){
			console.log('Unable to get list of bills');
		}
		res.json(bills);
	});
});

// Get bill by id
app.get('/api/bills/:_id', function(req, res){
	Bill.getBillById(req.params._id, function(err, bill){
		if(err){
			console.log('Unable to get bill by id');
		}
		res.json(bill);
	});
});

// Post bill
app.post('/api/bills', function(req, res){
	var bill = req.body;
	Bill.addBill(bill, function(err, bill){
		if(err){
			console.log('Unable to add bill');
		}
		res.json(bill);
	});
});

app.listen(3000);
console.log('Running on port 3000...');