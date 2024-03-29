var mongoose = require('mongoose');

// Bill Schema
var billSchema = mongoose.Schema({
	nombre: {
		type: String,
		require: true
	},
	mueble: {
		type: String,
		require: true
	},
	colchon: {
		type: String
	},
	repisa: {
		type: String
	},
	numerominpuestos: {
		type: String
	},
	numeromaxpuestos: {
		type: String
	},
	altura: {
		type: String
	},
	material: {
		type: String,
		require: true
	},
	color: {
		type: String,
		require: true
	},
	correo: {
		type: String,
		require: true
	},
	cantidad: {
		type: String,
		require: true
	},
	fecha_creacion: {
		type: Date,
		default: Date.now
	}
});

var Bill = module.exports = mongoose.model('Bill', billSchema);

// Get Bills
module.exports.getBills = function(callback, limit){
	Bill.find(callback).limit(limit);
}

// Get Bill By Id
module.exports.getBillById = function(id, callback){
	Bill.findById(id, callback);
}

// Add Bill
module.exports.addBill = function(bill, callback){
	Bill.create(bill, callback);
}