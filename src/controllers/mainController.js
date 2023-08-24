const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index', {
			visited : products.filter(product => product.category === "visited"),
			sale : products.filter(product => product.category === "in-sale"),
			toThousand
		})
	},
	search: (req, res) => {
		const keywords = (req.query.keywords || '').trim();
		console.log('Keywords:', keywords); 
		const result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
		console.log('Result:', result); 
		return res.render('results', {
		  results: result, 
		  toThousand: toThousand,
		  keywords: keywords 
		});
	  }
	  
	
	
	
	
	}

module.exports = controller;
