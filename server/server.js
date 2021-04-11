const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');


const app = express();
const mongoose = require('mongoose');
const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
})


const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/products');
const { Payment } = require('./models/payment');
//middleware
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// by arrival
// /ariticle?sortBy=createdAt&order=desc&limit=4


// by arrival
// /ariticle?sortBy=sold&order=desc&limit=4&skip=5
// router, the path to get the resources
app.get('/api/product/articles', (req, res)=> {
	let order = req.query.order ? req.query.order : 'asc';
	let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
	let limit = req.query.limit ? parseInt(req.query.limit) : 100;
	let skip = req.query.skip ? req.query.skip : 0;

	Product.find().
	populate('brand').
	populate('wood').
	sort([[sortBy, order]]).
	limit(limit).
	exec((err, articles) => {

		if(err) return res.status(400).send(err);
		res.send(articles)
	})

});

// products
// add some new resources to the destination pointed by the route
app.post('/api/product/shop', (req, res) => {
	let order = req.body.order ? req.body.order : 'desc';
	let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
	let limit = req.body.limit ? parseInt(req.body.limit) : 10;
	let skip = parseInt(req.body.skip);

	let findArg = {};

	for(let key in req.body.filters) {
		if(req.body.filters[key].length > 0) {
			if(key === 'price') {
				findArg[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1]
				}
				
			} else {
				findArg[key] = req.body.filters[key]
			}
		}
	}
	
	findArg['publish'] = true;

	Product.find(findArg).
	populate('brand').
	populate('wood').
	sort([[sortBy, order]]).
	skip(skip).
	limit(limit).
	exec((err, articles)=>{
		if(err) return res.status(400).send(err);
		return res.status(200).json({
			size: articles.length,
			articles: articles
		})
	})
	

})



// fetching products

app.get('/api/product/article_by_id', (req, res) => {

	let type = req.query.type;
	let items = req.query.id;

	if(type === 'array')
	{
		let ids = req.query.id.split(',');
		items = [];
		items = ids.map(item => {
			return mongoose.Types.ObjectId(item);
		})
	}

	// populate -> get details of brand & wood using their ids
	Product.find({'_id': {$in: items}}).
	populate('brand').
	populate('wood').
	exec((err, docs)=>{
		return res.status(200).send(docs)
	})
});



// products

app.post('/api/product/article', auth, admin, (req, res) => {
	const product = new Product(req.body);
	product.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			article: doc
		})
	})
})

// woods

app.post('/api/product/wood', auth, admin, (req, res) => {
	const wood = new Wood(req.body);

	wood.save((err, doc) => {
		console.log(err);
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			woods: doc
		})
	})
})

app.get('/api/product/woods', (req, res) => {
	Wood.find({}, (err, woods) => {
		if(err) return res.status(400).send(err);
		res.status(200).send(woods);
	})
})

// brand
app.post('/api/product/brand', auth, admin, (req, res) => {
	const brand = new Brand(req.body);
	brand.save((err, doc) => {
		if(err) return res.json({success: false, err});
		res.status(200).json({
			success: true,
			brands: doc
		})
	})
})

app.get('/api/product/brands', (req, res) => {
	Brand.find({}, (err, brands) => {
		if(err) return res.status(400).send(err);
		res.status(200).send(brands)
	})
})

// users

app.get('/api/users/auth', auth, (req, res) => {
	res.status(200).json({
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		cart: req.user.cart,
		history: req.user.history
	})
})

app.get('/api/users/logout', auth, (req, res) => {
	User.findOne(
		{ _id: req.user._id },
		{ token: '' },
		(err, doc) => {
			if(err) return res.json({success: false, err});
			return res.status(200).send({
				success: true
			})
		}
	)
})

app.post('/api/users/register',(req, res)=> {
	const user = new User(req.body);
	user.save((err, doc) => {
		if(err)
		{
			return res.json({success: false, err});
		}
		else{
			res.status(200).json({
				success: true,
				userdata: doc
			})
		}
	})
	

});

app.post('/api/users/login', (req, res)=> {
	//find email
	User.findOne({'email': req.body.email}, (err, user) => {
		if(!user) return res.json({loginSuccess: false, message: 'Auth failes, email not found'});
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'});

			user.generateToken((err, user) => {
				if(err) return res.status(400).send(err);
				console.log(user.token);
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true

				});
			})
		});
	})

	
})

app.post('/api/users/uploadimage',auth,admin,formidable(),(req,res)=>{
    cloudinary.uploader.upload(req.files.file.path,(result)=>{
        
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    },{
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.post('/api/users/update_profile', auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id},
		{
			"$set": req.body
		},
		{ new: true },
		(err, doc) => {
			if(err) return res.json({success: false, err});
			return res.status(200).send({
				success: true
			})
		}

	)
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
	let img_id = req.query.public_id;
	cloudinary.uploader.destroy(img_id, (err, result) => {
		if(err) return res.json({success: false, err});
		res.status(200).send('ok')
	})
})

app.post('/api/users/addToCart', auth, (req, res) => {
	User.findOne({_id: req.user._id}, (err, doc) => {
		let duplicate = false;

		doc.cart.forEach((item) => {
			if(item.id == req.query.productId) {
				duplicate = true;
			}
		})
		if(duplicate) {
			User.findOneAndUpdate(
				{ _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId)},
				{ $inc: {"cart.$.quantity": 1}},
				{ new: true },
				() => {
					if(err) return res.json({success: false, err});
					res.status(200).json(doc.cart)
				}
			)
		}	
		else {
			User.findOneAndUpdate(
				{_id: req.user._id},
				{ $push: { cart: {
					id: mongoose.Types.ObjectId(req.query.productId),
					quantity: 1,
					date: Date.now()
				} } },
				{new: true},
				(err, doc) => {
					console.log(err);
					if(err) return res.json({success: false, err})
					res.status(200).json(doc.cart)
				}
			)
		}
	})
});

app.get('/api/users/removeFromCart', auth, (req, res) => {
	User.findOneAndUpdate(
		{_id: req.user._id},
		{"$pull": 
			{"cart" : {"id": mongoose.Types.ObjectId(req.query._id)}}
		},
		{ new: true}, 
		(err, doc) => {
			let cart = doc.cart;
			let array = cart.map(item => {
				return mongoose.Types.ObjectId(item.id)
			});

			Product.
			find({'_id': {$in: array }}).
			populate('brand').
			populate('wood').
			exec((err, cartDetail) => {
				console.log(err);
				return res.status(200).json({
					cartDetail,
					cart
				})
			})
		}
	)
})

app.post('/api/users/successBuy', auth, (req, res) => {
	console.log('payments');
	let history = [];
	let transactionData = {};

	// enter user history
	req.body.cartDetail.forEach((item) => {
		history.push({
			dataOfPurchase: Date.now(),
			name: item.name,
			brand: item.brand.name,
			id: item._id,
			price: item.price,
			quantity: item.quantity,
			paymentId: req.body.paymentData.paymentID

		})
	})
	//payments dash
	transactionData.user = {
		id: req.user._id,
		name: req.user.name,
		lastname: req.user.lastname,
		email: req.user.email
	}

	transactionData.data = req.body.paymentData;
	transactionData.product = history;

	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: {history: history}, $set:{cart: []} },
		{ new: true },
		(err, user) => {
			if(err) return res.json({success: false, err});

			const payment = new Payment(transactionData);
			payment.save((err, doc) => {
				if(err) return res.json({success: false, err});

				let products = [];

				doc.product.forEach(item => {
					products.push({id:item.id, quantity: item.quantity})
				})

				async.eachOfSeries(products, (item, callback) => {
					Product.update(
						{ _id: item.id },
						{ $inc: {
							"sold": item.quantity
						}},
						{ new: false },
					)
				}, (err) => {
					if(err) return res.json({success: false, err});
					res.status(200).json({
						success: true,
						cart: user.cart,
						cartDetail: []
					})
				})

			});

		}
	)
	//
})

const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server running at ${port}`)
})