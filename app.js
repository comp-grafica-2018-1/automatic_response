var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var spawn = require("child_process").spawn;
var data = '';
var myPathTxt = 'C:/Users/ingenio/Documents/ProyectoComputacion/01Mueble/01MuebleBOM.txt';

Bill = require('./models/bill');
Price = require('./models/price');
Item = require('./models/item');

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/auto_response');

var db = mongoose.connection;

app.use(bodyParser.json());

// Wait for file to exist, checks every 2 seconds
function getFile(path, timeout, data, res) {
    var timeout = setInterval(function() {

        var file = path;
        var fileExists = fs.existsSync(file);

        console.log('File exists: ', fileExists);

        if (fileExists) {
            clearInterval(timeout);
            fs.readFile(myPathTxt, 'utf8', function(err, data){
            	updateItems(data, res);
            });
        }
    }, timeout);
};

function updateItems(data){
	var words = data.split(/\r?\n/).map(function(val){return val.split(';')});
	for (var i = words.length - 1; i > 0; i--) {
		Item.updateItem(words[i][1], words[i][2], {}, function(err, callback){
			if(err){
				console.log('Unable to update', err);
			}
		});
	}
};

function getFileDelay(){
	getFile(myPathTxt,5000);
}

app.get('/', function(req, res){
	res.send('Please use /api/bills, /api/prices or /api/items');
});

app.get('/api/items', function(req, res){
		Item.getItems(function(err, item){
		if(err){
			console.log('Unable to get bill by id');
		}
		res.json(item);
	});
});

// Post bill
app.post('/api/bills', function(req, res){
	var bill = req.body;
	Bill.addBill(bill, function(err, bill){
		if(err){
			console.log('Unable to add bill');
		}

		// Llamar script

		setTimeout(getFileDelay, 60000);
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

function runScript(params){
	var child;
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