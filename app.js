var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var spawn = require("child_process").spawn,child;

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
		runScript(bill);//revisar campos de bill
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
		runScript(price);//revisar campos de price
		// Enviar correo
		res.json(price);
	});
});
app.listen(3000);
console.log('Running on port 3000...');

function runScript(params){
	switch(params.mueble){
		case 01:
			child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\01Mueble.ps1 "+params.colchon+" "+params.repisa+" "+params.material+" "params.color]);
			break;
		case 02:
			child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\02Mueble.ps1 "+params.alto+" "+params.material+" "params.color]);
			break;
		case 04:
			child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\04Mueble.ps1 "+params.colchon+" "+params.material+" "params.color]);
			break;
	}	
	child.stdout.on("data",function(data){
    console.log("Powershell Data: " + data);
	});
	child.stderr.on("data",function(data){
	    console.log("Powershell Errors: " + data);
	});
	child.on("exit",function(){
	    console.log("Powershell Script finished");
	});
	child.stdin.end();
}