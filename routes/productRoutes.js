import express from 'express'
import { isAdmin, requireSignIn } from '../moddlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router=express.Router()

//routers
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get product
router.get('/get-product',getProductController)

//single product get
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//router.delete
router.delete('/delete-product/:pid',deleteProductController)

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter product
router.post('/product-filters',productFiltersController)

// product   count
router.get('/product-count',productCountController)


//product per page
router.get('/product-list/:page',productListController)

//serach product
router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',realtedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)

//payment route
//token catch from braintree
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)



export default router