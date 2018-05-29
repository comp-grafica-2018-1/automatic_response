var mongoose = require('mongoose');

// Price Schema
var priceSchema = mongoose.Schema({
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
	create_date: {
		type: Date,
		default: Date.now
	},
	confirmacion: {
		type: String,
		require: true
	}
});

var Price = module.exports = mongoose.model('Price', priceSchema);

// Get Prices
module.exports.getPrices = function(callback, limit){
	Price.find(callback).limit(limit);
}

// Get Price By Id
module.exports.getPriceById = function(id, callback){
	Price.findById(id, callback);
}

// Add Price
module.exports.addPrice = function(price, callback){
	Price.create(price, callback);
}