var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var spawn = require("child_process").spawn;
var data = '';
var myPathTxt = 'C:/Users/ingenio/Documents/ProyectoComputacion/01Mueble/01MuebleBOM.txt';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ingeniofuncional@gmail.com',
		pass: 'ingeniofunc'
	}
})

var mailOptions = {
	from: 'Ingenio funcional',
	to: 'jmbarreram@unal.edu.co',
	subject: 'prueba de correo nodeJS',
	text: 'El documento de soporte de su cotización',
	attachments: [
		{
			path: 'C:/Users/ingenio/Documents/ProyectoComputacion/02Mueble/02Mueble.pdf'
			//filename: 'prueba.pdf',
            //content: fs.createReadStream('index.js')
		}
	]
}

Bill = require('./models/bill');
Price = require('./models/price');
Item = require('./models/item');

PricePdf = require('./pdfkit/cotizacion');
BillPdf = require('./pdfkit/factura');

// Connect to Mongoose
mongoose.connect('mongodb://localhost:27017/auto_response');

var db = mongoose.connection;

app.use(bodyParser.json());

function getFile(path, timeout, price) {
    var timeout = setInterval(function() {

        var file = path;
        var fileExists = fs.existsSync(file);

        console.log('File exists: ', fileExists);

        if (fileExists) {
            clearInterval(timeout);
            fs.readFile(myPathTxt, 'utf8', function(err, _data){
            	updateItems(_data);
            	pricePdfHelper(price, _data);
            });
        }
    }, timeout);
};

function updateItems(_data){
	var words = _data.split(/\r?\n/).map(function(val){return val.split(';')});
	for (var i = words.length - 1; i > 0; i--) {
		Item.updateItem(words[i][1], words[i][2], {}, function(err, callback){
			if(err){
				console.log('Unable to update', err);
			}
		});
	}
};

function getFileDelay(price){
	getFile(myPathTxt,5000,price);
}

function pricePdfHelper(price, _data) {
	var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	var itemName = "";
	if price.altura != null){
		itemName = 'Closet multifuncional';
	}else{ 
		if(price.repisa != null){
			itemName = 'Mesa con cama';
		}else{
			itemName = 'Escritorio con cama';
		}
	}

	getValue(_data, function(err, precio) {
		PricePdf.doPrice(price.id, 'Dir Empresa', 'Ciudad Empresa', date, price.nombre, 'Dir Domicilio', 'Ciudad', 121212,
			'*comentarios', 0, itemName, price.cantidad, precio, precio*price.cantidad, precio*price.cantidad*0.16
			, precio*price.cantidad*1.16, 0, 0, 0, '16', precio*price.cantidad*1.16);
	});
}

function getValue(_data, callback) {
	var precio = 0;
	var words = _data.split(/\r?\n/).map(function(val){return val.split(';')});
	for (var i = words.length - 1; i > 0; i--) {
		Item.getItemByName(words[i][1], function(err, cb){
			if(err){
				console.log('Unable to update', err);
			}
			precio += cb.precio * parseInt(words[i][2]);
		});
	}
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
		console.log(bill);
		runScript(bill);

		mailOptions.to = bill.correo;
		mailOptions.subject = "Confirmación de orden de compra";
		setTimeout(getFileDelay.bind(null, bill), 60000);
		mailOptions.text = `Cordial saludo, ${bill.nombre}\n Adjuntamos su orden de compra y la visualización de su mueble:\n`
		transporter.sendMail(mailOptions,(error, info) => {
		if (error){
			console.log(error);
		}else {
			console.log('Email sent: ' + info.response);
		}
	})
		res.json(bill);
	});
});

// Post price
app.post('/api/prices', function(req, res){
	var price = req.body;
	console.log(price);
	Price.addPrice(price, function(err, price){
		if(err){
			console.log('Unable to add price');
		}
		runScript(price);
		setTimeout(getFileDelay.bind(null, price), 60000);
		// Enviar correo
		mailOptions.to = price.correo;
		mailOptions.subject = "Confirmación de cotización";
		mailOptions.text = `Cordial saludo, ${price.nombre}\n Adjuntamos su cotización en pdf y la visualización de su mueble:\n`;
		transporter.sendMail(mailOptions,(error, info) => {
		if (error){
			console.log(error);
		}else {
			console.log('Email sent: ' + info.response);
		}
	})

		res.json(price);
	});
});
app.listen(3002);
console.log('Running on port 3002...');

function runScript(params){
	var child;
	if (params.altura != null){
		child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\02Mueble.ps1 "+params.altura+" "+params.material+" "+params.color]);
		mailOptions.attachments.path = 'C:/Users/ingenio/Documents/ProyectoComputacion/02Mueble/02Mueble.jpg';
	}else{ 
		if(params.repisa != null){
			child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\01Mueble.ps1 "+params.colchon+" "+params.repisa+" "+params.material+" "+params.color]);
			mailOptions.attachments.path = 'C:/Users/ingenio/Documents/ProyectoComputacion/01Mueble/01Mueble.jpg';
		}else{
			child = spawn("powershell.exe",["C:\\Users\\ingenio\\Documents\\ProyectoComputacion\\04Mueble.ps1 "+params.colchon+" "+params.material+" "+params.color]);
			mailOptions.attachments.path = 'C:/Users/ingenio/Documents/ProyectoComputacion/04Mueble/04Mueble.jpg';
		}
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