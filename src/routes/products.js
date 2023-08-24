// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.createForm);
router.post('/create', productsController.create);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.editForm); 
router.put('/update/:id', productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);


module.exports = router;
