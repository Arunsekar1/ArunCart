const Product = require('../Models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middlewares/catchAsyncError')
const ApIFeatures = require('../Middlewares/apiFeatures')

// Get Products
exports.getProducts = async (req, res, next) => {
    const resPerPage = 3;

    let buildQuery = () => {
        return new ApIFeatures(Product.find(), req.query).search().filter()
    }

    const filteredProductsCount = await buildQuery().query.countDocuments({})
    const totalProductsCount = await Product.countDocuments({})
    let productsCount = totalProductsCount;

    if(filteredProductsCount !== totalProductsCount){
        productsCount = filteredProductsCount;
    }

    const products = await buildQuery().paginate(resPerPage).query;

    // await new Promise(resolve => setTimeout(resolve, 3000)); // Simulating a delay for demonstration

    // return next(new ErrorHandler('Unabele to send products!', 400))
    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products
    })
}

// Create Products
exports.newProduct = catchAsyncError(async (req, res, next) => {
    let images = []

    if(req.files.length > 0){
        req.files.forEach(file => {
            let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`
            images.push({ image: url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id; // Assigning the user id to the product
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})


// Get Single Product - 
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('reviews.user','name email');

    if (!product) {
        return next(new ErrorHandler('Product not found test', 1000))
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay for demonstration
    res.status(201).json({
        success: true,
        product
    })
}


// Update Product
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true
    })
    res.status(200).json({
        success: true,
        product
    })
}


// Delete Product
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    // await user.remove(); <-- this is deprecated in mongoose v7+

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product Deleted!'
    })
}

// create Review - api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    };

    const product = await Product.findById(productId);

    // finding user review existing or not
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() === req.user.id.toString()
    });

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        // creating the new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // find the average of the product ratings
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc
    }, 0) / product.reviews.length;

    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Review added successfully'
    });

});

// Get Product Reviews - /api/v1/reviews?id={productId}
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Product Review - /api/v1/reviews?id={reviewid}&productId={productId}
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    // filtering the reviews which does not match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString();
    });

    // number of reviews after deletion
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;

    // save the product document with updated reviews, numOfReviews and ratings
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true,
        message: 'Review deleted successfully'
    });
});


// get admin products - api/v1/admin/products

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
})