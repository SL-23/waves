const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	name:{
		required: true,
		type: String,
		unique: 1,
		maxLength: 100
	},
	description:{
		required: true,
		type: String,
		maxLength: 10000
	},
	price:{
		required: true,
		type: Number,
		maxLength: 255
	},
	brand:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Brand',
		required: true
	},
	shipping:{
		required: true,
		type: Boolean,
	},
	available:{
		required: true,
		type: Boolean,
	},
	wood:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Wood',
		required: true
	},
	frets:{
		required: true,
		type: Number,
	},
	sold:{
		type: Number,
		maxLength: 100,
		default: 0
	},
	publish:{
		required: true,
		type: Boolean
	},
	images:{
		type: Array,
		default: []
	}
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
