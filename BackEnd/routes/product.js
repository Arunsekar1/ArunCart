const express = require('express');
const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview, 
    getProductReviews, 
    deleteProductReview, 
    getAdminProducts 
} = require('../controllers/productController');

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/authenticate');

const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..','uploads/product'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
}) })


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

// Admin Routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'),upload.array('images'), updateProduct);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRoles('admin'), getProductReviews);
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);
module.exports = router