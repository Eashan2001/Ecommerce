import express from 'express'
import {registerController,loginController,testController,forgotPasswordController, updateProfileController, getOrderController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../moddlewares/authMiddleware.js'


//router objcet
const router=express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)
//LOGIN || POST
router.post('/login', loginController)

//FORGOT PASSWORD CONTROLER || POST
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get('/test',requireSignIn,isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//order
router.get('/orders',requireSignIn,getOrderController)

//all orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)


//order status update
router.get('/order-status',requireSignIn,isAdmin,orderStatusController)

export default router;