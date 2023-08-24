const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('products', {
			products,
			toThousand
		});
	},

	detail: (req, res) => {
		const id = req.params.id;
		const product = products.find(product => product.id === +id);
		return res.render('detail', {
		  ...product,
		  toThousand 
		});
	  },

	createForm: (req, res) => {
		return res.render('product-create-form');
	},
	
	create: (req, res) => {
		const { name, price, description, discount, category } = req.body;
		const product = {
			id: products[products.length - 1].id + 1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: null 
		};
		products.push(product);

		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(products, null, 3));
		return res.redirect('/products');
	},

	editForm: (req, res) => {
		const product = products.find(product => product.id === +req.params.id);
		return res.render('product-edit-form', {
			product: product,
			category: product.category, 
			description: product.description  
		});
	},
	
	
	

	update: (req, res) => {
		const { name, price, description, discount, category } = req.body;

		const productsModify = products.map(product => {
			if (product.id === +req.params.id) {
				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description.trim();
			}

			return product;
		});

		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsModify, null, 3));
		return res.redirect('/products');
	},

	destroy: (req, res) => {
		const productsModify = products.filter(product => product.id !== +req.params.id);
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(productsModify, null, 3));
		return res.redirect('/products');
	}
};

module.exports = controller;
