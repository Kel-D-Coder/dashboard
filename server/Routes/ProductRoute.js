const express = require('express');
const router = express.Router();
const { getProduct, getAllProduct, createProduct, deleteProduct, updateProduct } = require('../Controllers/Product');

router.route('/').get(getAllProduct).post(createProduct)
router.route('/:id').patch(updateProduct).delete(deleteProduct).get(getProduct);

module.exports = router