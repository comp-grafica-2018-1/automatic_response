var mongoose = require('mongoose');

// Item Schema
var itemSchema = mongoose.Schema({
	nombre: {
		type: String,
		require: true
	},
	cantidad: {
		type: Number,
		require: true
	},
	precio: {
		type: Number,
		require: true
	},
	proveedor: {
		type: String,
		require: true
	}
});

var Item = module.exports = mongoose.model('Item', itemSchema);

// Get Item
module.exports.getItems = function(callback, limit){
	Item.find(callback).limit(limit);
}

// Get Item By Id
module.exports.getItemById = function(id, callback){
	Item.findById(id, callback);
}

// Get Item By Name

module.exports.getItemByName = function(name, callback){
	Item.find({'nombre': name});
}

// Add Item
module.exports.addItem = function(item, callback){
	Item.create(item, callback);
}

// Update Item bill
module.exports.updateItem = function(name, quantity, options, callback){
	var query = {nombre: name};
	var qty = parseInt(quantity);
	qty = -qty;
	Item.update(query, {$inc : {'cantidad' : quantity}}, options, callback);
}