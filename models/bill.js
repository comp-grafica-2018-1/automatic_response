var mongoose = require('mongoose');

// Bill Schema
var billSchema = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	create_date: {
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