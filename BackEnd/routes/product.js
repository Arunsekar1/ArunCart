const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteProductReview } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/authenticate');

router.route('/products').get(getProducts);
router.route('/product/:id')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct)
router.route('/review').put(isAuthenticatedUser, createProductReview)
                       .delete(deleteProductReview)
router.route('/reviews').get(getProductReviews);

// Admin Routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
module.exports = router